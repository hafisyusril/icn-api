import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/api.error";
import { hashPassword } from "../utils/hash";

export class UserService {
  static async getUserLists() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  static async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        tasks: {
          select: {
            id: true,
            title: true,
            description: true,
            isCompleted: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return user;
  }

  static async updateUser(id: string, data: { name?: string; email?: string; password?: string }) {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (data.email && data.email !== user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new ApiError(400, "Email already registered");
      }
    }

    let hashedPassword: string | undefined;
    if (data.password) {
      hashedPassword = await hashPassword(data.password);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.email && { email: data.email }),
        ...(hashedPassword && { password: hashedPassword }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  static async deleteUser(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    await prisma.user.delete({ where: { id } });

    return { message: "User deleted successfully" };
  }
}
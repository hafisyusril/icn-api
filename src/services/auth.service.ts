import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/api.error";
import { comparePassword, hashPassword } from "../utils/hash";
import jwt from "jsonwebtoken";

export class AuthService {
  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return {
      token,
      user: {
        name: user.name,
        id: user.id,
        email: user.email,
      },
    };
  }

  static async register(name: string, email: string, password: string) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ApiError(400, "Email already registered");
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      id: user.id,
      email: user.email,
    };
  }
}

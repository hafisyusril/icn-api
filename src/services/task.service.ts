import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/api.error";

export class TaskService {
  static async createTask(
    userId: string,
    data: { title: string; description?: string },
  ) {
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        isCompleted: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return task;
  }

  static async getAllTasks() {
    return prisma.task.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        isCompleted: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  static async getUserTasks(userId: string) {
    return prisma.task.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        description: true,
        isCompleted: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: [{ isCompleted: "asc" }, { createdAt: "desc" }],
    });
  }

  static async getTaskById(id: string) {
    const task = await prisma.task.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        isCompleted: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    return task;
  }

  static async getTasksByUserId(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return prisma.task.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        description: true,
        isCompleted: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async updateTask(
    id: string,
    userId: string,
    data: { title?: string; description?: string; isCompleted?: boolean },
  ) {
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    if (task.userId !== userId) {
      throw new ApiError(403, "Unauthorized - Can only update your own tasks");
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
        ...(data.isCompleted !== undefined && {
          isCompleted: data.isCompleted,
        }),
      },
      select: {
        id: true,
        title: true,
        description: true,
        isCompleted: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedTask;
  }

  static async deleteTask(id: string, userId: string) {
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    if (task.userId !== userId) {
      throw new ApiError(403, "Unauthorized - Can only delete your own tasks");
    }

    await prisma.task.delete({ where: { id } });

    return { message: "Task deleted successfully" };
  }
}

import { NextFunction, Response } from "express";
import { TaskService } from "../services/task.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export class TaskController {
  static async createTask(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { title, description } = req.body;
      const userId = req.user!.id;

      const task = await TaskService.createTask(userId, { title, description });

      return res.status(201).json({
        message: "Task created successfully",
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllTasks(req: any, res: Response, next: NextFunction) {
    try {
      const tasks = await TaskService.getAllTasks();

      return res.status(200).json({
        message: "Tasks retrieved successfully",
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserTasks(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.user!.id;

      const tasks = await TaskService.getUserTasks(userId);

      return res.status(200).json({
        message: "User tasks retrieved successfully",
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTaskById(req: any, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const task = await TaskService.getTaskById(id);

      return res.status(200).json({
        message: "Task retrieved successfully",
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTasksByUserId(req: any, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const tasks = await TaskService.getTasksByUserId(id);

      return res.status(200).json({
        message: "User tasks retrieved successfully",
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateTask(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const { title, description, isCompleted } = req.body;
      const userId = req.user!.id;

      const task = await TaskService.updateTask(id, userId, {
        title,
        description,
        isCompleted,
      });

      return res.status(200).json({
        message: "Task updated successfully",
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTask(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const userId = req.user!.id;

      const result = await TaskService.deleteTask(id, userId);

      return res.status(200).json({
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
}

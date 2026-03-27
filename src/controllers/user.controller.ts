import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export class UserController {
  static async listUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getUserLists();

      return res.status(200).json({
        message: "Users retrieved successfully",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string

      const user = await UserService.getUserById(id);

      return res.status(200).json({
        message: "User retrieved successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const { name, email, password } = req.body;

      const updatedUser = await UserService.updateUser(id, { name, email, password });

      return res.status(200).json({
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;

      const result = await UserService.deleteUser(id);

      return res.status(200).json({
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
}
import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const token = await AuthService.login(email, password);

      return res.status(200).json({
        message: "Login successful",
        data: token ,
      });
    } catch (error) {
      next(error);
    }
  }

   static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const {name, email, password } = req.body;

      const user = await AuthService.register(name, email, password);

      return res.status(201).json({
        message: "Register successful",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

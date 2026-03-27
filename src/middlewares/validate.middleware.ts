import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api.error";

export const validateDtoMiddleware =
  (dtoClass: any) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const dto = plainToInstance(dtoClass, req.body);

      await validateOrReject(dto);

      req.body = dto;
      next();
    } catch (errors: any) {
      const messages = errors
        .map((err: any) => Object.values(err.constraints || {}))
        .flat();

      next(new ApiError(400, messages.join(", ")));
    }
  };
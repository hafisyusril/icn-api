import { Router } from "express";
import { validateDtoMiddleware } from "../middlewares/validate.middleware";
import { LoginDto, RegisterDto } from "../services/dto/auth.dto";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

router.post("/users", validateDtoMiddleware(RegisterDto), AuthController.register)
router.post("/users/login", validateDtoMiddleware(LoginDto), AuthController.login)

export default router

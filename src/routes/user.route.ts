import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateDtoMiddleware } from "../middlewares/validate.middleware";
import { UpdateUserDto } from "../services/dto/user.dto";

const router = Router();

// Get all users
router.get("/users", UserController.listUsers);

// Get user by ID
router.get("/users/:id", UserController.getUserById);

// Update user (requires auth)
router.put("/users/:id", authMiddleware, validateDtoMiddleware(UpdateUserDto) ,UserController.updateUser);

// Delete user (requires auth)
router.delete("/users/:id", authMiddleware, UserController.deleteUser);

export default router;

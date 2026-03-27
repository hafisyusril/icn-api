import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateDtoMiddleware } from "../middlewares/validate.middleware";
import { CreateTaskDto, UpdateTaskDto } from "../services/dto/task.dto";

const router = Router();

// Create task (requires auth)
router.post("/tasks", authMiddleware, validateDtoMiddleware(CreateTaskDto), TaskController.createTask);

// Get all tasks
router.get("/tasks", TaskController.getAllTasks);

// Get current user's tasks (requires auth)
router.get("/tasks/my-tasks", authMiddleware, TaskController.getUserTasks);

// Get task by ID
router.get("/tasks/:id", TaskController.getTaskById);

// Update task (requires auth)
router.put("/tasks/:id", authMiddleware, validateDtoMiddleware(UpdateTaskDto), TaskController.updateTask);

// Delete task (requires auth)
router.delete("/tasks/:id", authMiddleware, TaskController.deleteTask);

// Get tasks by user ID
router.get("/users/:id/tasks", TaskController.getTasksByUserId);

export default router;

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { errorHandler } from './middlewares/error.middleware';
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import taskRoutes from "./routes/task.route";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(userRoutes);
app.use(taskRoutes);

// debug log
app.use((req, _res, next) => {
  console.log("HIT:", req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  console.log("ROOT HIT");
  res.send("API RUNNING");
});

app.use(errorHandler);

export default app; // 🔥 penting
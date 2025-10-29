import { Router } from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getOpenTasks,
  getCompleteTasks,
} from "../controllers/task.controller.js";

const taskRoute = Router();

taskRoute.get("/all", getAllTasks);
taskRoute.get("/task/:id", getTaskById);
taskRoute.get("/open", getOpenTasks);
taskRoute.get("/complete", getCompleteTasks);
taskRoute.post("/create", createTask);

taskRoute.put("/:id", updateTask);

taskRoute.delete("/:id", deleteTask);

export default taskRoute;

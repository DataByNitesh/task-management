import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
} from "../controllers/task.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.get("/:id", protect, getTaskById);
router.put("/:id", protect, updateTask);
router.patch("/:id/status", protect, adminOnly, updateTaskStatus);

export default router;

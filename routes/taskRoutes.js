import express from "express";
import {
  fetchPendingTasks,
} from "../controllers/taskController.js";
import { attachUser } from "../middleware/userHeader.js";

const router = express.Router();

router.get("/pending", attachUser, fetchPendingTasks); // ✅ your new pending route

export default router;

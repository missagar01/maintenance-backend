import express from "express";
import {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);      // Fetch all users
router.post("/", addUser);         // Add new user
router.put("/:id", updateUser);    // Update user
router.delete("/:id", deleteUser); // Delete user

export default router;

import express from "express";
import { getDoers, addDoer, updateDoer, deleteDoer } from "../controllers/doerController.js";

const router = express.Router();

router.get("/doers", getDoers);
router.post("/doers", addDoer);
router.put("/doers/:id", updateDoer);
router.delete("/doers/:id", deleteDoer);

export default router;

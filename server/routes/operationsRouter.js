import express from "express";
import { createOperation, deleteOperation, getOperation, updateOpertaion } from "../controllers/operationsControllers.js";



const router = express.Router();

router.post("/createoperation", createOperation);
router.get("/getoperation", getOperation);
router.put("/updateoperation", updateOpertaion);
router.delete("/deleteoperation", deleteOperation);

export default router;

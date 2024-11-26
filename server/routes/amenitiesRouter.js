import express from "express";
import { createAmenities, deleteAmenities, getAmenities, updateAmenities } from "../controllers/amenitiesControllers.js";


const amenitiesRouter = express.Router();

amenitiesRouter.post("/createamenities", createAmenities);
amenitiesRouter.get("/getamenities", getAmenities);
amenitiesRouter.put("/updateamenities", updateAmenities);
amenitiesRouter.delete("/deleteamenities", deleteAmenities);

export default amenitiesRouter;
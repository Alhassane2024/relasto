import express from "express";
import { createProperty, deleteProperty, getProperty, updateProperty } from "../controllers/propertiesControllers.js";


const propertiesRouter = express.Router();

propertiesRouter.post("/createproperty", createProperty);
propertiesRouter.get("/getproperty", getProperty);
propertiesRouter.put("/updateproperty", updateProperty);
propertiesRouter.delete("/deleteproperty", deleteProperty);

export default propertiesRouter;
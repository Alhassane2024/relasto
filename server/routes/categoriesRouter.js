import express from "express";
import { createCategory, deleteCategory, getCategory, updateCategory } from "../controllers/categoriesControllers.js";


const categoriesRouter = express.Router();

categoriesRouter.post("/createcategory", createCategory);
categoriesRouter.get("/getcategory", getCategory);
categoriesRouter.put("/updatecategory", updateCategory);
categoriesRouter.delete("/deletecategory", deleteCategory);

export default categoriesRouter;
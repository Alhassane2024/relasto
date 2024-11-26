import express from "express";
import { addPropertyImage, deletePropertyImage, getPropertyImages } from "../controllers/propertyImagesControllers.js";
import upload from "../middlewares/uploadImages.js";


const propertyImagesRouter = express.Router();

propertyImagesRouter.post("/createpropertyimages", upload.single("image"), addPropertyImage);
propertyImagesRouter.get("/getpropertyimages", getPropertyImages);
propertyImagesRouter.delete("/deletepropertyimages", deletePropertyImage);

export default propertyImagesRouter;
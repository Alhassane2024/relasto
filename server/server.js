import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import router from "./routes/operationsRouter.js";
import categoriesRouter from "./routes/categoriesRouter.js";
import propertiesRouter from "./routes/propertiesRouter.js";
import propertyImagesRouter from "./routes/propertyImagesRouter.js";
import amenitiesRouter from "./routes/amenitiesRouter.js";


const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.static("client"));
app.use("/upload", express.static("upload"));

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname + "/../client/index.html"))
});


app.use("/api/operations", router);

app.use("/api/categories", categoriesRouter);

app.use("/api/properties", propertiesRouter);

app.use("/api/propertyimages", propertyImagesRouter);

app.use("/api/amenities", amenitiesRouter);

app.listen(PORT, console.log(`server listening on port ${PORT}`)
)
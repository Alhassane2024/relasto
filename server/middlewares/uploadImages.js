import multer from "multer";
import path from "path";

const storage = multer.diskStorage(
    {destination:(req, file, cb)=>{
        cb(null, "upload/")
    },
    filename: (req, file, cb)=>{
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(file.originalname);
        cb(null, uniqueSuffix + fileExtension);
    }
}
);

const upload = multer({ storage });
console.log(upload);

export default upload;


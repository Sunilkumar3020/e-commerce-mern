import multer from "multer";
import path from "path";

// store file temporarily

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname.replace(/\s/g, "");
        cb(null, uniqueName)
    }
})

// File filter (only images)

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpg|jpeg|png|webp/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (ext && mime) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"))
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },// 2MB limit
    fileFilter
})

export default upload
import multer from "multer";
import { extname, resolve } from "node:path";
import { v4 } from "uuid";
import { fileURLToPath } from "url";

// Corrige o __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "assets"),
        filename: (req, file, cb) => {
            cb(null, v4() + extname(file.originalname));
        },
    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif",
            "image/webp",
        ];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type."));
        }   
    },
};
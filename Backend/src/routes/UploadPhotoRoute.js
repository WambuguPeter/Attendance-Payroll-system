import { Router } from 'express';
import path from 'path';
import multer from 'multer';

const uploadImageRouter = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(new URL('../../src/photos/users', import.meta.url).pathname);
        cb(null, uploadDir); // Specify the absolute destination folder
    },
    filename: function (req, file, cb) {
        const uniqueFileName = `${Date.now()}_${file.originalname}`; // Generate a unique filename
        cb(null, uniqueFileName);
    }
});



// Initialize multer with the configured storage
const uploadToUser = multer({ storage });


// Define the route for uploading user profiles
uploadImageRouter.post('/upload-user-profile', uploadToUser.single('file'), (req, res) => {
    res.send({ imageUrl: `http://localhost:8000/photos/users/${req.file.filename}` });
});


export default uploadImageRouter;
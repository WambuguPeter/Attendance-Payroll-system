import { Router } from 'express';
const uploadImageRouter = Router();
import multer from 'multer';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../src/photos/users'); // Specify the destination folder
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
    res.send({ imageUrl: `http://localhost:8000/api/photos/users/${req.file.filename}` });
});

// uploadImageRouter.delete('/delete-user-profile', (req, res) => {
//     res.send('Image deleted');
// });

// uploadImageRouter.post('/upload-memory-img', (req, res) => {
//     res.send('Image updated');
// });
// uploadImageRouter.post('/upload-many-memory-img',uploadToMemory.array('manyMemories',10), (req, res) => {
//     res.files.forEach(file => {
//         console.log(file);
//     });
//     req.body.forEach(file => {
//         console.log(file);
//     });
//     res.send('Image updated');
// });

export default uploadImageRouter
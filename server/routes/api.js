import express from 'express';
import { SignupUser,loginUser } from '../controller/user_controller.js';
import { uploadImage } from '../controller/upload_image.js';
// api.js
import upload from '../utils/upload.js';



const router = express.Router();


router.post('/signup',SignupUser);
router.post('/login',loginUser);
router.post('/file/upload',upload.single('file'),uploadImage);

export default router;
import express from 'express';
import { SignupUser,loginUser } from '../controller/user_controller.js';
import { uploadImage,getImage } from '../controller/upload_image.js';

import upload from '../utils/upload.js';
import { createPost } from '../controller/post-controller.js';



const router = express.Router();


router.post('/signup',SignupUser);
router.post('/login',loginUser);

router.post('/create',createPost);

router.post('/file/upload',upload.single('file'),uploadImage);
router.get('/file/:filename', getImage);



export default router;
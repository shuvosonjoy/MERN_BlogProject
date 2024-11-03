import express from 'express';
import { SignupUser,loginUser } from '../controller/user_controller.js';
import { uploadImage,getImage } from '../controller/upload_image.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import upload from '../utils/upload.js';
import { createPost, getAllPosts } from '../controller/post-controller.js';



const router = express.Router();


router.post('/signup',SignupUser);
router.post('/login',loginUser);

router.post('/create',authenticateToken,createPost);
router.get('/posts',authenticateToken,getAllPosts);

router.post('/file/upload',upload.single('file'),uploadImage);
router.get('/file/:filename', getImage);



export default router;
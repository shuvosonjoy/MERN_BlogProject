import express from 'express';
import { SignupUser,loginUser } from '../controller/user_controller.js';
import { uploadImage,getImage } from '../controller/upload_image.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import upload from '../utils/upload.js';
import { createComment } from '../controller/comment.js';
import { createPost, getAllPosts, getPost,UpdatePost,deletePost} from '../controller/post-controller.js';



const router = express.Router();


router.post('/signup',SignupUser);
router.post('/login',loginUser);

router.post('/create',authenticateToken,createPost);
router.get('/posts',authenticateToken,getAllPosts);

router.post('/file/upload',upload.single('file'),uploadImage);
router.get('/file/:filename', getImage);

router.get('/post/:id',authenticateToken,getPost);


router.put('/update/:id',authenticateToken,UpdatePost);
router.delete('/delete/:id',authenticateToken,deletePost);

router.post('/comment',authenticateToken,createComment);



export default router;
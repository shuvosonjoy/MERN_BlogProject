import express from 'express';
import { SignupUser,loginUser } from '../controller/user_controller.js';
import { uploadImage,getImage } from '../controller/upload_image.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import upload from '../utils/upload.js';
import { getAllComments, newComment } from '../controller/comment.js';
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
// router.delete('/delete/:id',authenticateToken,deletePost);
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    console.log("ID: ",id);
    if (!id) {
        return res.status(400).json({ error: "Post ID is required" });
    }
    try {
        // Delete logic here
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});


router.post('/comment/new',authenticateToken,newComment);
router.get('/comments/:id',authenticateToken,getAllComments);



export default router;
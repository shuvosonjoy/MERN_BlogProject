
import Post from '../model/post.js';


export const createPost = async (request, response) => {
    try {
        const post = await new Post(request.body);
        post.save();

        response.status(200).json('Post saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getAllPosts = async(request,response)=>{

    try{
     
        let posts = await Post.find({});
        console.log(posts);
     
       return response.status(200).json(posts);

    }catch(error){
        response.status(500).json(error);
    }
}
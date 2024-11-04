
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
let category = request.query.category;
let posts;
    try{
       
     if (category){
        posts = await Post.find({categories:category});
      
     }
       else{
        posts = await Post.find();
       }
     return response.status(200).json(posts);
    }catch(error){
        response.status(500).json(error);
    }
}




export const getPost = async(req,res)=>{
    try{
       
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);

    }catch(e){
        res.status(500).json(e);
    }
    }
    

    export const UpdatePost = async(req,res)=>{
        
   
   try{

    const post = await Post.findById(req.params.id);
 
   if(!post){
         return res.status(404).json('Post not found');
   }
   await Post.findByIdAndUpdate(req.params.id,{$set:req.body});
    return res.status(200).json('Post updated successfully');
   }catch(e){
         res.status(500).json(e);

   }
    }
export const deletePost = async(req,res)=>{
try{

    let post = await Post.findById(req.params.id);
   
    if(!post){
        return res.status(404).json('Post not found');
    }
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json('Post deleted successfully');

}catch(e){
    res.status(500).json(e);

}
}
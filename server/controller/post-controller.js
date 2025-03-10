
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
        console.log(category);
       
     if (category){
        posts = await Post.find({categories:category});
        console.log(posts);
      
     }
       else{
        posts = await Post.find();
        console.log(posts);
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


    export const deletePost = async (request, response) => {
        try {
            console.log("here in delete");
            const post = await Post.findById(request.params.id);
            
            await post.delete()
    
            response.status(200).json('post deleted successfully');
        } catch (error) {
            response.status(500).json(error)
        }
    }
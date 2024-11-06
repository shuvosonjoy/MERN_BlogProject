
import comment from '../model/comment.js';


export const createComment = async (req, res) => {
try{
    const newComment = await new comment(req.body);
    newComment.save();

    res.status(200).json('Comment saved successfully');

}catch(e){
    res.status(500).json(e);
}
}

export const getAllComments = async (req, res) => {
try{
    const comments = await comment.find({postId:req.params.id});
    console.log(comments);
    res.status(200).json(comments);

}
catch(e){
    res.status(500).json(e);
}
}
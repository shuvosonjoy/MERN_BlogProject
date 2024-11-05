
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
import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema({
    postId:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    comments:{
        type: String,
        required: true
    },

    createdDate: {
        type: Date
    }
});


const comment = mongoose.model('comments', CommentSchema);

export default comment;
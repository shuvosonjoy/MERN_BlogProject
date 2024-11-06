import { Button, Container, InputBase, styled,Box } from "@mui/material";
import { useState,useContext, useEffect } from "react";
import { DataContext } from "../../context/data_provider";
import{API} from "../../../service/api"
import AllComments from "./all-comments";

const CommentBox = styled(InputBase)`
  flex: 1;
  margin: 50px 10px;
  border: 1px solid #878787;
  font-size: 25px;
`;
const initialValues = {
    name: "",
    postId: "",
  date: new Date(),
  comments: "",
};
const Comments = ({ post }) => {
  let [comment, setComment] = useState(initialValues);
  const [allComments,setComments]= useState([]);
  const [toggle, setToggle] = useState(false);

  const { account } = useContext(DataContext);


  useEffect(() => {
  const fetchComments = async()=>{

    let res = await API.getAllComments(post._id);
    if (res.isSuccess) {
     setComments(res.data);
     setToggle(prev => !prev);
  }
  };fetchComments();
  },[toggle,post]);

  const handleChange = (e) => {
    setComment({
      ...comment,
      postId: post._id,
      name:account.username,
      comments: e.target.value,
    });
  };
  const AddComment = async (e) => {
let res = await API.NewComment(comment);
if(res.isSuccess){
    setComment(initialValues);
}

  };

  return (
    <Box>

<Container style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
      <CommentBox
        name="title"
        placeholder="Comments"
        value={comment.comments}
        onChange={(e) => handleChange(e)}
      />
      <Button variant="contained" onClick={(e) => AddComment(e)}>
        Comment
      </Button>
    
    </Container>

    <Box>
      {  allComments && allComments.length>0 && allComments.map((comment) => (
        <AllComments comment ={comment} setToggle={setToggle}/>
        ))}
      </Box>
    </Box>
   
  );
};

export default Comments;

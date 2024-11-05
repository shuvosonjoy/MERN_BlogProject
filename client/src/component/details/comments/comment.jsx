import { Button, Container, InputBase, styled } from "@mui/material";
import { useState,useContext } from "react";
import { DataContext } from "../../context/data_provider";
import{API} from "../../../service/api"
const CommentBox = styled(InputBase)`
  flex: 1;
  margin: 50px 10px;
  border: 1px solid #878787;
  font-size: 25px;
`;
const initialValues = {
  postId: "",
  name: "",
  createdDate: new Date(),
  comments: "",
};
const Comments = ({ post }) => {
  let [comment, setComment] = useState(initialValues);

  const { account } = useContext(DataContext);

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
  );
};

export default Comments;

import {Button, Container, InputBase,styled} from '@mui/material';




const CommentBox = styled(InputBase)`
  flex: 1;
  margin: 100px 100px;
  border: 1px solid #878787;
  font-size: 25px;
`;

const Comments = () =>{
return (
   <Container>
<CommentBox
   
   name="title"
   placeholder="Comments"
   style={{ fontSize: 25, flex: 1, margin: "0 30px" , alignItems: "start"}}
 />
 <Button variant='contained'>
    Comment
 </Button>
   </Container> 
  
)
}

export default Comments;
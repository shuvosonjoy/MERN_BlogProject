import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';

import { DataContext } from '../../context/data_provider';

import { API } from '../../../service/api';

//components
import AllComment from './all-comments';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const { account } = useContext(DataContext);

    useEffect(() => {
      const getData = async () => {
          if (!post?._id) return;  // Prevent request if post._id is undefined
  
          const response = await API.getAllComments(post._id);
          if (response.isSuccess) {
              setComments(response.data);
          }
      }
      getData();
  }, [toggle, post]);
  

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async () => {
      if (!comment.comments.trim()) return; // Prevent empty comments
  
      try {
        console.log(comment);
          const response = await API.newComment(comment);
          if (response.isSuccess) {
              setComment(prev => ({
                  ...initialValue,
                  name: prev.name,
                  postId: prev.postId
              }));
              setToggle(prev => !prev);
          } else {
              console.error("Failed to post comment:", response.msg);
          }
      } catch (error) {
          console.error("Error posting comment:", error);
      }
  };
  
    
    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />   
                <StyledTextArea 
                    rowsMin={5} 
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)} 
                    value={comment.comments}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}
                >Post</Button>             
            </Container>
            <Box>
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        <AllComment comment={comment} setToggle={setToggle} key={comment._id}/>
                    ))
                }
            </Box>
        </Box>
    )
}

export default Comments;
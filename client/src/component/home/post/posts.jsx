import { useEffect, useState } from "react";
import{Box} from '@mui/material';
import {API} from "../../../service/api";
import Post from "./post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      let response = await API.getAllPosts();
      console.log(response.data);
      
      if (response.isSuccess) {
     
        setPosts(response.data);
    
      }
      
    };
    fetchData();
  }, []);

  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post) => <Post post={post}/>)
      ) : (
        <Box style={{margin:'30px,80px'}}>No Data Available</Box>
      )}
    </>
  );
};

export default Posts;

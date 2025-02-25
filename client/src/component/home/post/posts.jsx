import { useEffect, useState } from "react";
import { Box, colors, Grid } from "@mui/material";
import { API } from "../../../service/api";
import Post from "./post";
import { useSearchParams, Link } from "react-router-dom";
import DetailView from "../../details/detailViews";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      console.log("entered posts.jsx");
      console.log(category);
     let response = await API.getAllPosts({ category: category });
    
      console.log(response.data);

      if (response.isSuccess) {
        setPosts(response.data);
      }
    };
    fetchData();
  }, [category]);

  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Grid item lg={3} sm={4} xs={12} key={post._id}>
            <Link to ={`details/${post._id}`} style={{textDecoration:'none',color:'inherit'}}>
           
              <Post post={post} />
            </Link>
          </Grid>
        ))
      ) : (
        <Box style={{ margin: "30px,80px" }}>No Data Available</Box>
      )}
    </>
  );
};

export default Posts;

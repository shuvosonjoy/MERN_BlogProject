import { useState,useEffect,useContext } from "react";
import { Box, FormControl, styled, InputBase, Button ,TextareaAutosize} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useLocation,useNavigate } from "react-router-dom";
import { DataContext } from "../context/data_provider";
import {API} from '../../service/api';


const Container = styled(Box)(({ theme }) => ({
  margin: '50px 100px',
  [theme.breakpoints.down('md')]: {
      margin: 0
  }
}));

const Image = styled('img')({
  width: '100%',
  height: '50vh',
  objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  margin-top: 50px;
  font-size: 18px;
  &:focus-visible {
      outline: none;
  }
`;

const initialPost = {
  title: '',
  description: '',
  picture: '',
  username: '',
  categories: '',
  createdDate: new Date()
}

const CreatePost = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState('');
  const { account } = useContext(DataContext);

  const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
  
  useEffect(() => {
      const getImage = async () => { 
          if(file) {
           
              const data = new FormData();
              data.append("name", file.name);
              data.append("file", file);
              console.log("File Object this :", file);
              console.log("FormData entries:");
              for (let [key, value] of data.entries()) {
                  console.log(`${key}:`, value);
              }
              const response = await API.uploadFile(data);
              post.picture = response.data;
          if(response.isSuccess){
            console.log("success api call");
          }
          else{
            console.error("Error in uploading image:", response.msg);
          }
          }
      }
      getImage();
      post.categories = location.search?.split('=')[1] || 'All';
      post.username = account.username;
   
  }, [file])

 

  const handleChange = (e) => {
      setPost({ ...post, [e.target.name]: e.target.value });
  }
  const savePost =async()=>{
  const response = await API.CreatePost(post);

  if(response.isSuccess){
    navigate('/');
  }
  }
  return (
      <Container>
          <Image src={url} alt="post" />

          <StyledFormControl>
              <label htmlFor="fileInput">
                  <Add fontSize="large" color="action" />
              </label>
              <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    console.log("Selected File:", selectedFile); 
                    setFile(selectedFile);
                 
                  }}
              />
              <InputTextField onChange={(e) => handleChange(e)} name='title' placeholder="Title" />
              <Button  variant="contained" color="primary" onClick={()=>savePost()}>Publish</Button>
          </StyledFormControl>

          <Textarea
              rowsMin={5}
              placeholder="Tell your story..."
              name='description'
              onChange={(e) => handleChange(e)} 
          />
      </Container>
  )
}

export default CreatePost;
import { useState,useEffect,useContext } from "react";
import { Box, FormControl, styled, InputBase, Button ,TextareaAutosize} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { DataContext } from "../context/data_provider";
import {API} from '../../service/api';
const Container = styled(Box)`
  margin: 80px 100px;

  display: flex;
  flex-direction: column;
  align-items: start;
`;

const StyledForm = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
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

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const initialPost = {
  title: '',
  description: '',
  picture: '',
  username: '',
  categories: '',
  createdDate: new Date()
}


const CreatePost = () => {
  const [post, setPost] = useState(initialPost);

const handleChange = (e) => {
setPost({...post,[e.target.name]:e.target.value});
}
const[file,setFile]= useState('');
const location = useLocation();

const {account} = useContext(DataContext);

useEffect(() => {

const getImage =async() => {

  if(file){
    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append("name", filename);
    data.append("file", file);
   const response = await API.uploadFile(data);
   post.picture = response.data;

  }
}
getImage();
post.categories=location.search?.split("=")[1]  || "All";
post.username = account.username;

},[file]);



  const url =
    "https://t4.ftcdn.net/jpg/06/88/66/31/240_F_688663136_CYDZXf10utvUG7QScsByISc5AaEDf68F.jpg";
  return (
    <Container>
      <Image src={url} alt="banner" />
      <StyledForm>
        <label htmlFor="fileinput">
          <Add fontSize="large" color="action" />
        </label>
        <input type="file" id="fileinput" style={{ display: "none" }} onChange={(e)=>setFile(e.target.files[0])}/>
        <InputField placeholder="Title" onChange={(e)=>handleChange(e)} name="title"/>
        <Button variant="contained">Submit</Button>
      </StyledForm>
      <Textarea
      minRows={5}
      placeholder="Tell your story"
      onChange={(e)=>handleChange(e)} name="description"

      />
    </Container>
  );
};

export default CreatePost;

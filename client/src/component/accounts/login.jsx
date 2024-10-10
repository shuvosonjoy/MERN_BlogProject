import { Box, Button, styled, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { API } from "../../service/api";


const Component = styled(Box)`
  width: 400px;
  height: 450px;
  padding: 20px 20px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6);
`;
const Header = styled("h1")({
  display: "flex",
  justifyContent: "center",
  color: "grey",
  margin: "auto",
});

const Wrapper = styled(Box)`
  padding: 5px 5px;
  display: flex;
  flex: 1;
  flex-direction: Column;
  & > div,
  & > button {
    margin-top: 20px;
    margin-bottom: 10px;
  }
`;

const LoginButton = styled(Button)`
  background-color: #4caf50;
  height: 50px;
  font-size: 15px;
  color: black;
  font-weight: 600;
  font-family: "Roboto", sans-serif;
`;
const SignupButton = styled(Button)`
  color: black;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  background-color: grey;
  font-size: 15px;
`;

const signUpValues = {
  email: "",
  username: "",
  password: "",
};
const loginValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [account, toggleAccount] = useState(true);
  const [signup, setSignUpValues] = useState(signUpValues);
  const [login, setLoginValues] = useState(loginValues);

  const textInput = (e) => {
    setSignUpValues({ ...signup, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    toggleAccount(!account);
  };
  const SignUpUser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      setSignUpValues(signUpValues);
    }
  };

  const loginValueChange = (e) => {
    setLoginValues({ ...login, [e.target.name]: e.target.value });
  };

const LoginUser = async ()=>{
  let response  = await API.userLogin(login);
  console.log(response);
  if(response.isSuccess){
 
   
    sessionStorage.setItem("accessToken",`Bearer ${response.data.accessToken}`);
    sessionStorage.setItem("refreshToken",`Bearer ${response.data.refreshToken}`);
  }
}

  return (
    <Component>
      <Box>
        <Header>Administrative</Header>
        {account === true ? (
          <Wrapper>
            <TextField
              variant="standard"
              label="Enter Email"
              name="email"
              onChange={(e) => loginValueChange(e)}
            />
            <TextField
              variant="standard"
              label="Enter Password"
              name="password"
              onChange={(e) => loginValueChange(e)}
            />
            <LoginButton onClick={()=>LoginUser()}>Login</LoginButton>
            <Typography style={{ textAlign: "center" }}>OR</Typography>
            <SignupButton onClick={() => handleToggle()}>
              Create An Account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              label="Email"
              name="email"
              onChange={(e) => textInput(e)}
            />
            <TextField
              variant="standard"
              label="UserName"
              name="username"
              onChange={(e) => textInput(e)}
            />
            <TextField
              variant="standard"
              label="Password"
              name="password"
              onChange={(e) => textInput(e)}
            />
            <SignupButton onClick={() => SignUpUser()}>SignUp</SignupButton>
            <Typography style={{ textAlign: "center" }}>OR</Typography>
            <LoginButton onClick={() => handleToggle()}>
              Already Have an Account? Login
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;

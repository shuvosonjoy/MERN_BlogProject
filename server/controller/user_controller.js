import bcrypt from 'bcryptjs';

import jwt from "jsonwebtoken";
import UserModel from "../model/userModel.js";
import TokenModel from "../model/token.js";
import env from "dotenv";

env.config();

export const SignupUser = async (req, res) => {
  try {

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = {
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    };
    console.log("here: User ",user);
    let result = await UserModel.create(user);

    return res.status(200).json({ message: "SignUp Successfull", result });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: e.message });
  }
};

export const loginUser = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  console.log("User: ",user);
  if (!user) {
    
    return res.status(404).json({ message: "User not found" });
  }

  try {
  
    
    let passMatch = await bcrypt.compare(req.body.password, user.password);
  
    if (!passMatch) {
      console.log("passNotMatched");
      console.log(req.body.password);
      console.log(user.password);
      return res.status(400).json({ message: "Invalid Passwords" });
    } else {
      console.log("passMatched");
  console.log(process.env.ACCESS_TOKEN_SECRET);
  console.log(process.env.REFRESH_TOKEN_SECRET);
      
      const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET,{expiresIn: '15m'});
      const refreshToken = jwt.sign(user.toJSON(),process.env.REFRESH_TOKEN_SECRET);

      let token  = await TokenModel.create({token:refreshToken});
      console.log("Token: ",token); 
      return res.status(200).json({message:"Login Successfull",accessToken:accessToken,refreshToken:refreshToken ,email:user.email,username:user.username});
      console.log("Login Successfull");
    }
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: e.message });
  }
};

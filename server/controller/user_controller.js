import bcrypt from "bcrypt";

import UserModel from "../model/userModel.js";

export const SignupUser = async (req, res) => {
  try {

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    const user = {email: req.body.email, username: req.body.username,  password: hashedPassword};
    console.log(user);
    let result = await UserModel.create(user);
    
   return res.status(200).json({ message: "SignUp Successfull", result });
  } catch (e) {
 
   return res.status(500).json({ message: "Something went wrong", error: e.message });
  }
};

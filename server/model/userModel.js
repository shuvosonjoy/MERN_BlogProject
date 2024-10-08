import Mongoose from "mongoose";

const UserSchema = Mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: { type: String, required: true },
});

const UserModel = Mongoose.model("users", UserSchema);

export default UserModel;

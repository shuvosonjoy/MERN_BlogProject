import Mongoose from "mongoose";

const TokenSchema = Mongoose.Schema({
token:{
    type: String,
    required: true,
}
});

const TokenModel = Mongoose.model("token", TokenSchema);

export default TokenModel;

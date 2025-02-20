import mongoose from 'mongoose';

const Connection = (username, password) => {
    const URL = `mongodb+srv://shuvosdg123:shuvosd123@simpleblog.vwup0.mongodb.net/simpleblog`;
    console.log(username);
    console.log(password);

    mongoose.connect(URL, {
        useNewUrlParser: true,  // No longer needed for Mongoose v6+
        useUnifiedTopology: true, // No longer needed for Mongoose v6+
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Database connection error:", err));
    
}

export default Connection;

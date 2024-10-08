import mongoose from 'mongoose';

const Connection = (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@simpleblog.vwup0.mongodb.net/simpleblog`;

    mongoose.connect(URL)
    .then(() => console.log('Database connected successfully!!'))
    .catch((error) => {
        console.log('Failed to connect with database...');
        console.log(error.message);
        process.exit(1);
    });
}

export default Connection;

import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import Router from './routes/api.js';


dotenv.config();

const app = express();

const PORT = 5000;

app.use('/',Router);

app.listen(PORT,()=>console.log(`Server 1 is running on port ${PORT}`));

const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(userName,password);
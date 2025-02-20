import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import Router from './routes/api.js';
import cors from 'cors';
import BodyParser from 'body-parser';
import path from "path";
dotenv.config();

const app = express();

const PORT = 5000;

const __dirname = path.resolve();


app.use(express.static(path.join(__dirname, "/client/build"))); 
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client","build", "index.html"));
  });


app.use(cors());
app.use(BodyParser.json({extended:true}));
app.use(BodyParser.urlencoded({extended:true}));
app.use('/',Router);

app.listen(PORT,()=>console.log(`Server 1 is running on port ${PORT}`));

const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(userName,password);
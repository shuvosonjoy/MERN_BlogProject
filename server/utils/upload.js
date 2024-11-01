import { GridFsStorage } from 'multer-gridfs-storage';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD; 

const storage = new GridFsStorage({
   url: `mongodb+srv://${username}:${password}@simpleblog.vwup0.mongodb.net/simpleblog`,
   options: { useNewUrlParser: true },
   file: (request, file) => {
       console.log("Received file for storage:", file);
       
       const match = ["image/png", "image/jpg"];
       if (match.indexOf(file.mimetype) === -1) {
           console.log("File type not supported.");
           return `${Date.now()}-blog-${file.originalname}`;
       }

       console.log("Storing file with valid type.");
       return {
           bucketName: "photos",
           filename: `${Date.now()}-blog-${file.originalname}`
       };
   }
});



export default multer({ storage });

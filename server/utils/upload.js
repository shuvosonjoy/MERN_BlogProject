import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
  url: `mongodb+srv://${username}:${password}@simpleblog.vwup0.mongodb.net/simpleblog`,
  options: { useNewUrlParser: true, useUnifiedTopology: true }, // Add this option for better MongoDB connection handling
  file: (request, file) => {
    const match = ["image/png", "image/jpg"];

    // Corrected typo in `mimetype`
    if (match.indexOf(file.mimetype) === -1) {
      return `${Date.now()}-blog-${file.originalname}`;
    }

    return {
      bucketName: "photos", // MongoDB GridFS bucket name
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

export default multer({ storage });

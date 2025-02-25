import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

export const authenticateToken = (request, response, next) => {
    console.log("top of jwtcontroller");
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) {
        return response.status(401).json({ msg: 'token is missing' });
    }
  

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
            return response.status(403).json({ msg: 'invalid token' })
        }

        request.user = user;
        console.log("here authenticated");
        next();
    })
}
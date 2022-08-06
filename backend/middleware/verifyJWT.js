import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

export const verifyJWT = (req,res,next)=>{
    const authHeader = req.headers['authorization'];

    if(!authHeader) return res.status(401).json({
        msg: 'User is not authorized, please login first'
    });

    console.log('authheader ============> ',authHeader); 
    const token = authHeader.split(' ')[1];
    console.log('TOKEN',token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded) => {
            if(err) return res.sendStatus(403);// invalid token

            req.user = decoded.username;
            next();
        }
    )
}
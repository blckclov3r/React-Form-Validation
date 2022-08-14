import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

export const verifyJWT = (req,res,next)=>{
    // const authHeader = req.headers['authorization'];
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log('authHeader',authHeader);
    
    if(!authHeader?.startsWith("Bearer ")) return res.status(401).json({
        msg: 'User is not authorized, please login first'
    });

    // console.log('authheader ============> ',authHeader); 
    const token = authHeader.split(' ')[1];
    console.log('TOKEN',token)
    jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded) => {
            if(err) return res.status(403).json({
                msg: 'ACCESS_TOKEN ERROR'
            })
            req.roles = decoded.UserInfo.roles
            req.user = decoded.UserInfo.username;
            next();
        }
    )
}
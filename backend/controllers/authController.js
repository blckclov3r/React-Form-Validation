import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { readFile } from 'fs/promises';
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const users = JSON.parse(
    await readFile(
      new URL('../model/users.json', import.meta.url)
    )
);

const userDB = {
    users
}

dotenv.config();
const fsPromises = fs.promises;

export const handleLogin = async (req,res,next) =>{
    const {user,pwd} = req.body;
    if(!user || !pwd){
        return res.status(400).json({
            msg: "username and password is required"
        })
    }
    const foundUser = userDB.users.find(person=>person.username === user);
    if(!foundUser){
        // create JWTs
        return res.status(401).json({
            msg: "USER NOT FOUND IN OUR DATABASE"
        }); // unauthorize
    }
    const match = await bcrypt.compare(pwd,foundUser.password);
    if(match){
        const accessToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '60s'}
        )

        // const refreshToken = jwt.sign(
        //     { "username": foundUser.username },
        //     process.env.REFRESH_TOKEN_SECRET,
        //     {expiresIn: '1d'}
        // )
        
        // checking the user
        const otherUser = userDB.users.filter(person => person.username !== foundUser.username);
        const currentUser = {...foundUser,accessToken}

        userDB.users = [...otherUser,currentUser];

        await fsPromises.writeFile(
            path.join(__dirname,'..','model','users.json'),
            JSON.stringify(userDB.users)
        )
        
        // http cookie indicate not available in javascript
        res.cookie("accessToken",accessToken,{
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        res.json({
            msg: "successfully login",
            user: currentUser
          
        })
    }else{
        res.sendStatus(401); //unauthorize
        next();
    }
}
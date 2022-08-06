import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

const fsPromises = fs.promises;

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


export const handleNewUser = async (req,res)=>{

    const {user,pwd} = req.body;

    // console.log(user,pwd)
    if(!user || !pwd){
        return res.status(400).json({
            msg: "username and password is required"
        })
    }
    const duplicate = userDB.users?.find(person=> person.username == user);
    if(duplicate){
        return res.status(409).json({
            msg: "user is already exists"
        });
    }
    try {
        const hashedPwd = await bcrypt.hash(pwd,10);
      
        const newUser = {
            "id": uuidv4(),
            "username":user,
            "password":hashedPwd
        };

        userDB.users = [...userDB.users,newUser]

        // console.log('newUser',newUser)
        await fsPromises.writeFile(
            path.join(__dirname,'..','model','users.json'),
            JSON.stringify(userDB.users)
        )

        res.status(200).json({
            msg: 'users successfully created',
            response: newUser
        })
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}
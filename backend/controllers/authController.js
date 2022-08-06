import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';

import { readFile } from 'fs/promises';



const users = JSON.parse(
    await readFile(
      new URL('../model/users.json', import.meta.url)
    )
);

const userDB = {
    users
}

export const handleLogin = async (req,res) =>{
    const {user,pwd} = req.body;
    if(!user || !pwd){
        return res.status(400).json({
            msg: "username and password is required"
        })
    }
    const foundUser = userDB.users.find(person=>person.username === user);
    if(!foundUser){
        // create JWTs
        return res.status(401); // unauthorize
    }
    const match = await bcrypt.compare(pwd,foundUser.password);
    if(match){
        res.json({
            msg: "successfully login",
            user: foundUser
        })
    }else{
        res.sendStatus(401); //unauthorize
    }
}
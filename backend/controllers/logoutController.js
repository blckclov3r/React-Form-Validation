import { readFile } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fsPromises = fs.promises;

const users = JSON.parse(
    await readFile(
        new URL('../model/users.json', import.meta.url)
    )
);

const userDB = {
    users
}



export const handleLogout = async (req, res, next) => {
    // on client also delete the token
    const cookies = req.cookies;
   
    if (!cookies?.accessToken) {
        return res.sendStatus(204) // no content
    }


    const refreshToken = cookies?.accessToken;

    const foundUser = userDB.users.find(person => person.accessToken === refreshToken);

    if (!foundUser) {
        res.clearCookie('accessToken',{
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        });

        return res.status(403).json({
            msg: "USER NOT FOUND IN OUR DATABASE ",
            status: "FORBIDDEN"
        }); 
    }
    const otherPerson = userDB.users.find(person => person.accessToken !== refreshToken)
    const currentUser = {...foundUser,accessToken: ''}
    userDB.users = [otherPerson,currentUser];

    await fsPromises.writeFile(
        path.join(__dirname,'..','model','users.json'),
        JSON.stringify(userDB.users)
    )

    res.clearCookie('accessToken',{
        httpOnly: true,
        sameSite: 'None',
        secure: true,
    });
    res.sendStatus(204)
}


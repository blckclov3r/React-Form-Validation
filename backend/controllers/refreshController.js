import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { readFile } from 'fs/promises';

dotenv.config();

const users = JSON.parse(
    await readFile(
        new URL('../model/users.json', import.meta.url)
    )
);

const userDB = {
    users
}



export const handleRefreshToken = async (req, res, next) => {

    const cookies = req.cookies;

    if (!cookies?.accessToken) {
        return res.status(401).json({
            msg: "no authorization cookies is required"
        })
    }

    // console.log('COOKIES HANDLEREFRESH',cookies?.accessToken)

    const refreshToken = cookies?.accessToken;

    const foundUser = userDB.users.find(person => person.accessToken === refreshToken);

    if (!foundUser) {
        // create JWTs
        return res.status(403).json({
            msg: "USER NOT FOUND IN OUR DATABASE ",
            status: "FORBIDDEN"
        }); // unauthorize
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            console.log('decoded', decoded)
            if (err || foundUser.username !== decoded.username) return res.status(403).json("JWT VERIFY ERROR");

            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' } //for demo purposes
            );
            res.json({
                token: accessToken
            })
        }
    )
}


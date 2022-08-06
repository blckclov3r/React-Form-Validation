// corss origin resource sharing

import { allowedOrigins } from "./allowedOrigins.js";

export const corsOptions = {
    origin: (origin,callback)=>{
        console.log('whitelist origin',allowedOrigins.indexOf(origin))
        // !origin equivalent of undefined or false
        console.log('origin ==> ',origin)
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null,true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200  
}
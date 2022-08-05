// corss origin resource sharing
const whiteList = ['http://localhost:3500','http://localhost:3500/','http://127.0.0.1:3500','http://localhost:3000','http://127.0.0.1:3500','http://localhost:3500/','https://www.google.com'];
export const corsOptions = {
    origin: (origin,callback)=>{
        console.log('whitelist origin',whiteList.indexOf(origin))
        // !origin equivalent of undefined or false
        console.log('origin ==> ',origin)
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null,true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200  
}
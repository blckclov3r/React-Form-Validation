import { logEvents } from "./logEvents.js";


export const errorHandler = (err,req,res,next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt')
    console.log(err.stack);
    res.status(500).send(err.message);
    next();
}
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("^/$|/index(.html)?",(req,res)=>{
    // res.sendFile('./views/index.html',{root: __dirname})
    res.sendFile(path.join(__dirname,'..','views','index.html'))
});

export default router;

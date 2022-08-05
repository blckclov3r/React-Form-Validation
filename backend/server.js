import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'

import path from 'path';
import { fileURLToPath } from 'url';
import { errorHandler } from './middleware/errorHandler.js';


import rootRoutes from './routes/root.js'
import employeesRoutes from './routes/api/employees.js'
import registerRoutes from './routes/api/register.js'
import { corsOptions } from './configuration/corsOptions.js';

dotenv.config()

const app = express();
const port = process.env.PORT || 3500;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors(corsOptions));


// built-in middleware to handle urlencoded data
// on other owrds, <form-data>'content-type: application/x-www-form-url-encoded</form-data>
app.use(express.urlencoded({extended: false}));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use('/',express.static(path.join(__dirname, './public')))

// routes
app.use('/',rootRoutes)
app.use('/employees',employeesRoutes)
app.use('/register',registerRoutes)

app.get("/new-page(.html)?",(req,res)=>{
    res.sendFile(path.join(__dirname,'views','new-page.html'))
});

// all apply all http method  
app.all("*",(req,res)=>{
    if(req.accepts('html')){
        res.status(404).sendFile(path.join(__dirname,'views','404.html'))
    }else if(req.accepts('json')){
        res.status(404).json({
            msg: 'ERROR 404 NOT FOUND'
        })
    }else{
        res.status(404).send('404 not found')
    }
})

app.use(errorHandler)


app.listen(port,(req,res)=>{
    console.log("app listening port "+port)
})
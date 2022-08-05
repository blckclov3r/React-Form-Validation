import express from 'express';
import { readFile } from 'fs/promises';

const employees = JSON.parse(
  await readFile(
    new URL('../../model/employees.json', import.meta.url)
  )
);

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json(employees);
})

router.post('/',(req,res)=>{
    const {firstName, lastName} = req.body;
    res.status(200).json({
        "firstName": firstName,
        "lastName": lastName
    })
});


router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    res.status(200).json({
        "id": `here's your ${id}`
    });
});

router.put('/:id',(req,res)=>{
    const id = req.params.id;
    res.status(200).json({
        "id": `here's your updated ${id}`
    });
});

router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    res.status(200).json({
        "id": `here's your deleted ${id}`
    });
});



export default router;



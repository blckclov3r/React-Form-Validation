import { readFile } from 'fs/promises';

const employees = JSON.parse(
  await readFile(
    new URL('../model/employees.json', import.meta.url)
  )
);


export const getAllEmployees = (req,res)=>{
    // sorting by descending order
    const sortEmployees = employees.sort((a,b)=>{
        const A = a.id;
        const B = b.id;
        if(A > B){
            return -1;
        }
        if(A < B){
            return 1;
        }
        return 0;
    });
    res.status(200).json(sortEmployees)
}

export const createEmployee = (req,res)=>{
    const {firstName, lastName,id} = req.body;
    if(!firstName || !lastName){
        res.status(400).json({
            msg: "first and lastname are required"
        })
    }
    employees.push({id,firstName,lastName})
    res.status(201).json(employees)
}

export const getEmployee = (req,res,next)=>{
    const id = req.params.id;
    const employee = employees.find(emp => emp.id === parseInt(id));
    console.log(employee)
    if(!employee){
        return res.status(400).json({
            msg: `Employee id ${req.params.id} not found`
        });
    }
    employee.firstName = req.body.firstName;
    employee.lastName = req.body.lastName;
    res.status(200).json(employees)
}
export const updateEmployee = (req,res)=>{
    const id = req.params.id;
    const employee = employees.find(emp => emp.id === id);
    if(!employee){
        return res.status(400).json({
            msg: `Employee id ${req.params.id} not found`
        });
    }
    res.status(200).json(employee)
}

export const deleteEmployee = (req,res)=>{
    const id = req.params.id;
    const employee = employees.find(emp=>emp.id === parseInt(id));
    if(!employee){
        return res.status(400).json({
            msg: `Employee id ${req.params.id} not found`
        });
    }
    const filterArray = employees.filter(emp=>emp.id !== parseInt(id));
    res.status(200).json(filterArray)
}
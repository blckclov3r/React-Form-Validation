import express from 'express';

import { createEmployee, deleteEmployee, getAllEmployees, getEmployee, updateEmployee } from '../../controllers/employeeControllers.js';

const router = express.Router();

router.get('/',getAllEmployees)

router.post('/',createEmployee);

router.get('/:id',getEmployee);

router.put('/:id',updateEmployee);

router.delete('/:id',deleteEmployee);

export default router;



import express from 'express';

import { createEmployee, deleteEmployee, getAllEmployees, getEmployee, updateEmployee } from '../../controllers/employeeControllers.js';
import ROLES_LIST from '../../configuration/role_list.js';
import verifyRoles from '../../middleware/verifyRoles.js';

const router = express.Router();

router.get('/',verifyRoles(ROLES_LIST.Admin),getAllEmployees)

router.post('/',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),createEmployee);

router.get('/:id',getEmployee);

router.put('/:id',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),updateEmployee);

router.delete('/:id',verifyRoles(ROLES_LIST.Admin),deleteEmployee);

export default router;



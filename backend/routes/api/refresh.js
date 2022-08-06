import express from 'express';
import { handleRefreshToken } from '../../controllers/refreshController.js';


const router = express.Router();

router.get('/',handleRefreshToken);

export default router;
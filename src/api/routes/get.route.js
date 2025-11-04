import express from 'express';
import { getResponse } from '../../controllers/get.controller.js';

const router = express.Router();


router.post('/get', getResponse);

export default router;

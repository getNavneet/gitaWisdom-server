import express from 'express';
import { trackVisit } from '../../controllers/visit.controller.js';

const router = express.Router();


router.post('/track', trackVisit);

export default router;

import express from 'express';
import { submitFeedback, submitNewsletter } from '../../controllers/contact.controller.js';

const router = express.Router();


router.post('/feedback', submitFeedback);
router.post('/newsletter', submitNewsletter);

export default router;

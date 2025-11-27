import express from 'express';
import {
    chatWithPlanMexico
} from '../controllers/chatController.js';

const router = express.Router();

router.post('/chat/plan-mexico', chatWithPlanMexico);

export default router;
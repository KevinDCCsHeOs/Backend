import express from 'express';
import {
  createNoticiaDifusion,
  getNoticiasDifusion,
  getNoticiaDifusionById,
  updateNoticiaDifusion,
  deleteNoticiaDifusion,
} from '../controllers/Noticias_difusion.js';

const router = express.Router();

router.post('/noticias_difusion', createNoticiaDifusion);
router.get('/noticias_difusion', getNoticiasDifusion);
router.get('/noticias_difusion/:id', getNoticiaDifusionById);
router.put('/noticias_difusion/:id', updateNoticiaDifusion);
router.delete('/noticias_difusion/:id', deleteNoticiaDifusion);

export default router;
import express from 'express';

import {
  createForoComentario,
  getForoComentarios,
  getForoComentarioById,
  updateForoComentario,
  deleteForoComentario,
} from '../controllers/Foro_comentarios.js';

const router = express.Router();

router.post('/foro_comentarios', createForoComentario);
router.get('/foro_comentarios', getForoComentarios);
router.get('/foro_comentarios/:id', getForoComentarioById);
router.put('/foro_comentarios/:id', updateForoComentario);
router.delete('/foro_comentarios/:id', deleteForoComentario);

export default router;
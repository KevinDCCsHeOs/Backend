// routes/perfiles.routes.js
import express from 'express';
import {
  createPerfil,
  getPerfiles,
  getPerfilById,
  loginPerfil,
  updatePerfil,
  deletePerfil,
} from '../controllers/Perfiles.js';

const router = express.Router();

router.post('/perfiles', createPerfil);
router.get('/perfiles', getPerfiles);
router.get('/perfiles/:id', getPerfilById);
router.post('/perfiles/login', loginPerfil);
router.put('/perfiles/:id', updatePerfil);
router.delete('/perfiles/:id', deletePerfil);

export default router;

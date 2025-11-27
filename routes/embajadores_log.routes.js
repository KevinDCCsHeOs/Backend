import express from 'express';
import {
    createEmbajadorLog,
    getEmbajadoresLog,
    getEmbajadorLogById,
    updateEmbajadorLog,
    deleteEmbajadorLog,
} from '../controllers/Embajadores_log.js';

const router = express.Router();

router.post('/embajadores_log', createEmbajadorLog);
router.get('/embajadores_log', getEmbajadoresLog);
router.get('/embajadores_log/:id', getEmbajadorLogById);
router.put('/embajadores_log/:id', updateEmbajadorLog);
router.delete('/embajadores_log/:id', deleteEmbajadorLog);

export default router;
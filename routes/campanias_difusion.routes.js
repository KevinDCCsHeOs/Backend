import express from 'express';
import {
    createCampania, 
    getCampanias, 
    getCampaniaById, 
    updateCampania, 
    deleteCampania
} from '../controllers/Campanias_difusion.js';
const router = express.Router();

router.post('/campanias_difusion', createCampania);
router.get('/campanias_difusion', getCampanias);
router.get('/campanias_difusion/:id', getCampaniaById);
router.put('/campanias_difusion/:id', updateCampania);
router.delete('/campanias_difusion/:id', deleteCampania);

export default router;
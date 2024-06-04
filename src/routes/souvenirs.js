import express from 'express';
import {
   getAllSouvenirs,
   getSouvenirById,
   createSouvenir,
   updateSouvenir,
   deleteSouvenir,
} from '../controllers/souvenirController.js';

const router = express.Router();

router.get('/', getAllSouvenirs);
router.get('/:id', getSouvenirById);
router.post('/', createSouvenir);
router.put('/:id', updateSouvenir);
router.delete('/:id', deleteSouvenir);

export default router;
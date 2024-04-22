import { Router } from 'express';
import {
  createTour, deleteTourById, getTourById, getTours, updateTourById,
} from '../controllers/tourController.js';

const router = Router();

router.get('/', getTours);
router.post('/', createTour);
router.get('/:id', getTourById);
router.put('/:id', updateTourById);
router.delete('/:id', deleteTourById);

export default router;

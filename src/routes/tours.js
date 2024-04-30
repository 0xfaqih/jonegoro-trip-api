import { Router } from 'express';
import {
  createTour, deleteTourById, getTourById, getTours, updateTourById, addImageToTour, deleteImageFromTour,
} from '../controllers/tourController.js';

const router = Router();

router.get('/', getTours);
router.post('/', createTour);
router.get('/:id', getTourById);
router.put('/:id', updateTourById);
router.delete('/:id', deleteTourById);

router.post('/add-image', addImageToTour);
router.post('/delete-image', deleteImageFromTour);

export default router;

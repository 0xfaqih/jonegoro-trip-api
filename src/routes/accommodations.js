import express from 'express';
import {
   getAllAccommodations,
   getAccommodationById,
   createAccommodation,
   updateAccommodation,
   deleteAccommodation,
} from '../controllers/accommodationController.js';

const router = express.Router();

router.get('/', getAllAccommodations);
router.get('/:id', getAccommodationById);
router.post('/', createAccommodation);
router.put('/:id', updateAccommodation);
router.delete('/:id', deleteAccommodation);

export default router;
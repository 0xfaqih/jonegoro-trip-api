import prisma from '../models/prisma.js';

const getTours = async (req, res) => {
   try {
     const tours = await prisma.tour.findMany();
     res.status(200).json({
       status: 'success',
       message: 'Tours retrieved successfully',
       data: tours,
     });
   } catch (error) {
     console.error('Error fetching tours:', error);
     res.status(500).json({
       status: 'error',
       message: 'Failed to retrieve tours',
       error: error.message,
     });
   }
 };

const createTour = async (req, res) => {
   try {
     const { tour_name, place, rating, desc, pict, price } = req.body;
 
     if (!tour_name || !place || !rating || !Array.isArray(pict)) {
       return res.status(400).json({
         status: 'error',
         message: 'Invalid data provided for creating tour',
       });
     }
 
     const { ticket, motor_park, car_park } = price || {};
     if (ticket === undefined || motor_park === undefined || car_park === undefined) {
       return res.status(400).json({
         status: 'error',
         message: 'Price details are required',
       });
     }
 
     const newTour = await prisma.tour.create({
       data: {
         tour_name,
         place,
         rating,
         desc,
         pict,
         price: {
           create: {
             ticket,
             motor_park,
             car_park,
           },
         },
       },
       include: {
         price: true,
       },
     });
 
     res.status(201).json({
       status: 'success',
       message: 'Tour created successfully',
       data: newTour,
     });
   } catch (error) {
     console.error('Error creating tour:', error);
     res.status(500).json({
       status: 'error',
       message: 'Failed to create tour',
       error: error.message,
     });
   }
 };

const getTourById = async (req, res) => {
   try {
     const { id } = req.params;
 
     const tour = await prisma.tour.findUnique({
       where: {
         id: parseInt(id),
       },
       include: {
         price: true,
       },
     });
 
     if (!tour) {
       return res.status(404).json({
         status: 'error',
         message: 'Tour not found',
       });
     }
 
     res.status(200).json({
       status: 'success',
       message: 'Tour retrieved successfully',
       data: tour,
     });
   } catch (error) {
     console.error('Error fetching tour by ID:', error);
     res.status(500).json({
       status: 'error',
       message: 'Failed to retrieve tour',
       error: error.message,
     });
   }
 };

const updateTourById = async (req, res) => {
   try {
     const { id } = req.params;
     const { tour_name, place, rating, desc, pict, price } = req.body;
 
     const existingTour = await prisma.tour.findUnique({
       where: { id: parseInt(id) },
     });
 
     if (!existingTour) {
       return res.status(404).json({
         status: 'error',
         message: 'Tour not found',
       });
     }
 
     const updatedTour = await prisma.tour.update({
       where: { id: parseInt(id) },
       data: {
         tour_name,
         place,
         rating,
         desc,
         pict,
         price: {
           update: {
             ticket: price.ticket,
             motor_park: price.motor_park,
             car_park: price.car_park,
           },
         },
       },
       include: {
         price: true,
       },
     });
 
     res.status(200).json({
       status: 'success',
       message: 'Tour updated successfully',
       data: updatedTour,
     });
   } catch (error) {
     console.error('Error updating tour by ID:', error);
     res.status(500).json({
       status: 'error',
       message: 'Failed to update tour',
       error: error.message,
     });
   }
 };

const deleteTourById = async (req, res) => {
   try {
     const id = parseInt(req.params.id);
     if (isNaN(id)) {
       return res.status(400).json({
         status: 'error',
         message: 'Invalid ID format',
       });
     }
 
     const existingTour = await prisma.tour.findUnique({
       where: { id },
     });
 
     if (!existingTour) {
       return res.status(404).json({
         status: 'error',
         message: 'Tour not found',
       });
     }
 
     await prisma.tour.delete({
       where: { id },
     });
 
     res.status(200).json({
       status: 'success',
       message: 'Tour deleted successfully',
     });
   } catch (error) {
     console.error('Error deleting tour:', error);
     res.status(500).json({
       status: 'error',
       message: 'Failed to delete tour',
       error: error.message,
     });
   }
 };
 

export {
  getTours, createTour, getTourById, updateTourById, deleteTourById,
};

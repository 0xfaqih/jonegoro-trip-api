import prisma from "../models/prisma.js";

export const getAllAccommodations = async (req, res) => {
   try {
      const Accommodation = await prisma.accommodation.findMany();
   res.status(200).json({ status: 'success', message: 'Accommodation retrieved successfully', data: Accommodation });
   } catch (error) {
      res.status(500).json({ status: 'error', message: 'Failed to retrieve Accommodation', error: error.message });
   }
}

export const getAccommodationById = async (req, res) => {
   try {
      const { id } = req.params;
      const Accommodation = await prisma.accommodation.findUnique({ where: { id: parseInt(id) } });
      if (!Accommodation) return res.status(404).json({ status: 'error', message: 'Accommodation not found' });
      res.status(200).json({ status: 'success', message: 'Accommodation retrieved successfully', data: Accommodation });
   } catch (error) {
      res.status(500).json({ status: 'error', message: 'Failed to retrieve Accommodation', error: error.message });
   }
}

export const createAccommodation = async (req, res) => {
   const { name, image, location, category, price } = req.body;
   try {
      const newAccommodation = await prisma.accommodation.create({
         data: {
            name,
            image,
            location,
            category,
            price 
         }
      });
      res.status(201).json({ status: 'success', message: 'Accommodation created successfully', data: newAccommodation });
   } catch (error) {
      res.status(500).json({ status: 'error', message: 'Failed to create Accommodation', error: error.message });
   }
}

export const updateAccommodation = async (req, res) => {
   const { id } = req.params;
   const { name, image, location, category, price } = req.body;
   try {
      const updatedAccommodation = await prisma.accommodation.update({
         where: { id: parseInt(id) },
         data: {
            name,
            image,
            location,
            category,
            price
         }
      });
      res.status(200).json({ status: 'success', message: 'Accommodation updated successfully', data: updatedAccommodation });
   } catch (error) {
      res.status(500).json({ status: 'error', message: 'Failed to update Accommodation', error: error.message });
   }
}

export const deleteAccommodation = async (req, res) => {
   const { id } = req.params;
   try {
      await prisma.accommodation.delete({ where: { id: parseInt(id) } });
      res.status(200).json({ status: 'success', message: 'Accommodation deleted successfully' });
   } catch (error) {
      res.status(500).json({ status: 'error', message: 'Failed to delete Accommodation', error: error.message });
   }
}
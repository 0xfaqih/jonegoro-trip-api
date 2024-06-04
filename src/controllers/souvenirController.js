import prisma from "../models/prisma.js";

// Get all souvenirs
export const getAllSouvenirs = async (req, res) => {
   try {
      const souvenirs = await prisma.souvenir.findMany();
      res.status(200).json({ status: 'success', message: 'Souvenirs retrieved successfully', data: souvenirs });
   } catch (error) {
      res.status(500).json({ status: 'error', message: 'Failed to retrieve souvenirs', error: error.message });
   }
}

export const getSouvenirById = async (req, res) => {
   try {
      const { id } = req.params;
      const souvenir = await prisma.souvenir.findUnique({ where: { id: parseInt(id) } });
      if (!souvenir) return res.status(404).json({ status: 'error', message: 'Souvenir not found' });
      res.status(200).json({ status: 'success', message: 'Souvenir retrieved successfully', data: souvenir });
   } catch (error) {
      res.status(500).json({ status: 'error', message: 'Failed to retrieve souvenir', error: error.message });
   }
}

export const createSouvenir = async (req, res) => {
   const { name, image, price } = req.body;
   try {
      const newSouvenir = await prisma.souvenir.create({
         data: {
            name,
            image,
            price
         }
      });
      res.status(201).json({ status: 'success', message: 'Souvenir created successfully', data: newSouvenir });
   } catch (error) {
      res.status(500).json({ status: 'error', message: 'Failed to create souvenir', error: error.message });
   }
};

export const updateSouvenir = async (req, res) => {
   const { id } = req.params;
   const { name, image, price } = req.body;
   try {
      const updatedSouvenir = await prisma.souvenir.update({
         where: { id: parseInt(id) },
         data: {
            name,
            image,
            price
         }
      });
      res.status(200).json({ status: 'success', message: 'Souvenir updated successfully', data: updatedSouvenir });
   } catch (error) {
      res.status(500).json({ status: 'error', message: 'Failed to update souvenir', error: error.message });
   }
};

export const deleteSouvenir = async (req, res) => {
   const { id } = req.params;
   try {
      const deletedSouvenir = await prisma.souvenir.delete({ where: { id: parseInt(id) } });
      res.status(200).json({ status: 'success', message: 'Souvenir deleted successfully', data: deletedSouvenir });
   } catch (error) {
      res.status(500).json({ status: 'error', message: 'Failed to delete souvenir', error: error.message });
   }
};
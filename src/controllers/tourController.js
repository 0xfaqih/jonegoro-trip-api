import prisma from '../models/prisma.js';

const getTours = async (req, res) => {
  try {
    const tours = await prisma.tour.findMany({
      include: {
        images: true,
      },
    });
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

const addImageToTour = async (req, res) => {
  try {
    const { id, url } = req.body;

    if (!id || !url) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid data provided for adding image to tour',
      });
    }

    const tour = await prisma.tour.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!tour) {
      return res.status(404).json({
        status: 'error',
        message: 'Tour not found',
      });
    }

    const newImage = await prisma.image.create({
      data: {
        url,
        tour_id: tour.id,
      },
    });

    res.status(201).json({
      status: 'success',
      message: 'Image added to tour successfully',
      data: newImage,
    });
  } catch (error) {
    console.error('Error adding image to tour:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to add image to tour',
      error: error.message,
    });
  }
};

const deleteImageFromTour = async (req, res) => {
  try {
    const { imageId } = req.params;

    const existingImage = await prisma.image.findUnique({
      where: { id: parseInt(imageId) },
    });

    if (!existingImage) {
      return res.status(404).json({
        status: 'error',
        message: 'Image not found',
      });
    }

    if (existingImage.tour_id !== parseInt(req.params.tourId)) {
      return res.status(400).json({
        status: 'error',
        message: 'Image does not belong to the specified tour',
      });
    }

    await prisma.image.delete({
      where: { id: parseInt(imageId) },
    });

    res.status(200).json({
      status: 'success',
      message: 'Image deleted from tour successfully',
    });
  } catch (error) {
    console.error('Error deleting image from tour:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete image from tour',
      error: error.message,
    });
  }
};

const createTour = async (req, res) => {
  try {
    const {
      tour_name, place, rating, category, desc, images, price,
    } = req.body;

    if (!tour_name || !place || !rating || !Array.isArray(images) || !price || !category) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid data provided for creating tour',
      });
    }

    const newTour = await prisma.tour.create({
      data: {
        tour_name,
        place,
        rating,
        category,
        desc,
      },
    });

    await prisma.price.create({
      data: {
        ticket: price.ticket,
        motor_park: price.motor_park,
        car_park: price.car_park,
        tour_id: newTour.id,
      },
    });

    const imagesData = images.map((url) => ({
      url,
      tour_id: newTour.id,
    }));

    await prisma.image.createMany({
      data: imagesData,
    });

    res.status(201).json({
      status: 'success',
      message: 'Tour created successfully',
      data: {
        newTour,
        images: imagesData,
        price: {
          ticket: price.ticket,
          motor_park: price.motor_park,
          car_park: price.car_park,
        },
      },
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
        images: true,
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
    const {
      tour_name, place, rating, category, desc, images, price,
    } = req.body;

    // Validate input
    if (!tour_name ||!place ||!rating ||!Array.isArray(images) ||!price || !category) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid data provided for updating tour',
      });
    }

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
        category,
        desc,
      },
    });

    await prisma.price.update({
      where: { tour_id: parseInt(id) },
      data: {
        ticket: price.ticket,
        motor_park: price.motor_park,
        car_park: price.car_park,
      },
    });

    await prisma.image.deleteMany({
      where: { tour_id: parseInt(id) },
    });
    const imagesData = images.map((url) => ({
      url,
      tour_id: parseInt(id),
    }));
    await prisma.image.createMany({
      data: imagesData,
    });

    res.status(200).json({
      status: 'success',
      message: 'Tour updated successfully',
      data: {
        updatedTour,
        images: imagesData,
        price: {
          ticket: price.ticket,
          motor_park: price.motor_park,
          car_park: price.car_park,
        },
      },
    });
  } catch (error) {
    console.error('Error updating tour:', error);
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
  getTours, createTour, getTourById, updateTourById, deleteTourById, addImageToTour, deleteImageFromTour,
};

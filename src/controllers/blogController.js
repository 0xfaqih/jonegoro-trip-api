import prisma from '../models/prisma.js';

// GET all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        banner: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json({ status: 'success', message: 'Blogs retrieved successfully', data: blogs });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to retrieve blogs', error: error.message });
  }
};

// GET blog by ID
export const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: parseInt(id) },
    });
    if (!blog) return res.status(404).json({ status: 'error', message: 'Blog not found' });
    res.status(200).json({ status: 'success', message: 'Blog retrieved successfully', data: blog });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to retrieve blog', error: error.message });
  }
};

// POST create new blog
export const createBlog = async (req, res) => {
  const { title, banner, content } = req.body;
  try {
    const newBlog = await prisma.blog.create({
      data: {
        title,
        banner,
        content,
      },
    });
    res.status(201).json({ status: 'success', message: 'Blog created successfully', data: newBlog });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to create blog', error: error.message });
  }
};

// PUT update blog
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, banner, content } = req.body;
  try {
    const updatedBlog = await prisma.blog.update({
      where: { id: parseInt(id) },
      data: {
        title,
        banner,
        content,
      },
    });
    res.status(200).json({ status: 'success', message: 'Blog updated successfully', data: updatedBlog });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to update blog', error: error.message });
  }
};

// DELETE blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.blog.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ status: 'success', message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to delete blog', error: error.message });
  }
};

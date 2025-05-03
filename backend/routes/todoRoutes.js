import express from 'express';
import TodoList from '../models/TodoList.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Middleware to protect all routes below
router.use(protect);

// Get all todo lists for the authenticated user
router.get('/', async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const lists = await TodoList.find({ user: req.user._id });
      res.status(200).json(lists);
    } catch (error) {
      console.error('Error fetching todo lists:', error);
      res.status(500).json({ message: 'Internal server error while fetching todo lists' });
    }
  });

router.post('/', async (req, res) => {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    try {
      const list = await TodoList.create({ title, user: req.user._id });
      res.status(201).json(list);
    } catch (error) {
      console.error('Error creating todo list:', error);
      res.status(500).json({ message: 'Internal server error while creating todo list' });
    }
  });
// Update a todo list title
router.put('/:id', async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required for update' });
  }
  try {
    const list = await TodoList.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ message: 'Todo list not found' });
    }
    if (list.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this todo list' });
    }
    list.title = title;
    await list.save();
    res.status(200).json(list);
  } catch (error) {
    console.error('Error updating todo list:', error);
    res.status(500).json({ message: 'Internal server error while updating todo list' });
  }
});

// Delete a todo list
router.delete('/:id', async (req, res) => {
  try {
    const list = await TodoList.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ message: 'Todo list not found' });
    }
    if (list.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this todo list' });
    }
    await list.remove();
    res.status(200).json({ message: 'Todo list deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo list:', error);
    res.status(500).json({ message: 'Internal server error while deleting todo list' });
  }
});

// Add an item to a todo list
router.post('/:id/items', async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Item title is required' });
  }
  try {
    const list = await TodoList.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ message: 'Todo list not found' });
    }
    if (list.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to add items to this todo list' });
    }
    list.items.push({ title, completed: false });
    await list.save();
    res.status(201).json(list);
  } catch (error) {
    console.error('Error adding item to todo list:', error);
    res.status(500).json({ message: 'Internal server error while adding item' });
  }
});

// Update a todo list item
router.put('/:listId/items/:itemId', async (req, res) => {
  const { title, completed } = req.body;
  try {
    const list = await TodoList.findById(req.params.listId);
    if (!list) {
      return res.status(404).json({ message: 'Todo list not found' });
    }
    if (list.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update items in this todo list' });
    }
    const item = list.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Todo item not found' });
    }
    if (title !== undefined) item.title = title;
    if (completed !== undefined) item.completed = completed;
    await list.save();
    res.status(200).json(list);
  } catch (error) {
    console.error('Error updating todo item:', error);
    res.status(500).json({ message: 'Internal server error while updating item' });
  }
});

// Delete a todo list item
router.delete('/:listId/items/:itemId', async (req, res) => {
  try {
    const list = await TodoList.findById(req.params.listId);
    if (!list) {
      return res.status(404).json({ message: 'Todo list not found' });
    }
    if (list.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete items in this todo list' });
    }
    const item = list.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Todo item not found' });
    }
    item.remove();
    await list.save();
    res.status(200).json(list);
  } catch (error) {
    console.error('Error deleting todo item:', error);
    res.status(500).json({ message: 'Internal server error while deleting item' });
  }
});

export default router;

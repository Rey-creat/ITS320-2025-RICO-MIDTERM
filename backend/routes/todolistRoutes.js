import express from 'express';
import todolistController from '../controller/todolistController.js';

export const router = express.Router();

// Existing routes
router.post('/create', todolistController.createTodolist);
router.get('/', todolistController.getTodolist);
router.delete('/:id', todolistController.deleteTodolist);

// New route for updating a task
router.put('/:id', todolistController.updateTodolist); // Update task by ID

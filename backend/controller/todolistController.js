import Todolist from '../models/todolistModel.js';

// Create a new task
async function createTodolist(req, res) {
  const { todolist, title } = req.body;

  if (!todolist || !title) {
    return res.status(400).send('Please fill out all fields.');
  }

  try {
    const newTask = await Todolist.create({ todolist, title });
    return res.status(200).json({ todolist: newTask.todolist, _id: newTask._id });
  } catch (error) {
    return res.status(500).send('Error while creating task: ' + error.message);
  }
}

// Get all tasks from the database
async function getTodolist(req, res) {
  try {
    const tasks = await Todolist.find();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).send('Error while fetching tasks: ' + error.message);
  }
}

// Delete a task
async function deleteTodolist(req, res) {
  const { id } = req.params; // Get the ID from the request parameters
  try {
    const deletedTask = await Todolist.findByIdAndDelete(id); // Delete the task by ID
    if (!deletedTask) {
      return res.status(404).send('Task not found'); // Handle case where task is not found
    }
    return res.status(200).send('Task deleted successfully'); // Send success response
  } catch (error) {
    return res.status(500).send('Error while deleting task: ' + error.message);
  }
}

// Update a task
async function updateTodolist(req, res) {
  const { id } = req.params; // Get the task ID from request parameters
  const { todolist, title } = req.body; // Get the updated task data from request body

  if (!todolist || !title) {
    return res.status(400).send('Please fill out all fields.');
  }

  try {
    const updatedTask = await Todolist.findByIdAndUpdate(
      id,
      { todolist, title },
      { new: true } // Return the updated task
    );

    if (!updatedTask) {
      return res.status(404).send('Task not found');
    }

    return res.status(200).json(updatedTask); // Send the updated task as response
  } catch (error) {
    return res.status(500).send('Error while updating task: ' + error.message);
  }
}

const todolistController = { createTodolist, getTodolist, deleteTodolist, updateTodolist };
export default todolistController;

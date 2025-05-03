import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'todolist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent {
  taskControl = new FormControl('');
  tasks: { todolist: string; _id: string }[] = []; // Ensure the correct type
  editingTask: { todolist: string; _id: string } | null = null; // Track the task being edited

  constructor(private http: HttpClient) {
    this.getTasks(); // Fetch tasks on component initialization
  }

  addTask() {
    const task = this.taskControl.value?.trim();
    if (task) {
      this.http.post<any>('http://localhost:3000/api/todolist/create', {
        todolist: task,
        title: task
      }).subscribe({
        next: (res) => {
          this.tasks.push(res); // Push the new task to the tasks array
          this.taskControl.reset(); // Reset the input field
        },
        error: (err) => {
          console.error('Error adding task:', err);
        }
      });
    }
  }

  getTasks() {
    this.http.get<any[]>('http://localhost:3000/api/todolist').subscribe({
      next: (res) => {
        console.log('Tasks fetched:', res); // Log the response
        this.tasks = res; // Set the tasks array to the fetched tasks
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      }
    });
  }

  removeTask(index: number) {
    const taskToDelete = this.tasks[index]; // Get the task to delete
    this.tasks.splice(index, 1); // Remove the task from the UI immediately

    this.http.delete(`http://localhost:3000/api/todolist/${taskToDelete._id}`).subscribe({
      next: () => {
        // Task deleted successfully from the backend
        console.log('Task deleted successfully');
      },
      error: (err) => {
        // If there's an error, log it but do not restore the task
        console.error('Error removing task:', err);
      }
    });
  }

  editTask(task: { todolist: string; _id: string }) {
    this.editingTask = { ...task }; // Copy the task to the editing task object
    this.taskControl.setValue(task.todolist); // Pre-fill the input field with the task value
  }

  updateTask() {
    if (this.editingTask) {
      const updatedTask = this.taskControl.value?.trim();
      if (updatedTask) {
        this.http.put<any>(`http://localhost:3000/api/todolist/${this.editingTask._id}`, {
          todolist: updatedTask,
          title: updatedTask
        }).subscribe({
          next: (res) => {
            // Update the task in the tasks array
            const index = this.tasks.findIndex(task => task._id === this.editingTask?._id);
            if (index !== -1) {
              this.tasks[index].todolist = updatedTask;
            }
            this.editingTask = null; // Reset editing task
            this.taskControl.reset(); // Reset the input field
          },
          error: (err) => {
            console.error('Error updating task:', err);
          }
        });
      }
    }
  }
}

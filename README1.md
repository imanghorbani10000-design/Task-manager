# Task Manager Project

This project is developed for the Special Topics course activities (API Contract & Dockerization).

##  API Endpoints
- Users:
  - POST /api/users/register - Register a new user
  - POST /api/users/login - User login
  - GET /api/users/profile - Get current user profile
- Tasks:
  - GET /api/tasks - Get all tasks
  - POST /api/tasks - Create a new task
  - GET /api/tasks/:id - Get task by ID
  - PUT /api/tasks/:id - Update task details
  - DELETE /api/tasks/:id - Delete a task

---

## Running with Docker

To build and run the backend container locally, execute the following commands in the root directory:

1. Build the Docker Image:
   `bash
   docker build -t task-manager-backend .

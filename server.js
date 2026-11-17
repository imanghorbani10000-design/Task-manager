const express = require('express');
const app = express();
const PORT = process.env.PORT  3000;

app.use(express.json());


let users = [];
let tasks = [];
let taskIdCounter = 1;

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Task Manager API is running successfully!' });
});

// --- 1. Users Endpoints ---


app.post('/api/users/register', (req, res) => {
    const { username, password } = req.body;
    if (!username  !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
});
ر
app.post('/api/users/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
    res.status(200).json({ message: 'Login successful', token: 'sample-jwt-token-xyz' });
});


app.get('/api/users/profile', (req, res) => {
    if (users.length === 0) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    res.status(200).json({ username: users[0].username });
});


// --- 2. Tasks Endpoints ---

app.get('/api/tasks', (req, res) => {
    res.status(200).json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Task title is required' });
    }
    const newTask = {
        id: taskIdCounter++,
        title,
        description: description || '',
        completed: false,
        createdAt: new Date()
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.get('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
});

app.put('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    const { title, description, completed } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    res.status(200).json(task);
});


app.delete('/api/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    const deletedTask = tasks.splice(taskIndex, 1);
    res.status(200).json({ message: 'Task deleted successfully', deletedTask });
});

app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});

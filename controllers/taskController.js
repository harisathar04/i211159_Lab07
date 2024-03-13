const tasks = require('../models/Task');

exports.createTask = (req, res) => {
    const { title, description, dueDate, category, priority } = req.body;
    const newTask = { id: tasks.length + 1, title, description, dueDate, category, priority, completed: false };
    tasks.push(newTask);
    res.status(201).json({ message: 'Task created successfully', task: newTask });
};

exports.getAllTasks = (req, res) => {
    const { sortBy, orderBy } = req.query;
    let sortedTasks = [...tasks];

    if (sortBy && orderBy) {
        sortedTasks.sort((a, b) => {
            if (orderBy === 'asc') {
                return a[sortBy] > b[sortBy] ? 1 : -1;
            } else {
                return a[sortBy] < b[sortBy] ? 1 : -1;
            }
        });
    }

    res.status(200).json(sortedTasks);
};

exports.getTaskById = (req, res) => {
    const taskId = req.params.id;
    const task = tasks.find(task => task.id === parseInt(taskId));
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
};

exports.updateTask = (req, res) => {
    const taskId = req.params.id;
    const { title, description, dueDate, category, priority, completed } = req.body;
    const index = tasks.findIndex(task => task.id === parseInt(taskId));
    if (index === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    tasks[index] = { ...tasks[index], title, description, dueDate, category, priority, completed };
    res.status(200).json({ message: 'Task updated successfully', task: tasks[index] });
};

exports.deleteTask = (req, res) => {
    const taskId = req.params.id;
    const index = tasks.findIndex(task => task.id === parseInt(taskId));
    if (index === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    tasks.splice(index, 1);
    res.status(200).json({ message: 'Task deleted successfully' });
};
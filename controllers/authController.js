const users = require('../models/User');

exports.register = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already taken' });
    }
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);
    const token = generateToken(newUser.id);
    res.status(201).json({ message: 'User registered successfully', token });
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user.id);
    res.status(200).json({ message: 'Login successful', token });
};

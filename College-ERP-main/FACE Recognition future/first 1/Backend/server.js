const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/erp', { useNewUrlParser: true, useUnifiedTopology: true });

// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Registration Endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered');
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Middleware to verify token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Protect the student dashboard route
app.get('/dashboard', authenticateToken, (req, res) => {
    res.send('Welcome to the student dashboard');
});

// Serve static files
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

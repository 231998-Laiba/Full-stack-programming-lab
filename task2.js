const express = require('express');
const app = express();

// Home Route
app.get('/home', (req, res) => {
    res.send(`
        <h1 style="color:green; font-family:Arial;">🏠 Welcome Home</h1>
        <p>This is the home page of our Express application.</p>
    `);
});

// About Route
app.get('/about', (req, res) => {
    res.send(`
        <h1 style="color:blue; font-family:Arial;">ℹ️ About Us</h1>
        <p>We are learning Full Stack Programming with Node.js and Express.</p>
    `);
});

// Contact Route
app.get('/contact', (req, res) => {
    res.send(`
        <h1 style="color:purple; font-family:Arial;">📞 Contact Us</h1>
        <p>Email: contact@fullstack-lab.com</p>
        <p>Phone: +92-300-1234567</p>
    `);
});

// Default route
app.get('/', (req, res) => {
    res.send(`
        <h1>🚀 Message Routes System</h1>
        <p>Available routes:</p>
        <ul>
            <li><a href="/home">/home</a></li>
            <li><a href="/about">/about</a></li>
            <li><a href="/contact">/contact</a></li>
        </ul>
    `);
});

app.listen(3002, () => {
    console.log("Task 2 running on http://localhost:3002");
});
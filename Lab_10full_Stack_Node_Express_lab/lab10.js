const express = require('express');
const app = express();

// =============================
// Task 1: Student List Display
// =============================
const students = ["Laiba", "Ahmed", "Sara", "Ayesha", "Ali"];

app.get('/students', (req, res) => {
    let list = students.map(s => `<li>${s}</li>`).join('');
    res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Student List</title></head>
        <body>
            <h1>Student List</h1>
            <ul>${list}</ul>
        </body>
        </html>
    `);
});

// =============================
// Task 2: Simple Message Routes
// =============================
app.get('/home', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Home</title></head>
        <body>
            <h1>Home Page</h1>
            <p>Welcome Home</p>
        </body>
        </html>
    `);
});

app.get('/about', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>About</title></head>
        <body>
            <h1>About Page</h1>
            <p>This is the About Page</p>
        </body>
        </html>
    `);
});

app.get('/contact', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Contact</title></head>
        <body>
            <h1>Contact Page</h1>
            <p>Email: contact@example.com</p>
        </body>
        </html>
    `);
});

// =============================
// Task 3: Dynamic User Page
// =============================
app.get('/user/:name', (req, res) => {
    const name = req.params.name;
    res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>User Page</title></head>
        <body>
            <h1>Hello ${name}</h1>
            <p>Welcome to your page!</p>
        </body>
        </html>
    `);
});

// =============================
// Task 4: Full HTML Page
// =============================
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Lab 10 - Laiba</title></head>
        <body>
            <h1>Welcome to Laiba's Express Server</h1>
            <p>This is Lab 10 - Node.js + Express.js</p>
            <h3>Available Routes:</h3>
            <ul>
                <li><a href="/students">/students</a> - Student List</li>
                <li><a href="/home">/home</a> - Home Page</li>
                <li><a href="/about">/about</a> - About Page</li>
                <li><a href="/contact">/contact</a> - Contact Page</li>
                <li><a href="/user/Laiba">/user/Laiba</a> - Dynamic User Page</li>
            </ul>
        </body>
        </html>
    `);
});

// =============================
// START SERVER
// =============================
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
    console.log('Routes:');
    console.log('  http://localhost:3000/');
    console.log('  http://localhost:3000/students');
    console.log('  http://localhost:3000/home');
    console.log('  http://localhost:3000/about');
    console.log('  http://localhost:3000/contact');
    console.log('  http://localhost:3000/user/Laiba');
});
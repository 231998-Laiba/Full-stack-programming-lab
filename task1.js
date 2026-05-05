const express = require('express');
const app = express();

// PORT
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
// -----------------------------
// Task 1: Student List (GET)
// -----------------------------
const students = ["Nida", "Ahmed", "Sara", "Ayesha"];

app.get('/students', (req, res) => {
    let list = students.map(s => `<li>${s}</li>`).join('');
    res.send(`
        <h1>Student List</h1>
        <ul>${list}</ul>
    `);
});

// -----------------------------
// Task 2: Simple Routes
// -----------------------------
app.get('/home', (req, res) => {
    res.send("<h1>Home Page</h1><p>Welcome Home</p>");
});

app.get('/about', (req, res) => {
    res.send("<h1>About Page</h1><p>This is About Page</p>");
});

app.get('/contact', (req, res) => {
    res.send("<h1>Contact Page</h1><p>Contact us here</p>");
});

// -----------------------------
// Task 3: Dynamic User Route
// -----------------------------
app.get('/user/:name', (req, res) => {
    const name = req.params.name;
    res.send(`<h1>Hello ${name}</h1>`);
});

// -----------------------------
// Task 4: Full HTML Page
// -----------------------------
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>My Express App</title>
        </head>
        <body>
            <h1>Welcome to My Server</h1>
            <p>This is a full HTML response from Express.</p>

            <h3>Available Routes:</h3>
            <ul>
                <li>/students</li>
                <li>/home</li>
                <li>/about</li>
                <li>/contact</li>
                <li>/user/Nida</li>
            </ul>
        </body>
        </html>
    `);
});

// -----------------------------
// SERVER START
// -----------------------------
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
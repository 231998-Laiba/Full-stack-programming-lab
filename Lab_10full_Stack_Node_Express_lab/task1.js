const express = require('express');
const app = express();

// Student data stored in array
const students = [
    "Ali",
    "Ahmed",
    "Sara",
    "Fatima",
    "Hassan",
    "Ayesha"
];

// GET route to display student list
app.get('/students', (req, res) => {
    // Build HTML list items
    let listItems = '';
    for (let i = 0; i < students.length; i++) {
        listItems += `<li>${students[i]}</li>`;
    }

    // Send full HTML response
    res.send(`
        <html>
            <head>
                <title>Student List</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    h1 { color: #333; }
                    ul { font-size: 18px; }
                    li { margin: 10px 0; }
                </style>
            </head>
            <body>
                <h1>Student List</h1>
                <ul>
                    ${listItems}
                </ul>
            </body>
        </html>
    `);
});

// Start server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/students');
});
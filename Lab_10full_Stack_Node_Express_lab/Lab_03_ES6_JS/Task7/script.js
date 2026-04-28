// ============================
//  Create 3 Student Objects
// ============================

const students = [
    {
        name: "Ali",
        age: 20,
        semester: 3,
        courses: ["Web Dev", "OOP", "DBMS"]
    },
    {
        name: "Sara",
        age: 21,
        semester: 4,
        courses: ["AI", "Data Structures", "Operating Systems"]
    },
    {
        name: "Ahmed",
        age: 19,
        semester: 2,
        courses: ["Math", "Programming", "Physics"]
    }
];

// =================================
//  Convert Objects to JSON
// =================================

const jsonData = JSON.stringify(students);
console.log("JSON Data:", jsonData);

// =================================
//  Convert JSON Back to Objects
// =================================

const parsedStudents = JSON.parse(jsonData);
console.log("Parsed Objects:", parsedStudents);

// =================================
// Destructuring +  Loop
// =================================

const output = document.getElementById("output");

// Using forEach loop
parsedStudents.forEach(student => {

    // Destructuring
    const { name, age, semester, courses } = student;

    output.innerHTML += `
        <div class="student-card">
            <strong>Name:</strong> ${name} <br>
            <strong>Age:</strong> ${age} <br>
            <strong>Semester:</strong> ${semester} <br>
            <strong>Courses:</strong> ${courses.join(", ")}
        </div>
    `;
});
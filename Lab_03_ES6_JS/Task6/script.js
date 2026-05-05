// ========== CLASS ==========
class Student {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.courses = new Set(); 
    }

    addCourse(courseName) {
        this.courses.add(courseName);
    }
}

// ========== MAP ==========
const students = new Map();

// Add Student
const addStudent = () => {
    const id = parseInt(document.getElementById("studentId").value);
    const name = document.getElementById("studentName").value.trim();

    if (!id || !name) {
        alert("Please enter valid student details!");
        return;
    }

    if (students.has(id)) {
        alert("Student ID already exists!");
        return;
    }

    const newStudent = new Student(id, name);

    // ========== PROMISE (Simulate Saving Data) ==========
    saveData(newStudent)
        .then(() => {
            students.set(id, newStudent);
            alert("Student added successfully!");
            displayStudents();
        })
        .catch(error => alert(error));
};

// Register Course
const registerCourse = () => {
    const id = parseInt(document.getElementById("courseStudentId").value);
    const courseName = document.getElementById("courseName").value.trim();

    if (!students.has(id)) {
        alert("Student not found!");
        return;
    }

    const student = students.get(id);
    student.addCourse(courseName);
    alert("Course registered successfully!");
    displayStudents();
};

// Simulated Promise
const saveData = (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data saved successfully!");
        }, 1000); // 1 second delay
    });
};

// Display Students
const displayStudents = () => {
    const output = document.getElementById("output");
    output.innerHTML = "";

    for (let [id, student] of students) {
        output.innerHTML += `
            <div class="student-card">
                <strong>ID:</strong> ${student.id} <br>
                <strong>Name:</strong> ${student.name} <br>
                <strong>Courses:</strong> ${[...student.courses].join(", ") || "None"}
            </div>
        `;
    }
};
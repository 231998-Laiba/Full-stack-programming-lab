// ES6 Student Class
class Student {
    constructor(id, name, semester, courses) {
        this.id = id;
        this.name = name;
        this.semester = semester;
        this.courses = courses;
    }

    getDetails() {
        return `
            <div class="student-card">
                <h3>${this.name}</h3>
                <p><strong>ID:</strong> ${this.id}</p>
                <p><strong>Semester:</strong> ${this.semester}</p>
                <p><strong>Courses:</strong> ${this.courses.join(", ")}</p>
            </div>
        `;
    }
}

// Create student objects using const
const student1 = new Student(101, "Laiba Hameed", 3, ["Web Dev", "OOP", "DBMS"]);
const student2 = new Student(102, "Sara Ahmed", 2, ["Math", "Programming", "Statistics"]);
const student3 = new Student(103, "Usman Tariq", 4, ["AI", "ML", "Data Science"]);

// Store students in array using let
let students = [student1, student2, student3];

// Display students dynamically
const container = document.getElementById("studentsContainer");

let output = "";

students.forEach(student => {
    output += student.getDetails();
});

container.innerHTML = output;
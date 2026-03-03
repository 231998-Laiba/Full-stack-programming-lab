// External JS: Unique Course Registration System

// Create a Set to store unique courses
const courses = new Set();

// Arrow function to add course
const addCourse = () => {
    const input = document.getElementById('courseInput');
    const courseName = input.value.trim();

    if (!courseName) {
        alert("Please enter a course name!");
        return;
    }

    // Attempt to add course to Set
    if (courses.has(courseName)) {
        alert(`Course "${courseName}" is already registered!`);
    } else {
        courses.add(courseName);
        alert(`Course "${courseName}" added successfully!`);
    }

    input.value = ""; // Clear input
    displayCourses();
}

// Function to display all courses using template literals + for...of
const displayCourses = () => {
    const allCourses = document.getElementById('allCourses');
    const totalCourses = document.getElementById('totalCourses');

    // Using for...of to loop through Set
    let courseList = "";
    for (let course of courses) {
        courseList += `${course}, `;
    }

    // Remove trailing comma and space
    courseList = courseList.slice(0, -2);

    allCourses.innerHTML = `Courses: ${courseList}`;
    totalCourses.innerHTML = `Total Unique Courses: ${courses.size}`;
}

// Example of Spread operator with Set
const extraCourses = ["Math", "Physics"];
const allCoursesArray = [...courses, ...extraCourses];
console.log("All courses including extra:", allCoursesArray);
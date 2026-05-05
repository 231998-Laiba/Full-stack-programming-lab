import './App.css';
import CourseItem from './components/CourseItem';

const courses = [
  {
    id: 1,
    courseName: 'React JS',
    instructor: 'Mr. Sharif Hussain',
    duration: '6 Weeks',
    courseType: 'Online',
    color: '#d0f0c0'
  },
  {
    id: 2,
    courseName: 'Node JS',
    instructor: 'Mr. Ali Hassan',
    duration: '8 Weeks',
    courseType: 'Offline',
    color: '#cce5ff'
  },
  {
    id: 3,
    courseName: 'MongoDB',
    instructor: 'Mr. Usman Khan',
    duration: '4 Weeks',
    courseType: 'Online',
    color: '#ffe5cc'
  },
  {
    id: 4,
    courseName: 'Express JS',
    instructor: 'Ms. Sara Malik',
    duration: '5 Weeks',
    courseType: 'Offline',
    color: '#f5ccff'
  },
  {
    id: 5,
    courseName: 'Full Stack Development',
    instructor: 'Mr. Ahmed Raza',
    duration: '12 Weeks',
    courseType: 'Online',
    color: '#fff0cc'
  }
];

function App() {
  return (
    <div className="app-container">
      <h1>📋 Course List</h1>

      {courses.map((course) => (
        <CourseItem
          key={course.id}
          courseName={course.courseName}
          instructor={course.instructor}
          duration={course.duration}
          courseType={course.courseType}
          color={course.color}
        />
      ))}

    </div>
  );
}

export default App;
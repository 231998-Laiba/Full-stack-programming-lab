import './CourseItem.css';

function CourseItem(props) {
  return (
    <div
      className="course-item"
      style={{ backgroundColor: props.color }}
    >
      <h2> {props.courseName}</h2>
      <p><strong>Instructor:</strong> {props.instructor}</p>
      <p><strong>Duration:</strong> {props.duration}</p>

      {/* Bonus: course type badge */}
      <span className={`badge ${props.courseType === 'Online' ? 'online' : 'offline'}`}>
        {props.courseType}
      </span>
    </div>
  );
}

export default CourseItem;
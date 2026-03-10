import './StudentCard.css';

function StudentCard(props) {
  return (
    <div
      className="student-card"
      style={{ backgroundColor: props.color }}
    >
      <h2>{props.name}</h2>
      <p><strong>Roll No:</strong> {props.rollNo}</p>
      <p><strong>Department:</strong> {props.department}</p>
      <p><strong>University:</strong> {props.university}</p>
    </div>
  );
}

export default StudentCard;
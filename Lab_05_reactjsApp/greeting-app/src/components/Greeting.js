import './Greeting.css';

function Greeting(props) {

  let message = '';
  let badgeClass = '';

  if (props.timeOfDay === 'Morning') {
    message = 'Good Morning! Have a productive day!';
    badgeClass = 'morning';
  } else if (props.timeOfDay === 'Afternoon') {
    message = 'Good Afternoon! Keep up the great work!';
    badgeClass = 'afternoon';
  } else if (props.timeOfDay === 'Evening') {
    message = 'Good Evening! Time to relax!';
    badgeClass = 'evening';
  } else if (props.timeOfDay === 'Night') {
    message = 'Good Night! Sleep well!';
    badgeClass = 'night';
  }

  return (
    <div
      className="greeting-card"
      style={{ backgroundColor: props.bgColor }}
    >
      <h2>Hello, {props.name}!</h2>
      <p>{message}</p>
      <span className={`time-badge ${badgeClass}`}>
        {props.timeOfDay}
      </span>
    </div>
  );
}

export default Greeting;
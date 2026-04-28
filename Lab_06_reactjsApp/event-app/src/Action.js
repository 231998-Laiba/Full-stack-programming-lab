import React, { useState } from 'react';
import './Action.css';

function Actions() {
  const [message, setMessage] = useState('');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const colors = ['#ffe0f0', '#e0f7ff', '#e8ffe0', '#fff3e0', '#f3e0ff'];
  const [colorIndex, setColorIndex] = useState(0);

  const handleShowMessage = () => {
    setMessage(' Hello! You clicked the Show Message button!');
  };

  const handleChangeBackground = () => {
    const nextIndex = (colorIndex + 1) % colors.length;
    setColorIndex(nextIndex);
    setBgColor(colors[nextIndex]);
  };

  const handleShowAlert = () => {
    alert(' This is an Alert from the Actions Component!');
  };

  return (
    <div className="actions-wrapper" style={{ backgroundColor: bgColor }}>
      <div className="actions-card">
        <h1 className="actions-title">⚡ Interactive Buttons App</h1>
        <p className="actions-subtitle">Click buttons or hover over them to see events in action!</p>

        <div className="button-group">

          {/* Button 1 - Show Message */}
          <button
            className="btn btn-message"
            onClick={handleShowMessage}
            onMouseOver={() => setHoveredBtn('message')}
            onMouseOut={() => setHoveredBtn(null)}
            style={{ color: hoveredBtn === 'message' ? '#f5576c' : '#fff' }}
          >
             Show Message
          </button>

          {/* Button 2 - Change Background */}
          <button
            className="btn btn-bg"
            onClick={handleChangeBackground}
            onMouseOver={() => setHoveredBtn('bg')}
            onMouseOut={() => setHoveredBtn(null)}
            style={{ color: hoveredBtn === 'bg' ? '#00b4d8' : '#fff' }}
          >
             Change Background
          </button>

          {/* Button 3 - Show Alert */}
          <button
            className="btn btn-alert"
            onClick={handleShowAlert}
            onMouseOver={() => setHoveredBtn('alert')}
            onMouseOut={() => setHoveredBtn(null)}
            style={{ color: hoveredBtn === 'alert' ? '#f9a825' : '#fff' }}
          >
             Show Alert
          </button>

        </div>

        {/* Message Display */}
        {message && (
          <div className="message-box">
            <p>{message}</p>
          </div>
        )}

        {/* Event Log */}
        <div className="event-info">
          <h3> Events Used</h3>
          <ul>
            <li><span>onClick</span> — triggers on button click</li>
            <li><span>onMouseOver</span> — triggers when mouse enters button</li>
            <li><span>onMouseOut</span> — triggers when mouse leaves button</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Actions;
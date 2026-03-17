import React, { useState } from 'react';
import './counter.css';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => { if (count > 0) setCount(count - 1); };
  const reset = () => setCount(0);

  return (
    <div className="counter-wrapper">
      <div className="counter-card">
        <h1 className="counter-title">Counter App</h1>
        <div className={`counter-display ${count === 0 ? 'zero' : 'active'}`}>
          {count}
        </div>
        <p className="counter-label">Current Count</p>
        <div className="button-group">
          <button className="btn btn-decrement" onClick={decrement} disabled={count === 0}>
            − Decrement
          </button>
          <button className="btn btn-reset" onClick={reset}>
            ↺ Reset
          </button>
          <button className="btn btn-increment" onClick={increment}>
            + Increment
          </button>
        </div>
        {count === 0 && (
          <p className="warning-text"> Count cannot go below 0</p>
        )}
      </div>
    </div>
  );
}

export default Counter;
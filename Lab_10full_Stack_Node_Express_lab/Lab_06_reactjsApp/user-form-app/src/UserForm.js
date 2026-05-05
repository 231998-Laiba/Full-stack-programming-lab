import React, { useState } from 'react';
import './UserForm.css';

function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = () => {
    if (name === '' || email === '') {
      alert('Please fill in all fields!');
      return;
    }
    setSubmittedData({ name, email });
    setName('');
    setEmail('');
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h1 className="form-title">User Form</h1>

        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>

        {submittedData && (
          <div className="result-card">
            <h2> Submitted Data</h2>
            <p><span>Name:</span> {submittedData.name}</p>
            <p><span>Email:</span> {submittedData.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserForm;
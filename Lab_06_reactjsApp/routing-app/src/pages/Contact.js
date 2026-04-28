import React, { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form Submitted!");
  };

  return (
    <div className="container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <textarea name="message" placeholder="Message" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Contact;
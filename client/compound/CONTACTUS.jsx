import React, { useState } from "react";
import "./contact.css";
import banner from '../IMAGE/contactus.webp'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Process form submission here
  };

  return (
    <div>
   
    <div className="contact-us-container">
      {/* Banner Section */}
      <div className="banner-section">
        <img 
          src={banner}
          alt="Contact Us Banner" 
          className="banner-image" 
        />
        <div className="banner-overlay">
          <h1>Contact Us</h1>
        </div>
      </div>

      {/* Contact Form */}
      <div className="form-section">
        <h2>We'd Love to Hear From You!</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ContactUs;

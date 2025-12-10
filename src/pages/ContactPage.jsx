import React, { useState } from 'react';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    alert('Message sent!');
  };

  return (
    <>
      <header>
        Contact Us
      </header>
      <section className="contact-info">
        <h2>Get in Touch</h2>
        <p>Address: Kibuye, Rwanda</p>
        <p>Phone/WhatsApp: <a href="https://wa.me/250700000000">+250 788 657 845</a></p>
        <p>Email: <a href="mailto:info@carmelmini.com">info@carmelmini.com</a></p>
      </section>
      <section className="contact-form">
        <h2>Send Us a Message</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
          <button type="submit"><i className="fas fa-paper-plane"></i> Send Message</button>
        </form>
      </section>
      <section className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7832239130565!2d30.059488915260727!3d-1.9440746358292377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dcae9d7f3e2e1b%3A0x7b891abeb4d8e0db!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1698685640000!5m2!1sen!2sus"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>
      <Footer />
    </>
  );
};

export default ContactPage;

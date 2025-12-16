import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [settings, setSettings] = useState({
    storePhone: '+250 788 657 845',
    whatsappNumber: '+250788657845',
    storeEmail: 'info@carmelmini.com',
    storeAddress: 'Kibuye, Rwanda'
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const settingsDoc = await getDoc(doc(db, 'settings', 'store'));
      if (settingsDoc.exists()) {
        setSettings(settingsDoc.data());
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    alert('Message sent!');
  };

  const formatPhoneDisplay = (phone) => {
    // Format phone number for display (add spaces for readability)
    if (!phone) return '+250 788 657 845';
    return phone.replace(/(\+\d{3})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
  };

  const formatWhatsAppLink = (phone) => {
    // Remove all non-numeric characters except the leading +
    if (!phone) return '250788657845';
    return phone.replace(/[^\d+]/g, '');
  };

  return (
    <>
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Get in touch with us today!</p>
      </div>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '48px' }}>
          <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📍</div>
            <h3 style={{ marginBottom: '8px', color: '#2C3E50' }}>Address</h3>
            <p style={{ color: '#6C757D', margin: 0 }}>{settings.storeAddress || 'Kibuye, Rwanda'}</p>
          </div>
          
          <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📞</div>
            <h3 style={{ marginBottom: '8px', color: '#2C3E50' }}>Phone/WhatsApp</h3>
            <p style={{ color: '#6C757D', margin: 0 }}>
              <a 
                href={`https://wa.me/${formatWhatsAppLink(settings.whatsappNumber || settings.storePhone)}`} 
                style={{ color: '#25D366', textDecoration: 'none' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {formatPhoneDisplay(settings.storePhone)}
              </a>
            </p>
          </div>
          
          <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✉️</div>
            <h3 style={{ marginBottom: '8px', color: '#2C3E50' }}>Email</h3>
            <p style={{ color: '#6C757D', margin: 0 }}>
              <a href={`mailto:${settings.storeEmail || 'info@carmelmini.com'}`} style={{ color: '#FF6B35', textDecoration: 'none' }}>
                {settings.storeEmail || 'info@carmelmini.com'}
              </a>
            </p>
          </div>
        </div>
        
        <section className="contact-form" style={{ maxWidth: '700px', margin: '0 auto 48px' }}>
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
            
            <button type="submit" className="btn-modern btn-primary-modern" style={{ width: '100%', marginTop: '24px' }}>
              <i className="fas fa-paper-plane"></i> Send Message
            </button>
          </form>
        </section>
        
        <section className="map-container" style={{ maxWidth: '100%', padding: '0' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7832239130565!2d30.059488915260727!3d-1.9440746358292377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dcae9d7f3e2e1b%3A0x7b891abeb4d8e0db!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1698685640000!5m2!1sen!2sus"
            allowFullScreen=""
            loading="lazy"
            style={{ width: '100%', height: '450px', border: 0, borderRadius: '16px' }}
          ></iframe>
        </section>
      </div>
      
      <Footer />
    </>
  );
};

export default ContactPage;

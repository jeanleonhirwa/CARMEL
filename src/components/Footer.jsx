import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-modern">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Carmel Mini Alimentation</h3>
          <p>Your trusted source for quality food, drinks, and home essentials in Rwanda.</p>
          <div className="social-links">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://wa.me/250780000000" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <p><Link to="/">Home</Link></p>
          <p><Link to="/products">Products</Link></p>
          <p><Link to="/categories">Categories</Link></p>
          <p><Link to="/contact">Contact Us</Link></p>
        </div>
        
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>📍 Kibuye, Rwanda</p>
          <p>📞 +250 788 657 845</p>
          <p>✉️ info@carmelmini.com</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2025 Carmel Mini Alimentation. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

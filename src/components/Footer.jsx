import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-clean">
      <div className="footer-container">
        
        {/* Company Section */}
        <div className="footer-col footer-col-about">
          <div className="footer-logo">
            <i className="fas fa-store"></i>
            <span>Carmel</span>
          </div>
          <p className="footer-description">
            Your trusted source for quality food, drinks, and home essentials in Rwanda.
          </p>
          <div className="footer-socials">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://wa.me/250788657845" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
        
        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        
        {/* Contact Info */}
        <div className="footer-col">
          <h4 className="footer-title">Get in Touch</h4>
          <ul className="footer-contact">
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <span>Kibuye, Rwanda</span>
            </li>
            <li>
              <i className="fas fa-phone-alt"></i>
              <a href="tel:+250788657845">+250 788 657 845</a>
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              <a href="mailto:info@carmelmini.com">info@carmelmini.com</a>
            </li>
          </ul>
        </div>
        
        {/* Business Hours */}
        <div className="footer-col">
          <h4 className="footer-title">Business Hours</h4>
          <ul className="footer-hours">
            <li>
              <span>Monday - Friday</span>
              <span>8:00 AM - 8:00 PM</span>
            </li>
            <li>
              <span>Saturday</span>
              <span>9:00 AM - 7:00 PM</span>
            </li>
            <li>
              <span>Sunday</span>
              <span>10:00 AM - 6:00 PM</span>
            </li>
          </ul>
        </div>
        
      </div>
      
      {/* Footer Bottom */}
      <div className="footer-bottom-clean">
        <div className="footer-bottom-container">
          <p>© 2025 Carmel Mini Alimentation. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <span>•</span>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

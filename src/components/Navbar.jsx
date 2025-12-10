import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav>
        <div className="nav-logo">
          <Link to="/">Carmel</Link>
        </div>
        <div className={`nav-links ${isOpen ? 'active' : ''}`} id="navLinks">
          <Link to="/" onClick={() => setIsOpen(false)}><i className="fas fa-home"></i> Home</Link>
          <Link to="/products" onClick={() => setIsOpen(false)}><i className="fas fa-store"></i> Products</Link>
          <Link to="/categories" onClick={() => setIsOpen(false)}><i className="fas fa-list"></i> Categories</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}><i className="fas fa-phone"></i> Contact</Link>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
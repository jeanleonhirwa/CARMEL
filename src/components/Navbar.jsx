import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="modern-nav">
      <div className="nav-logo">
        <Link to="/">
          <i className="fas fa-store"></i> Carmel
        </Link>
      </div>
      <div className={`nav-links nav-links-modern ${isOpen ? 'active' : ''}`} id="navLinks">
        <Link to="/" onClick={() => setIsOpen(false)} className={isActive('/')}>
          <i className="fas fa-home"></i> Home
        </Link>
        <Link to="/products" onClick={() => setIsOpen(false)} className={isActive('/products')}>
          <i className="fas fa-shopping-bag"></i> Products
        </Link>
        <Link to="/categories" onClick={() => setIsOpen(false)} className={isActive('/categories')}>
          <i className="fas fa-th-large"></i> Categories
        </Link>
        <Link to="/contact" onClick={() => setIsOpen(false)} className={isActive('/contact')}>
          <i className="fas fa-envelope"></i> Contact
        </Link>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </div>
    </nav>
  );
};

export default Navbar;
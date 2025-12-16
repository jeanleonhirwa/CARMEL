import React from 'react';
import { Link } from 'react-router-dom';

const HomeBody = () => {
  return (
    <section className="hero-modern">
      <div className="hero-content">
        <h1>Welcome to Carmel Mini Alimentation</h1>
        <p>Your trusted source for high-quality food, drinks, and home essentials. Fresh products delivered with care.</p>
        <div className="hero-buttons">
          <Link to="/products" className="btn-modern btn-primary-modern">
            <i className="fas fa-shopping-bag"></i> Browse Products
          </Link>
          <Link to="/categories" className="btn-modern btn-secondary-modern">
            <i className="fas fa-th-large"></i> View Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeBody;
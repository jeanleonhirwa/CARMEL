import React from 'react';
import { Link } from 'react-router-dom';
import homeBgImg from '../assets/images/home-bg-img.jpg';

const HomeBody = () => {
  return (
    <>
      <header>
        Carmel Mini Alimentation
      </header>
      <section className="hero" style={{ backgroundImage: `url(${homeBgImg})`, height: '230px' }}>
        <h1><i className="fas fa-utensils"></i> Welcome to Carmel Mini Alimentation</h1>
        <p>High-quality food, drinks, and home essentials every day.</p>
        <Link to="/products" className="btn">View Products</Link>
        <Link to="/contact" className="btn"><i className="fas fa-envelope"></i> Contact Us</Link>
      </section>
    </>
  );
};

export default HomeBody;
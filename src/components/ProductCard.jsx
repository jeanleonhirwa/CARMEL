import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <a href="https://www.instagram.com/yourusername/" className="order-btn" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-instagram"></i> Follow on Instagram
      </a>
    </div>
  );
};

export default ProductCard;

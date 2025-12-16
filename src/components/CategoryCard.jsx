import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const goTo = (category) => {
    navigate(`/products?cat=${category}`);
  };

  return (
    <div className="category-card category-card-modern" onClick={() => goTo(category.name.toLowerCase())}>
      <div className="category-icon-modern">{category.icon}</div>
      <h3>{category.name}</h3>
      {category.description && <p style={{ fontSize: '14px', color: 'var(--text-medium)', margin: 0 }}>{category.description}</p>}
    </div>
  );
};

export default CategoryCard;

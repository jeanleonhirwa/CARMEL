import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const goTo = (category) => {
    navigate(`/products?cat=${category}`);
  };

  return (
    <div className="category-card" onClick={() => goTo(category.name.toLowerCase())}>
      {category.icon} {category.name}
    </div>
  );
};

export default CategoryCard;

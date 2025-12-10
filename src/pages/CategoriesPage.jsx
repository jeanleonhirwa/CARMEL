import React, { useState, useEffect } from 'react';
import categoriesData from '../data/categories.json';
import CategoryCard from '../components/CategoryCard';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCategories(categoriesData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h2>Select a Product Category</h2>
      <div className="category-container">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default CategoriesPage;

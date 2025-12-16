import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import CategoryCard from '../components/CategoryCard';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const categoriesCollection = collection(db, 'categories');
        const categoriesSnapshot = await getDocs(categoriesCollection);
        const categoriesList = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCategories(categoriesList);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="loading-modern">
        <div className="spinner-modern"></div>
        <p>Loading categories...</p>
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <h1>Product Categories</h1>
        <p>Browse our wide selection of products by category</p>
      </div>
      
      {categories.length > 0 ? (
        <div className="category-container categories-grid-modern">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">🏷️</div>
          <h3>No categories available</h3>
          <p>Categories will appear here soon</p>
        </div>
      )}
      
      <Footer />
    </>
  );
};

export default CategoriesPage;

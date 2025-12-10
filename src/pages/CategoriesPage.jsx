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

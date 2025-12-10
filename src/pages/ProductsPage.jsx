import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoriesCollection = collection(db, 'categories');
        const categoriesSnapshot = await getDocs(categoriesCollection);
        const categoriesList = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCategories(categoriesList);

        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
        setFilteredProducts(productsList);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('cat');
    if (cat) {
      const category = categories.find(c => c.name.toLowerCase() === cat.toLowerCase());
      if (category) {
        const filtered = products.filter(p => p.categoryId === category.id);
        setFilteredProducts(filtered);
      }
    } else {
      setFilteredProducts(products);
    }
  }, [location.search, products, categories]);

  const filterProducts = (categoryName) => {
    if (categoryName === 'all') {
      setFilteredProducts(products);
    } else {
      const category = categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
      if (category) {
        const filtered = products.filter(p => p.categoryId === category.id);
        setFilteredProducts(filtered);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <header>
        Our Products
      </header>
      <div className="filter-buttons">
        <button onClick={() => filterProducts('all')}>All</button>
        {categories.map(category => (
          <button key={category.id} onClick={() => filterProducts(category.name)}>
            {category.name}
          </button>
        ))}
      </div>
      <section className="products">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
      <Footer />
    </>
  );
};

export default ProductsPage;

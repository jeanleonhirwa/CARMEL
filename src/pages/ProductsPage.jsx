import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
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
        setFilterCategory(cat.toLowerCase());
      }
    } else {
      setFilteredProducts(products);
      setFilterCategory('all');
    }
  }, [location.search, products, categories]);

  const filterProducts = (categoryName) => {
    if (categoryName === 'all') {
      setFilteredProducts(products);
      setFilterCategory('all');
    } else {
      const category = categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
      if (category) {
        const filtered = products.filter(p => p.categoryId === category.id);
        setFilteredProducts(filtered);
        setFilterCategory(categoryName.toLowerCase());
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-modern">
        <div className="spinner-modern"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <h1>Our Products</h1>
        <p>Discover fresh, quality products for your everyday needs</p>
      </div>
      
      <div className="filter-pills">
        <button className={`pill-btn ${filterCategory === 'all' ? 'active' : ''}`} onClick={() => filterProducts('all')}>
          All Products
        </button>
        {categories.map(category => (
          <button 
            key={category.id} 
            className={`pill-btn ${filterCategory === category.name.toLowerCase() ? 'active' : ''}`}
            onClick={() => filterProducts(category.name)}
          >
            {category.icon} {category.name}
          </button>
        ))}
      </div>
      
      {filteredProducts.length > 0 ? (
        <section className="products products-grid-modern">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <h3>No products found</h3>
          <p>Try selecting a different category</p>
        </div>
      )}
      
      <Footer />
    </>
  );
};

export default ProductsPage;

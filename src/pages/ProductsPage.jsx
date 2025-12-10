import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import productsData from '../data/products.json';
import categories from '../data/categories.json';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(productsData);
      setFilteredProducts(productsData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('cat');
    if (cat) {
      const category = categories.find(c => c.name.toLowerCase() === cat.toLowerCase());
      if (category) {
        const filtered = products.filter(p => p.category_id === category.id);
        setFilteredProducts(filtered);
      }
    } else {
      setFilteredProducts(products);
    }
  }, [location.search, products]);

  const filterProducts = (categoryName) => {
    if (categoryName === 'all') {
      setFilteredProducts(products);
    } else {
      const category = categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
      if (category) {
        const filtered = products.filter(p => p.category_id === category.id);
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

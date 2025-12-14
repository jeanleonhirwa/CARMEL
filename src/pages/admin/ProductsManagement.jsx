import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import '../../styles/AdminManagement.css';

function ProductsManagement() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch products
      const productsSnapshot = await getDocs(collection(db, 'products'));
      const productsData = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Fetch categories
      const categoriesSnapshot = await getDocs(collection(db, 'categories'));
      const categoriesData = categoriesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setProducts(productsData);
      setCategories(categoriesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (productId, productName) => {
    if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      try {
        await deleteDoc(doc(db, 'products', productId));
        setProducts(products.filter(p => p.id !== productId));
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please try again.');
      }
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.categoryId === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="admin-loading">Loading products...</div>;
  }

  return (
    <div className="admin-management">
      <div className="management-header">
        <div>
          <h1>Products Management</h1>
          <p>Manage your store products</p>
        </div>
        <Link to="/admin/products/add" className="btn-primary">
          ➕ Add New Product
        </Link>
      </div>

      <div className="filters-section">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="products-count">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {filteredProducts.length > 0 ? (
        <div className="products-grid-admin">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card-admin">
              <img src={product.image} alt={product.name} className="product-image-admin" />
              <div className="product-info-admin">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-meta">
                  <span className="product-price">RWF {product.price}</span>
                  <span className="product-category">{getCategoryName(product.categoryId)}</span>
                </div>
              </div>
              <div className="product-actions">
                <Link to={`/admin/products/edit/${product.id}`} className="btn-edit">
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id, product.name)}
                  className="btn-delete"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-products">
          <p>No products found.</p>
          <Link to="/admin/products/add" className="btn-primary">Add Your First Product</Link>
        </div>
      )}
    </div>
  );
}

export default ProductsManagement;

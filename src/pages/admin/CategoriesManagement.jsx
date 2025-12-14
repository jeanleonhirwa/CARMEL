import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import '../../styles/AdminManagement.css';

function CategoriesManagement() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch categories
      const categoriesSnapshot = await getDocs(collection(db, 'categories'));
      const categoriesData = categoriesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Fetch products to count products per category
      const productsSnapshot = await getDocs(collection(db, 'products'));
      const productsData = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setCategories(categoriesData);
      setProducts(productsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const getProductCount = (categoryId) => {
    return products.filter(p => p.categoryId === categoryId).length;
  };

  const handleDelete = async (categoryId, categoryName) => {
    const productCount = getProductCount(categoryId);
    
    if (productCount > 0) {
      alert(`Cannot delete "${categoryName}" because it has ${productCount} product(s). Please reassign or delete those products first.`);
      return;
    }

    if (window.confirm(`Are you sure you want to delete "${categoryName}"?`)) {
      try {
        await deleteDoc(doc(db, 'categories', categoryId));
        setCategories(categories.filter(c => c.id !== categoryId));
        alert('Category deleted successfully!');
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category. Please try again.');
      }
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="admin-loading">Loading categories...</div>;
  }

  return (
    <div className="admin-management">
      <div className="management-header">
        <div>
          <h1>Categories Management</h1>
          <p>Manage your product categories</p>
        </div>
        <Link to="/admin/categories/add" className="btn-primary">
          ➕ Add New Category
        </Link>
      </div>

      <div className="filters-section">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="products-count">
        Showing {filteredCategories.length} of {categories.length} categories
      </div>

      {filteredCategories.length > 0 ? (
        <div className="categories-grid">
          {filteredCategories.map(category => (
            <div key={category.id} className="category-card-admin">
              <div className="category-icon">{category.icon || '📦'}</div>
              <div className="category-info-admin">
                <h3>{category.name}</h3>
                <p className="category-description">{category.description || 'No description'}</p>
                <div className="category-stats">
                  <span className="product-count">{getProductCount(category.id)} products</span>
                </div>
              </div>
              <div className="category-actions">
                <Link to={`/admin/categories/edit/${category.id}`} className="btn-edit">
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => handleDelete(category.id, category.name)}
                  className="btn-delete"
                  disabled={getProductCount(category.id) > 0}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-products">
          <p>No categories found.</p>
          <Link to="/admin/categories/add" className="btn-primary">Add Your First Category</Link>
        </div>
      )}
    </div>
  );
}

export default CategoriesManagement;

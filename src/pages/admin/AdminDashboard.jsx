import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import '../../styles/AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    recentProducts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch products
      const productsSnapshot = await getDocs(collection(db, 'products'));
      const products = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Fetch categories
      const categoriesSnapshot = await getDocs(collection(db, 'categories'));
      const categories = categoriesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Get recent products (last 5)
      const recentProducts = products
        .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
        .slice(0, 5);

      setStats({
        totalProducts: products.length,
        totalCategories: categories.length,
        recentProducts
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back! Here's what's happening with your store.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card products">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{stats.totalProducts}</h3>
            <p>Total Products</p>
          </div>
          <Link to="/admin/products" className="stat-link">View All →</Link>
        </div>

        <div className="stat-card categories">
          <div className="stat-icon">🏷️</div>
          <div className="stat-info">
            <h3>{stats.totalCategories}</h3>
            <p>Categories</p>
          </div>
          <Link to="/admin/categories" className="stat-link">Manage →</Link>
        </div>

        <div className="stat-card orders">
          <div className="stat-icon">🛒</div>
          <div className="stat-info">
            <h3>0</h3>
            <p>Orders (Coming Soon)</p>
          </div>
        </div>

        <div className="stat-card revenue">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>RWF 0</h3>
            <p>Revenue (Coming Soon)</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-section">
          <h2>Recent Products</h2>
          <div className="recent-products">
            {stats.recentProducts.length > 0 ? (
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentProducts.map(product => (
                    <tr key={product.id}>
                      <td>
                        <img src={product.image} alt={product.name} className="product-thumb" />
                      </td>
                      <td>{product.name}</td>
                      <td>RWF {product.price}</td>
                      <td>{product.categoryId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-data">No products yet. Add your first product!</p>
            )}
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <Link to="/admin/products/add" className="action-btn add-product">
              ➕ Add Product
            </Link>
            <Link to="/admin/categories/add" className="action-btn add-category">
              ➕ Add Category
            </Link>
            <Link to="/admin/products" className="action-btn">
              📋 All Products
            </Link>
            <Link to="/admin/categories" className="action-btn">
              🏷️ All Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

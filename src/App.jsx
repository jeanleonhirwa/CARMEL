import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import CategoriesPage from './pages/CategoriesPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PrivateRoute from './components/PrivateRoute';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductsManagement from './pages/admin/ProductsManagement';
import AddEditProduct from './pages/admin/AddEditProduct';
import CategoriesManagement from './pages/admin/CategoriesManagement';
import AddEditCategory from './pages/admin/AddEditCategory';
import OrdersManagement from './pages/admin/OrdersManagement';
import SettingsPage from './pages/admin/SettingsPage';
import './App.css';
import './styles/Modern.css';

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<><Navbar /><HomePage /></>} />
        <Route path="/products" element={<><Navbar /><ProductsPage /></>} />
        <Route path="/contact" element={<><Navbar /><ContactPage /></>} />
        <Route path="/categories" element={<><Navbar /><CategoriesPage /></>} />
        <Route path="/login" element={<><Navbar /><LoginPage /></>} />
        <Route path="/signup" element={<><Navbar /><SignUpPage /></>} />
        
        {/* Old Admin Route (redirects to dashboard) */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<ProductsManagement />} />
          <Route path="products/add" element={<AddEditProduct />} />
          <Route path="products/edit/:id" element={<AddEditProduct />} />
          <Route path="categories" element={<CategoriesManagement />} />
          <Route path="categories/add" element={<AddEditCategory />} />
          <Route path="categories/edit/:id" element={<AddEditCategory />} />
          <Route path="orders" element={<OrdersManagement />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
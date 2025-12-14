import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, addDoc, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import '../../styles/AdminForms.css';

function AddEditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      fetchCategory();
    }
  }, [id]);

  const fetchCategory = async () => {
    try {
      const categoryDoc = await getDoc(doc(db, 'categories', id));
      if (categoryDoc.exists()) {
        setFormData(categoryDoc.data());
      } else {
        alert('Category not found!');
        navigate('/admin/categories');
      }
    } catch (error) {
      console.error('Error fetching category:', error);
      alert('Failed to load category data.');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Category name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      const categoryData = {
        ...formData,
        updatedAt: serverTimestamp()
      };

      if (isEditMode) {
        await updateDoc(doc(db, 'categories', id), categoryData);
        alert('Category updated successfully!');
      } else {
        categoryData.createdAt = serverTimestamp();
        await addDoc(collection(db, 'categories'), categoryData);
        alert('Category added successfully!');
      }

      navigate('/admin/categories');
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const commonIcons = ['🥛', '🧃', '🍫', '🍪', '💧', '🍺', '🍿', '🥤', '🍞', '🥫', '🧀', '🍖', '🥚', '🍎', '🥗'];

  return (
    <div className="admin-form-page">
      <div className="form-header">
        <h1>{isEditMode ? 'Edit Category' : 'Add New Category'}</h1>
        <button onClick={() => navigate('/admin/categories')} className="btn-back">
          ← Back to Categories
        </button>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="name">Category Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter category name"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter category description"
            rows="4"
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="icon">Icon (Emoji)</label>
          <input
            type="text"
            id="icon"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            placeholder="Pick an emoji"
            maxLength="2"
          />
          <div className="icon-picker">
            <p>Quick pick:</p>
            <div className="icon-options">
              {commonIcons.map(icon => (
                <button
                  key={icon}
                  type="button"
                  className={`icon-option ${formData.icon === icon ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, icon }))}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/categories')}
            className="btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : (isEditMode ? 'Update Category' : 'Add Category')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEditCategory;

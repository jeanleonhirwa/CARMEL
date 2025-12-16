import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import '../../styles/AdminForms.css';

function SettingsPage() {
  const [settings, setSettings] = useState({
    storeName: 'Carmel Mini Alimentation',
    storeEmail: 'carmelstore@gmail.com',
    storePhone: '+250 780 000 000',
    storeAddress: 'Kigali, Rwanda',
    whatsappNumber: '+250780000000',
    currency: 'RWF',
    taxRate: '0',
    shippingFee: '0'
  });
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const settingsDoc = await getDoc(doc(db, 'settings', 'store'));
      if (settingsDoc.exists()) {
        setSettings(settingsDoc.data());
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaveStatus('');

    try {
      await setDoc(doc(db, 'settings', 'store'), settings);
      setSaveStatus('success');
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveStatus('error');
      alert('Failed to save settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-page">
      <div className="form-header">
        <h1>Store Settings</h1>
        <p>Manage your store configuration</p>
      </div>

      <form onSubmit={handleSubmit} className="admin-form settings-form">
        <div className="settings-section">
          <h2>📋 Store Information</h2>
          
          <div className="form-group">
            <label htmlFor="storeName">Store Name</label>
            <input
              type="text"
              id="storeName"
              name="storeName"
              value={settings.storeName}
              onChange={handleChange}
              placeholder="Your store name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="storeEmail">Store Email</label>
            <input
              type="email"
              id="storeEmail"
              name="storeEmail"
              value={settings.storeEmail}
              onChange={handleChange}
              placeholder="store@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="storePhone">Store Phone</label>
            <input
              type="tel"
              id="storePhone"
              name="storePhone"
              value={settings.storePhone}
              onChange={handleChange}
              placeholder="+250 780 000 000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="whatsappNumber">WhatsApp Number</label>
            <input
              type="tel"
              id="whatsappNumber"
              name="whatsappNumber"
              value={settings.whatsappNumber}
              onChange={handleChange}
              placeholder="+250780000000"
            />
            <small style={{ color: '#666', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>
              Enter with country code (no spaces). E.g., +250780000000
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="storeAddress">Store Address</label>
            <textarea
              id="storeAddress"
              name="storeAddress"
              value={settings.storeAddress}
              onChange={handleChange}
              placeholder="Full store address"
              rows="3"
            />
          </div>
        </div>

        <div className="settings-section">
          <h2>💰 Pricing & Currency</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="currency">Currency</label>
              <select
                id="currency"
                name="currency"
                value={settings.currency}
                onChange={handleChange}
              >
                <option value="RWF">RWF - Rwandan Franc</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="taxRate">Tax Rate (%)</label>
              <input
                type="number"
                id="taxRate"
                name="taxRate"
                value={settings.taxRate}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label htmlFor="shippingFee">Default Shipping Fee</label>
              <input
                type="number"
                id="shippingFee"
                name="shippingFee"
                value={settings.shippingFee}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>ℹ️ About This Feature</h2>
          <div className="info-box">
            <p>These settings are stored in Firebase and can be expanded to include:</p>
            <ul>
              <li>Payment gateway configuration</li>
              <li>Email notification settings</li>
              <li>Social media links</li>
              <li>Operating hours</li>
              <li>And more...</li>
            </ul>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : '💾 Save Settings'}
          </button>
          {saveStatus === 'success' && <span className="success-message">✅ Saved!</span>}
          {saveStatus === 'error' && <span className="error-message">❌ Failed to save</span>}
        </div>
      </form>
    </div>
  );
}

export default SettingsPage;

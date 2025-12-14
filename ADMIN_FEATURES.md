# Admin Panel Features Documentation

## Overview
The Carmel Mini Alimentation admin panel provides a comprehensive management system for the e-commerce store. The admin panel is accessible only to authenticated users and provides full CRUD (Create, Read, Update, Delete) operations for products and categories.

## Access
- **URL**: `http://localhost:5174/admin`
- **Authentication Required**: Yes (Firebase Authentication)
- **Login Page**: `http://localhost:5174/login`

## Features

### 1. Admin Dashboard (`/admin/dashboard`)
The central hub showing key statistics and quick actions.

**Features:**
- **Statistics Cards**:
  - Total Products count
  - Total Categories count
  - Orders (Coming Soon)
  - Revenue (Coming Soon)
- **Recent Products Table**: Shows the 5 most recently added products
- **Quick Actions**: Fast links to add products/categories

### 2. Products Management (`/admin/products`)
Complete product management system.

**Features:**
- **View All Products**: Grid display of all products with images
- **Search Products**: Real-time search by name or description
- **Filter by Category**: Dropdown to filter products by category
- **Add New Product**: Button to create new products
- **Edit Product**: Edit any existing product
- **Delete Product**: Remove products with confirmation
- **Product Information Displayed**:
  - Product image
  - Name
  - Description
  - Price (RWF)
  - Category

### 3. Add/Edit Product (`/admin/products/add` or `/admin/products/edit/:id`)
Form to create or modify products.

**Fields:**
- Product Name (Required)
- Description (Required)
- Price in RWF (Required)
- Category (Required - Select from dropdown)
- Image URL (Required - Shows preview)

**Features:**
- Form validation with error messages
- Image preview before saving
- Cancel button to go back
- Success/error notifications

### 4. Categories Management (`/admin/categories`)
Manage product categories.

**Features:**
- **View All Categories**: Grid display with icons
- **Search Categories**: Real-time search
- **Add New Category**: Button to create categories
- **Edit Category**: Modify existing categories
- **Delete Category**: Remove categories (prevents deletion if products exist)
- **Product Count**: Shows number of products per category
- **Category Information**:
  - Icon (emoji)
  - Name
  - Description
  - Product count

### 5. Add/Edit Category (`/admin/categories/add` or `/admin/categories/edit/:id`)
Form to create or modify categories.

**Fields:**
- Category Name (Required)
- Description (Required)
- Icon (Emoji picker provided)

**Features:**
- Icon picker with common emojis
- Form validation
- Cancel button
- Success/error notifications

### 6. Orders Management (`/admin/orders`)
Placeholder for future orders functionality.

**Coming Soon:**
- View all customer orders
- Update order status
- Track deliveries
- Manage refunds and returns
- Generate order reports

### 7. Settings (`/admin/settings`)
Store configuration and settings.

**Settings Available:**
- **Store Information**:
  - Store Name
  - Store Email
  - Store Phone
  - Store Address
- **Pricing & Currency**:
  - Currency (RWF, USD, EUR)
  - Tax Rate (%)
  - Default Shipping Fee

**Features:**
- Saved to Firebase Firestore
- Success/error feedback
- Expandable for future settings

## Navigation

### Admin Sidebar
Fixed sidebar with navigation to all admin sections:
- 📊 Dashboard
- 📦 Products
- 🏷️ Categories
- 🛒 Orders
- ⚙️ Settings
- 🏠 View Store (returns to public site)
- 🚪 Logout

### Top Bar
- Current section name
- User email display

## Technical Details

### File Structure
```
src/
├── pages/
│   └── admin/
│       ├── AdminDashboard.jsx
│       ├── ProductsManagement.jsx
│       ├── AddEditProduct.jsx
│       ├── CategoriesManagement.jsx
│       ├── AddEditCategory.jsx
│       ├── OrdersManagement.jsx
│       └── SettingsPage.jsx
├── components/
│   └── AdminLayout.jsx
└── styles/
    ├── AdminLayout.css
    ├── AdminDashboard.css
    ├── AdminManagement.css
    └── AdminForms.css
```

### Routes
```javascript
/admin                          → Dashboard
/admin/dashboard               → Dashboard
/admin/products                → Products List
/admin/products/add            → Add New Product
/admin/products/edit/:id       → Edit Product
/admin/categories              → Categories List
/admin/categories/add          → Add New Category
/admin/categories/edit/:id     → Edit Category
/admin/orders                  → Orders (Coming Soon)
/admin/settings                → Store Settings
```

### Firebase Collections
- **products**: Stores all product data
  - Fields: name, description, price, image, categoryId, createdAt, updatedAt
- **categories**: Stores all category data
  - Fields: name, icon, description, createdAt, updatedAt
- **settings**: Store configuration (document ID: 'store')
  - Fields: storeName, storeEmail, storePhone, storeAddress, currency, taxRate, shippingFee

## Seeding Data

To populate the database with initial data:

```bash
node scripts/seed.js
```

This will:
- Seed all categories from `src/data/categories.json`
- Seed all products from `src/data/products.json`
- Add timestamps (createdAt, updatedAt)

## Security

- All admin routes are protected with `PrivateRoute` component
- Requires Firebase Authentication
- Unauthenticated users are redirected to login page
- Firebase Security Rules should be configured to restrict write access

## Responsive Design

The admin panel is fully responsive:
- **Desktop**: Full sidebar with labels
- **Tablet/Mobile**: Collapsed sidebar with icons only
- **Mobile**: Stacked layouts for better usability

## Future Enhancements

Potential features to add:
- [ ] Image upload to Firebase Storage
- [ ] Bulk product operations
- [ ] Product inventory tracking
- [ ] Order management system
- [ ] Customer management
- [ ] Sales analytics and reports
- [ ] Export data (CSV, PDF)
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Activity logs

## Support

For issues or questions, please refer to the main README.md or contact the development team.

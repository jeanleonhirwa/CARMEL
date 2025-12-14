# 🚀 Admin Panel Setup & Usage Guide

## Quick Start

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Firebase
Make sure your Firebase configuration is set up in `src/firebase.js`

### Step 3: Seed the Database
Populate your Firebase with initial categories and products:
```bash
node scripts/seed.js
```

### Step 4: Run the Application
```bash
npm run dev
```

### Step 5: Create Admin Account
1. Navigate to `http://localhost:5173/signup`
2. Register with your email and password
3. This account will have admin access

### Step 6: Login to Admin Panel
1. Go to `http://localhost:5173/login`
2. Enter your credentials
3. You'll be redirected to the admin dashboard

## 📍 Admin Panel URLs

Once logged in, access these URLs:

- **Dashboard**: `http://localhost:5173/admin` or `http://localhost:5173/admin/dashboard`
- **Products Management**: `http://localhost:5173/admin/products`
- **Add Product**: `http://localhost:5173/admin/products/add`
- **Edit Product**: `http://localhost:5173/admin/products/edit/{productId}`
- **Categories Management**: `http://localhost:5173/admin/categories`
- **Add Category**: `http://localhost:5173/admin/categories/add`
- **Edit Category**: `http://localhost:5173/admin/categories/edit/{categoryId}`
- **Orders**: `http://localhost:5173/admin/orders` (Coming Soon)
- **Settings**: `http://localhost:5173/admin/settings`

## 🎯 Features Overview

### Dashboard
- View total products and categories
- See recent products
- Quick action buttons
- Statistics cards

### Products Management
1. **View Products**: See all products in a grid
2. **Search**: Type in the search box to filter
3. **Filter**: Use category dropdown to filter
4. **Add**: Click "➕ Add New Product"
5. **Edit**: Click "✏️ Edit" on any product
6. **Delete**: Click "🗑️ Delete" (with confirmation)

### Categories Management
1. **View Categories**: See all categories with icons
2. **Search**: Filter categories by name
3. **Add**: Click "➕ Add New Category"
4. **Edit**: Click "✏️ Edit" on any category
5. **Delete**: Remove categories (only if no products exist)

### Settings
- Update store name, email, phone, address
- Configure currency (RWF, USD, EUR)
- Set tax rate and shipping fees
- Changes saved to Firebase

## 🎨 Admin Panel Features

### Navigation Sidebar
The left sidebar provides quick access to:
- 📊 Dashboard
- 📦 Products
- 🏷️ Categories
- 🛒 Orders
- ⚙️ Settings
- 🏠 View Store (public site)
- 🚪 Logout

### Top Bar
- Shows current section name
- Displays logged-in user email

## 💡 Usage Tips

### Adding a Product
1. Go to Products Management
2. Click "➕ Add New Product"
3. Fill in all required fields:
   - Product Name
   - Description
   - Price in RWF
   - Category (select from dropdown)
   - Image URL
4. Check the image preview
5. Click "Add Product"

### Editing a Product
1. Find the product in Products Management
2. Click "✏️ Edit"
3. Modify any fields
4. Click "Update Product"

### Adding a Category
1. Go to Categories Management
2. Click "➕ Add New Category"
3. Enter name and description
4. Pick an emoji icon (or type your own)
5. Click "Add Category"

### Deleting Items
- **Products**: Can be deleted anytime
- **Categories**: Can only be deleted if no products are assigned to it
- Always shows confirmation dialog

## 🔒 Security Notes

- Only logged-in users can access admin panel
- If not logged in, you'll be redirected to login page
- Configure Firebase Security Rules for production

### Recommended Firebase Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public can read products and categories
    match /products/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /categories/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Only authenticated users can access settings
    match /settings/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 📱 Mobile Access

The admin panel is fully responsive:
- Works on tablets and phones
- Sidebar collapses to icons on small screens
- Forms adapt to screen size
- Touch-friendly buttons

## 🐛 Troubleshooting

### Issue: Cannot access admin panel
**Solution**: Make sure you're logged in. Go to `/login` first.

### Issue: Products not showing
**Solution**: Run the seed script: `node scripts/seed.js`

### Issue: Images not loading
**Solution**: Check that image URLs are valid and accessible

### Issue: Cannot delete category
**Solution**: This is intentional - remove all products from the category first

### Issue: Build warnings about bundle size
**Solution**: This is normal. For production, consider code-splitting.

## 📊 Data Structure

### Product Object
```javascript
{
  name: "Product Name",
  description: "Product description",
  price: 1000,
  image: "https://example.com/image.jpg",
  categoryId: "1",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Category Object
```javascript
{
  name: "Category Name",
  icon: "🏷️",
  description: "Category description",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## 🎓 Training Your Team

### For Shop Owners/Managers
1. Focus on Dashboard and Statistics
2. Learn to add/edit products
3. Update settings as needed

### For Staff
1. Learn product management
2. Practice adding/editing items
3. Understand category system

## 📈 Future Features (Ready to Build)

- Image upload (instead of URLs)
- Order management system
- Customer database
- Sales analytics
- Inventory tracking
- Bulk import/export
- Email notifications
- Activity logs

## 🆘 Support

For help or questions:
1. Check `ADMIN_FEATURES.md` for detailed feature documentation
2. Check `IMPLEMENTATION_SUMMARY.md` for technical details
3. Review the code comments in each file

## ✅ Pre-Launch Checklist

Before going live:
- [ ] Configure Firebase Security Rules
- [ ] Test all CRUD operations
- [ ] Verify responsive design on mobile
- [ ] Set up proper authentication
- [ ] Configure environment variables
- [ ] Test logout functionality
- [ ] Verify all images load correctly
- [ ] Test with multiple categories
- [ ] Ensure proper error handling
- [ ] Review settings configuration

---

**Happy Managing! 🎉**

Your store is now fully equipped with a professional admin panel.

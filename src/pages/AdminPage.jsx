import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function AdminPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesCollection = collection(db, 'categories');
        const categoriesSnapshot = await getDocs(categoriesCollection);
        const categoriesList = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCategories(categoriesList);
        if (categoriesList.length > 0) {
          setCategoryId(categoriesList[0].id);
        }
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchCategories();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !description || !price || !image || !categoryId) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const productsCollection = collection(db, "products");
      await addDoc(productsCollection, {
        name,
        description,
        price: parseFloat(price),
        image,
        categoryId,
      });
      setSuccess("Product added successfully!");
      // Clear form
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
    } catch (err) {
      setError("Failed to add product. " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Admin Page</h2>
        <button onClick={handleLogout} style={{ padding: "10px 15px" }}>
          Logout
        </button>
      </div>
      <p>Welcome, admin! You can add new products here.</p>

      <h3>Add New Product</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleAddProduct}>
        <div style={{ marginBottom: "10px" }}>
          <label>Product Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Image URL</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Category</label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required style={{ width: "100%", padding: "8px" }}>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" style={{ padding: "10px 15px" }}>Add Product</button>
      </form>
    </div>
  );
}

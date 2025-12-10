import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Admin Page</h2>
      <p>Welcome, admin! You can add new products here.</p>
      {/* Product upload form will go here */}
      <button onClick={handleLogout} style={{ padding: "10px 15px" }}>
        Logout
      </button>
    </div>
  );
}

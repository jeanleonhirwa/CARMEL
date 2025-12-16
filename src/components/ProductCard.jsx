import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ProductCard = ({ product }) => {
  const [whatsappNumber, setWhatsappNumber] = useState('+250780000000');

  useEffect(() => {
    fetchWhatsAppNumber();
  }, []);

  const fetchWhatsAppNumber = async () => {
    try {
      const settingsDoc = await getDoc(doc(db, 'settings', 'store'));
      if (settingsDoc.exists() && settingsDoc.data().whatsappNumber) {
        setWhatsappNumber(settingsDoc.data().whatsappNumber);
      }
    } catch (error) {
      console.error('Error fetching WhatsApp number:', error);
    }
  };

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in *${product.name}* (${product.price} RWF). Can we discuss this product?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="product-card product-card-modern">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info-modern">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-price-modern">RWF {product.price?.toLocaleString()}</div>
        <button onClick={handleWhatsAppClick} className="btn-modern btn-whatsapp-modern">
          <i className="fab fa-whatsapp"></i> Let's Talk
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

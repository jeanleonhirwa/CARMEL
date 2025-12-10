const { initializeApp } = require("firebase/app");
const { getFirestore, collection, doc, setDoc } = require("firebase/firestore");
const categories = require("../src/data/categories.json");
const products = require("../src/data/products.json");

// IMPORTANT:
// 1. Make sure you have created a 'firebase.js' file in 'src' with your firebase config.
// 2. This script is intended to be run from the root of your project using Node.js.
//    `node scripts/seed.js`
// 3. This script will overwrite existing documents with the same ID.

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAa9j2SIOJhnlZ1sz5bNR_8izqhLN9f9qU",
    authDomain: "carmel-3ef71.firebaseapp.com",
    projectId: "carmel-3ef71",
    storageBucket: "carmel-3ef71.firebasestorage.app",
    messagingSenderId: "321108792560",
    appId: "1:321108792560:web:5b3c00da8adc53d655de35",
    measurementId: "G-RZR3XJRG3H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedDatabase() {
  try {
    console.log("Seeding categories...");
    const categoriesCollection = collection(db, "categories");
    for (const category of categories) {
      const categoryId = category.id.toString();
      await setDoc(doc(categoriesCollection, categoryId), {
        name: category.name,
        icon: category.icon,
      });
    }
    console.log("Categories seeded successfully.");

    console.log("Seeding products...");
    const productsCollection = collection(db, "products");
    for (const product of products) {
      await setDoc(doc(productsCollection), {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        categoryId: product.category_id.toString(),
      });
    }
    console.log("Products seeded successfully.");

    console.log("Database seeding complete.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Firebase doesn't have a built-in function to close the connection in the v9 SDK.
    // The script will exit automatically.
  }
}

seedDatabase();

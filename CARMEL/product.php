<?php include 'db.php'; ?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Our Products</title>

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

  <!-- External CSS -->
  <link rel="stylesheet" href="style.css">

  <style>
    /* FILTER BUTTONS */
    .filter-buttons {
      text-align: center;
      margin: 20px 0;
    }

    .filter-buttons button {
      padding: 10px 18px;
      margin: 5px;
      border: none;
      background: var(--accent);
      color: white;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
    }

    .filter-buttons button:hover {
      background: darkorange;
    }

    .hidden {
      display: none;
    }
  </style>
</head>
<body>

  <!-- ✅ NAV BAR WITH HAMBURGER -->
  <nav>
    <div class="nav-logo">Products</div>

    <div class="hamburger" onclick="toggleMenu()">
      <i class="fas fa-bars"></i>
    </div>  

    <div class="nav-links" id="navLinks">
      <a href="index.php"><i class="fas fa-home"></i> Home</a>
      <a href="catergory.php"><i class="fas fa-list"></i> Categories</a>
      <a href="product.php"><i class="fas fa-store"></i> Products</a>
      <a href="contact.php"><i class="fas fa-phone"></i> Contact</a>
    </div>
  </nav>

  <!-- HEADER -->
  <header>
    Our Products
  </header>

  <!-- ✅ FILTER BUTTONS -->
  <div class="filter-buttons">
    <button onclick="filterProducts('all')">All</button>
    <?php
      $sql = "SELECT * FROM categories";
      $result = $conn->query($sql);

      if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
          echo "<button onclick=\"filterProducts('".strtolower($row['name'])."_products')\">" . $row['name'] . "</button>";
        }
      } else {
        echo "0 results";
      }
    ?>
  </div>

  <!-- PRODUCTS SECTION -->
  <section class="products">
    <?php
      $cat = isset($_GET['cat']) ? $_GET['cat'] : 'all';

      $sql = "SELECT p.*, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id";

      if($cat != 'all'){
        $sql .= " WHERE c.name = '" . $conn->real_escape_string($cat) . "'";
      }

      $result = $conn->query($sql);

      if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
          echo "<div class='product-card' data-category='" . strtolower($row['category_name']) . "_products'>";
          echo "<img src='" . $row['image'] . "' alt='" . $row['name'] . "'>";
          echo "<h3>" . $row['name'] . "</h3>";
          echo "<p>" . $row['description'] . "</p>";
          echo "<a href='https://www.instagram.com/yourusername/' class='order-btn' target='_blank'>";
          echo "<i class='fab fa-instagram'></i> Follow on Instagram";
          echo "</a>";
          echo "</div>";
        }
      } else {
        echo "0 results";
      }
    ?>
  </section>

  <!-- ✅ JAVASCRIPT FOR FILTERING + URL CATEGORY -->
  <script>

    /* ✅ Hamburger Toggle */
    function toggleMenu() {
      document.getElementById("navLinks").classList.toggle("active");
    }

    /* ✅ PRODUCT FILTERING FUNCTION */
    function filterProducts(category) {
      const products = document.querySelectorAll(".product-card");

      products.forEach(product => {
        const productCategory = product.getAttribute("data-category");

        if (category === "all" || category === productCategory) {
          product.classList.remove("hidden");
        } else {
          product.classList.add("hidden");
        }
      });
    }

    /* ✅ AUTO FILTER WHEN COMING FROM categories.html */
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromURL = urlParams.get("cat");

    if (categoryFromURL) {
      filterProducts(categoryFromURL + '_products');
    }

  </script>

</body>
</html>

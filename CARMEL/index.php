<?php include 'db.php'; ?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Carmel Mini Alimentation</title>

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

  <!-- External CSS -->
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- ✅ NAV BAR WITH HAMBURGER -->
  <nav>

    <div class="hamburger" onclick="toggleMenu()">
      <i class="fas fa-bars"></i>
    </div>

    <div class="nav-links" id="navLinks">
      <a href="index.php"><i class="fas fa-home"></i> Home</a>
      <a href="product.php"><i class="fas fa-store"></i> Products</a>
      <a href="contact.php"><i class="fas fa-phone"></i> Contact</a>
    </div>
  </nav>

  <!-- HEADER -->
  <header>
    Carmel Mini Alimentation
  </header>

  <!-- HERO SECTION WITH BACKGROUND IMAGE -->
  <section class="hero" style="background-image: url('./images/home-bg-img.jpg'); height: 230px;">
    <h1><i class="fas fa-utensils"></i> Welcome to Carmel Mini Alimentation</h1>
    <p>High-quality food, drinks, and home essentials every day.</p>

    <a href="product.php" class="btn">View Products</a>
    <a href="contact.php" class="btn"><i class="fas fa-envelope"></i> Contact Us</a>
  </section>

  <!-- FOOTER -->
  <footer>
    <p>© 2025 Carmel Mini Alimentation. All rights reserved.</p>
    <p>
      <a href="https://www.facebook.com/" target="_blank"><i class="fab fa-facebook"></i></a>
      <a href="https://www.instagram.com/" target="_blank"><i class="fab fa-instagram"></i></a>
      <a href="https://wa.me/250700000000" target="_blank"><i class="fab fa-whatsapp"></i></a>
    </p>
  </footer>

  <!-- ✅ JAVASCRIPT FOR HAMBURGER -->
  <script>
    function toggleMenu() {
      document.getElementById("navLinks").classList.toggle("active");
    }
  </script>

</body>
</html>

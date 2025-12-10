
CREATE DATABASE carmel_mini_alimentation;

USE carmel_mini_alimentation;

CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(255)
);

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO `categories` (`id`, `name`, `icon`) VALUES
(1, 'Milk Products', '🥛'),
(2, 'Juices', '🧃'),
(3, 'Snacks', '🍪'),
(4, 'Chocolate', '🍫'),
(5, 'Biscuits', '🍭'),
(6, 'Water', '💧'),
(7, 'Beer', '🍺');

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `category_id`) VALUES
(1, 'Milk', '2k / liter', 2000.00, 'https://rwandamart.rw/wp-content/uploads/2021/06/InyangeWholeMilk-0001.png', 1),
(2, 'Sheep Milk', '1k / liter', 1000.00, 'https://cdn.tridge.com/ontology/product_thumbnails/sheep-milk.png', 1),
(3, 'Agashya Juice', '12k / bottle', 12000.00, 'https://sinarwanda.rw/wp-content/uploads/2020/06/v2-15-scaled.jpg', 2),
(4, 'Chocolate', '6k / piece', 6000.00, 'https://murukali.com/cdn/shop/files/Everyday-White-Chocolate-murukali-com-7321.jpg', 4),
(5, 'Juice', '2k / piece', 2000.00, 'https://rwandamart.rw/wp-content/uploads/2021/06/IMG_1673.jpg', 2),
(6, 'Chocolate', '1.5k / piece', 1500.00, 'https://migro.co.rw/app/upload/images/5206-2022-04-10.jpeg', 4),
(7, 'Snacks', '2.5k / piece', 2500.00, 'https://image.made-in-china.com/202f0j00SYcoqbagCFkP/Pringles-and-Lays-Style-Potato-Chips-Snacks.webp', 3);

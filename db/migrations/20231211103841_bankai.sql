-- migrate:up
CREATE TABLE IF NOT EXISTS `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `role` ENUM ('admin', 'user', 'moderator', 'delevery'),
  `username` varchar(255),
  `firstname` varchar(255),
  `email` varchar(255),
  `refresh_token` varchar(255),
  `phone` varchar(255),
  `password` varchar(255),
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS `product` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `price` integer,
  `images` text,
  `name_uz` varchar(255),
  `name_ru` varchar(255),
  `desc_shop_uz` varchar(255),
  `desc_shop_ru` varchar(255),
  `desc_uz` varchar(255),
  `desc_ru` varchar(255),
  `view_count` integer,
  `order_count` integer,
  `discount_in_perecnt` float,
  `remoining_count` integer,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS `event` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW(),
  `name` varchar(255)
);

CREATE TABLE IF NOT EXISTS `category` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name_uz` varchar(255),
  `name_ru` varchar(255),
  `desc_shop_uz` varchar(255),
  `desc_shop_ru` varchar(255),
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW(),
  `parent_id` integer
);

CREATE TABLE IF NOT EXISTS `cart` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer,
  `product_id` integer,
  `count` integer
);

CREATE TABLE IF NOT EXISTS `likee` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer,
  `product_id` integer
);

CREATE TABLE IF NOT EXISTS `comment` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW(),
  `parent_id` integer,
  `user_id` integer,
  `content` text,
  `images` varchar(255),
  `product_id` integer,
  `rating` varchar(255),
  `answer_to` integer
);

CREATE TABLE IF NOT EXISTS `Adress` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW(),
  `region` varchar(255),
  `city` varchar(255),
  `street` varchar(255),
  `house` varchar(255),
  `room` varchar(255),
  `name` varchar(255),
  `user_id` integer
);

CREATE TABLE IF NOT EXISTS `attributes` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW(),
  `name_uz` varchar(255),
  `name_ru` varchar(255)
);

CREATE TABLE IF NOT EXISTS `attributes_value` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW(),
  `name_uz` varchar(255),
  `name_ru` varchar(255),
  `atrebuts_id` integer
);

CREATE TABLE IF NOT EXISTS `order` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW(),
  `adress_id` integer,
  `user_id` integer,
  `product` integer,
  `delevery_id` integer,
  `count` integer,
  `status` ENUM ('packing', 'on_the_way', 'finished')
);

CREATE TABLE IF NOT EXISTS `delivery` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW(),
  `delevery_id` integer,
  `note` varchar(255),
  `delevery_fee` integer
);

CREATE TABLE IF NOT EXISTS `product_event` (
  `product_id` integer,
  `event_id` integer,
  PRIMARY KEY (`product_id`, `event_id`)
);

CREATE TABLE IF NOT EXISTS `categorys_products` (
  `product_id` integer,
  `category_id` integer,
  PRIMARY KEY (`product_id`, `category_id`)
);

CREATE TABLE IF NOT EXISTS `categorys_attributes` (
  `attributes_id` integer,
  `category_id` integer,
  PRIMARY KEY (`attributes_id`, `category_id`)
);

ALTER TABLE `categorys_attributes` ADD FOREIGN KEY (`attributes_id`) REFERENCES `attributes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `categorys_attributes` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE `categorys_products` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `categorys_products` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `product_event` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `product_event` ADD FOREIGN KEY (`event_id`) REFERENCES `event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `category` ADD FOREIGN KEY (`parent_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `cart` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `cart` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `likee` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `likee` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `comment` ADD FOREIGN KEY (`parent_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `comment` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `comment` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `comment` ADD FOREIGN KEY (`answer_to`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `Adress` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `product_attributes_value` (
  `product_id` integer,
  `attributes_value_id` integer,
  PRIMARY KEY (`product_id`, `attributes_value_id`)
);

ALTER TABLE `product_attributes_value` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `product_attributes_value` ADD FOREIGN KEY (`attributes_value_id`) REFERENCES `attributes_value` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `attributes_value` ADD FOREIGN KEY (`atrebuts_id`) REFERENCES `attributes` (`id`)  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `order` ADD FOREIGN KEY (`adress_id`) REFERENCES `Adress` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `order` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `order` ADD FOREIGN KEY (`product`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `order` ADD FOREIGN KEY (`delevery_id`) REFERENCES `delivery` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `delivery` ADD FOREIGN KEY (`delevery_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;



-- migrate:down
DROP DATABASE bananashop

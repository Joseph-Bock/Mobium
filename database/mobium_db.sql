-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 15, 2021 at 10:37 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mobium_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `manufacturers`
--

CREATE TABLE `manufacturers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `manufacturers`
--

INSERT INTO `manufacturers` (`id`, `name`) VALUES
(1, 'Apple'),
(2, 'Google'),
(3, 'Samsung'),
(4, 'Sony');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `manufacturer` varchar(45) NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `storage` int(11) NOT NULL,
  `ram` int(11) NOT NULL,
  `processor` varchar(45) NOT NULL,
  `color` varchar(45) NOT NULL,
  `weight` int(11) NOT NULL,
  `display` int(11) NOT NULL,
  `resolution` varchar(45) NOT NULL,
  `frontCamera` int(11) NOT NULL,
  `backCamera` int(11) NOT NULL,
  `video` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `manufacturer`, `price`, `discount`, `image`, `storage`, `ram`, `processor`, `color`, `weight`, `display`, `resolution`, `frontCamera`, `backCamera`, `video`, `createdAt`, `updatedAt`) VALUES
(1, 'iPhone 12 Pro', '1', 999, 0, '1621109772186.png', 32, 12, 'Exynos 2100', 'Red', 170, 4, '1242 x 2688', 16, 7, '1080p@120FPS', '2021-05-15 20:16:12', '2021-05-15 20:16:12'),
(2, 'Samsung S20', '3', 799, 0, '1621109805881.png', 18, 8, 'Snapdragon 888', 'White', 170, 4, '1080 x 1920', 13, 7, '4K@60FPS', '2021-05-15 20:16:45', '2021-05-15 20:16:45'),
(3, 'Pixel 5', '2', 899, 0, '1621109838018.png', 32, 6, 'Snapdragon 888', 'Red', 150, 6, '1242 x 2688', 20, 11, '2K@120FPS', '2021-05-15 20:17:18', '2021-05-15 20:17:18'),
(4, 'Pixel 4', '2', 699, 0, '1621110016931.png', 128, 8, 'Exynos 2100', 'Other', 150, 4, '750 x 1334', 15, 8, '1080p@120FPS', '2021-05-15 20:20:16', '2021-05-15 20:20:16'),
(5, 'iPhone SE', '1', 599, 0, '1621110055970.png', 256, 4, 'Snapdragon 870', 'Green', 160, 6, '1125 x 2436', 15, 9, '1080p@120FPS', '2021-05-15 20:20:55', '2021-05-15 20:20:55'),
(6, 'Xperia II', '4', 799, 0, '1621110091099.png', 64, 8, 'Kirin 9000', 'Blue', 170, 4, '640 x 1136', 20, 9, '2K@120FPS', '2021-05-15 20:21:31', '2021-05-15 20:21:31'),
(7, 'Samsung Fold II', '3', 1299, 0, '1621110117982.png', 32, 12, 'Snapdragon 888', 'Blue', 170, 5, '1125 x 2436', 15, 7, '1080p@120FPS', '2021-05-15 20:21:57', '2021-05-15 20:21:57'),
(8, 'iPhone 7 Plus', '1', 499, 0, '1621110164837.png', 8, 12, 'Snapdragon 870', 'White', 140, 4, '750 x 1334', 20, 9, '2K@60FPS', '2021-05-15 20:22:44', '2021-05-15 20:22:44'),
(9, 'Xperia Pro', '4', 2199, 0, '1621110196868.png', 32, 4, 'Snapdragon 870', 'Other', 140, 6, '1080 x 1920', 15, 10, '1080p@120FPS', '2021-05-15 20:23:16', '2021-05-15 20:23:16'),
(10, 'Samsung S21', '3', 899, 0, '1621110772585.png', 64, 4, 'Kirin 9000', 'Red', 140, 6, '1080 x 1920', 12, 8, '1080p@60FPS', '2021-05-15 20:32:52', '2021-05-15 20:32:52'),
(11, 'Samsung Flip', '3', 1299, 0, '1621110818125.png', 256, 12, 'A14 Bionic', 'Other', 150, 6, '1125 x 2436', 18, 10, '2K@120FPS', '2021-05-15 20:33:38', '2021-05-15 20:33:38'),
(12, 'Xperia XZ1', '4', 999, 0, '1621110873142.png', 128, 4, 'Exynos 2100', 'White', 170, 4, '1080 x 1920', 18, 5, '2K@120FPS', '2021-05-15 20:34:33', '2021-05-15 20:34:33'),
(13, 'iPhone 12', '1', 899, 0, '1621110908229.png', 128, 6, 'Kirin 9000', 'Green', 140, 4, '750 x 1334', 14, 12, '1080p@120FPS', '2021-05-15 20:35:08', '2021-05-15 20:35:08'),
(14, 'Xperia L4', '4', 399, 0, '1621110925293.png', 32, 6, 'Kirin 9000', 'Black', 150, 6, '1080 x 1920', 19, 6, '1080p@120FPS', '2021-05-15 20:35:25', '2021-05-15 20:35:25');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `birthdate` date NOT NULL,
  `image` varchar(45) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `gender` varchar(45) NOT NULL,
  `password` varchar(250) NOT NULL,
  `admin` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `birthdate`, `image`, `email`, `gender`, `password`, `admin`, `createdAt`, `updatedAt`) VALUES
(1, 'Joseph', 'Herberth', '2000-03-23', '1621108905205.JPG', 'Joseph_bock@hotmail.com', 'male', '$2a$12$BTp3.yx4B7lMe07NxuyC..9vJd4t8Zc3O9Dvkq.9PNkb.DxJlKXZm', 1, '2021-05-15 20:01:45', '2021-05-15 20:01:45'),
(2, 'Billie', 'Eilish', '2004-02-09', '1621109270294.jpg', 'billie@eilish.com', 'female', '$2a$12$LFolmZQVfgHFjUCxoB95LOF9O2uzdlt3VwAF9s4sjQxyQhMp5fFDC', 0, '2021-05-15 20:07:50', '2021-05-15 20:07:50'),
(3, 'Steve', 'Jobs', '1987-01-09', '1621109307060.jpg', 'steve@jobs.com', 'male', '$2a$12$l8fwscvYw5zKFxPnNotWk.CK/FypLrGDf5fOzOgWfuPpCK7m7vz4.', 0, '2021-05-15 20:08:27', '2021-05-15 20:08:27'),
(4, 'Night', 'King', '1900-08-08', '1621109350225.jpg', 'night@king.com', 'male', '$2a$12$cXMit80LwW7U58YgPbF9geug3PsQwcPLDHQjeYSTJttCJJbrNggxS', 0, '2021-05-15 20:09:10', '2021-05-15 20:09:10'),
(5, 'Joana', 'Rebeca', '2001-01-09', NULL, 'joana@r.com', 'female', '$2a$12$iIL2RWppxzpJOx9m96w4FOpXW0SI2D8j0wttH5Nor.Roz9yEtf6f.', 0, '2021-05-15 20:09:39', '2021-05-15 20:09:39'),
(6, 'Mark', 'Gray', '2004-09-08', '1621109453463.jpg', 'Mark@gray.com', 'male', '$2a$12$qQ4rT0gs1j5ugdXVU8Uz4uL5BJBJGT4dFmHORFzRWPeK6fBSOXrcq', 0, '2021-05-15 20:10:53', '2021-05-15 20:10:53'),
(7, 'Mike', 'Wazowski', '2007-10-08', '1621109489940.jpg', 'Mike@w.com', 'male', '$2a$12$I1O5JM81LVObvEpT9RF1m.wDfJ/p2G4NigD8CqtyFqXTnvkRBC9wK', 0, '2021-05-15 20:11:30', '2021-05-15 20:11:30'),
(8, 'Naruto', 'Shippuden', '2001-07-09', '1621109528412.png', 'Naruto@uzumaki.com', 'male', '$2a$12$HwKCgfvhbcELCtygK2Xc2.ETa/5dNsg3bWuMThlpDNEy7iK03rAwK', 0, '2021-05-15 20:12:08', '2021-05-15 20:12:08'),
(9, 'Patricio', 'Estrella', '1998-04-08', '1621109554988.png', 'Pat@star.com', 'male', '$2a$12$vJtaB9UxrIOIGW0V4iNlI.WIgsDunj7rreFGUDTXwGW803aEJnidq', 0, '2021-05-15 20:12:35', '2021-05-15 20:12:35'),
(10, 'Mario', 'Bros', '1989-05-08', '1621109585008.jpg', 'Mario@bros.com', 'male', '$2a$12$13DdShH5tYJcqrI0lBfhU.uEIFme5iTnMJ45Ays6DkHHfXX3T1eSG', 0, '2021-05-15 20:13:05', '2021-05-15 20:13:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `manufacturers`
--
ALTER TABLE `manufacturers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `manufacturers`
--
ALTER TABLE `manufacturers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

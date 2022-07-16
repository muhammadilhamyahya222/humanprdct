-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2022 at 04:12 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `olshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `alamat`
--

CREATE TABLE `alamat` (
  `id_pengiriman` int(50) NOT NULL,
  `id_user` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `receiver` varchar(255) NOT NULL,
  `pos` int(50) NOT NULL,
  `kecamatan` varchar(255) NOT NULL,
  `kota` varchar(255) NOT NULL,
  `jalan` varchar(255) NOT NULL,
  `rt` int(50) NOT NULL,
  `rw` int(50) NOT NULL,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `alamat`
--

INSERT INTO `alamat` (`id_pengiriman`, `id_user`, `title`, `receiver`, `pos`, `kecamatan`, `kota`, `jalan`, `rt`, `rw`, `update_at`, `created_at`) VALUES
(1, 28, '', 'Bapak Fahri', 7687, 'Kecap', 'Bango', 'Jl. Kecap', 3, 4, '2020-03-09 05:54:44', '2020-03-05 17:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `detail_order`
--

CREATE TABLE `detail_order` (
  `id_order` int(10) NOT NULL,
  `id_product` int(5) NOT NULL,
  `quantity` int(10) NOT NULL,
  `subtotal` int(100) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `detail_order`
--

INSERT INTO `detail_order` (`id_order`, `id_product`, `quantity`, `subtotal`, `updated_at`, `created_at`) VALUES
(1, 18, 1, 0, '2020-03-23 11:49:09', '2020-03-23 11:49:09');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_alamat` int(50) NOT NULL,
  `total` int(100) NOT NULL,
  `bukti` varchar(100) DEFAULT NULL,
  `status` varchar(100) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `id_user`, `id_alamat`, `total`, `bukti`, `status`, `updated_at`, `created_at`) VALUES
(1, 28, 1, 10000, NULL, 'dipesan', '2020-03-10 07:03:29', '2020-03-10 07:03:29');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `stock` int(3) NOT NULL,
  `price` int(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `stock`, `price`, `description`, `image`, `created_at`, `updated_at`) VALUES
(15, 'Jordan 1 Retro High Dior', 10, 2000, 'Edisi Nike Air Jordan 1 Kolaborasi dengan Dior', 'jordanxdior.jpg', '2020-02-07 07:27:03', '2020-02-07 07:27:03'),
(16, 'Sepatu Compass Oldblue Co.', 10, 51, 'Sepatu Compass untuk darahkubiru', 'compasxdarahkubiru.jpg', '2020-02-07 06:52:30', '2020-02-07 06:52:30'),
(17, 'Adidas Yeezy Boost 350 V2 Yecheil', 10, 220, 'Adidas Yeezy Boost 350 V2 Yecheil', 'yeezy.jpg', '2020-02-11 07:04:03', '2020-02-11 07:04:03'),
(18, 'Converse Pro Leather OG', 10, 90, 'Converse Pro Leather OG', 'cvpl.jpg', '2020-02-11 06:52:42', '2020-02-11 06:52:42'),
(19, 'Nike Air Force 1 Shadow', 10, 110, 'Nike Air Force 1 Shadow', 'Nike-Air-Force-1-Low-Shadow-CU3012-661-2.jpg', '2020-02-11 07:00:24', '2020-02-11 07:00:24'),
(20, 'Yeezy Boost 700 “Triple Black”', 10, 220, 'adidas Yeezy Boost 700 MNVN “Triple Black”', '3.jpg', '2020-02-11 06:57:10', '2020-02-11 06:57:10');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `fullname` varchar(200) DEFAULT NULL,
  `username` varchar(200) NOT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(225) NOT NULL,
  `nohp` varchar(20) DEFAULT NULL,
  `tmp_lahir` varchar(20) DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `role` varchar(50) NOT NULL,
  `image` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `fullname`, `username`, `alamat`, `email`, `password`, `nohp`, `tmp_lahir`, `tgl_lahir`, `gender`, `role`, `image`, `created_at`, `updated_at`) VALUES
(22, 'Mark Zuckerberg', 'Mark', 'Jl. California', 'mark@fb.com', 'eyJpdiI6IjlJanBkb1pwQ2tGK0NIaEZPcWFQakE9PSIsInZhbHVlIjoiclJnSGV5bmJVYWROZGFIVTFDNW9Gdz09IiwibWFjIjoiN2Y1MGU4M2Q5NmMyNWViODg4YzM0MTVkNzg2NWU2MTg4MmJlMjBmOTkzMDM1OWUwN2YyOGEzZjg2YTZjOGFjNSJ9', NULL, 'New York', '1984-05-14', 'Laki', 'Admin', 'mark.jpg', '2020-03-02 06:21:31', '2020-02-25 07:03:26'),
(28, 'Fahri Skroepp', 'Skroep', 'Dekat', 'skroep@gmail.com', 'eyJpdiI6ImtIQ3IyU0t6VVFDZW9TbHRubGNyamc9PSIsInZhbHVlIjoiUElhUXZ5NUluMjhtSGgxbGwrVE5Idz09IiwibWFjIjoiNmZiZjQ4NDc1YTQzNDNkMzM1YTI0MDdjMmM4OTFiODE0NzA1NTE2MWQwZmMwMjg1M2E0MzQ5NmEyMmMzYWU0YiJ9', '1231231231', 'Wakanda', '2001-03-24', 'Laki', 'User', 'skroep.jpg', '2020-03-06 06:58:56', '2020-03-06 06:58:56'),
(29, NULL, 'Garox', NULL, 'garox@gmail.com', 'eyJpdiI6Im51ZHlFaWhZZVBPaUZWYVwvTElXclZRPT0iLCJ2YWx1ZSI6IlpZMDBaSnpUXC9zdVhKeXhYMVltSnVBPT0iLCJtYWMiOiIzMTNmMmY3MDRkZTc1YzEyOGU2ZTM4ZWI3YTFmYzE4NzZmZDAyYTU3YTRiZWY2YzBhZjYwOThlMzkzMDkyMjcyIn0=', NULL, NULL, NULL, NULL, 'User', NULL, '2020-04-18 05:03:42', '2020-04-18 05:03:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alamat`
--
ALTER TABLE `alamat`
  ADD PRIMARY KEY (`id_pengiriman`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `detail_order`
--
ALTER TABLE `detail_order`
  ADD KEY `id_order` (`id_order`),
  ADD KEY `id_product` (`id_product`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_alamat` (`id_alamat`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alamat`
--
ALTER TABLE `alamat`
  MODIFY `id_pengiriman` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alamat`
--
ALTER TABLE `alamat`
  ADD CONSTRAINT `alamat_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `detail_order`
--
ALTER TABLE `detail_order`
  ADD CONSTRAINT `detail_order_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_order_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`id_alamat`) REFERENCES `alamat` (`id_pengiriman`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

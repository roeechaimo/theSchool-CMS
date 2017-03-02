-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 16, 2016 at 05:31 PM
-- Server version: 5.7.11
-- PHP Version: 5.6.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `theschool`
--

-- --------------------------------------------------------

--
-- Table structure for table `ci_sessions`
--

CREATE TABLE `ci_sessions` (
  `id` varchar(40) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `timestamp` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `data` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ci_sessions`
--

INSERT INTO `ci_sessions` (`id`, `ip_address`, `timestamp`, `data`) VALUES
('18f8b1fe1845fa24bf48177d5b876f936f74c9be', '::1', 1479316782, 0x5f5f63695f6c6173745f726567656e65726174657c693a313437393331363439393b6c6f676765645f696e7c623a313b757365724f626a7c4f3a383a22737464436c617373223a383a7b733a343a22755f6964223b733a313a2234223b733a363a22755f6e616d65223b733a343a22526f6565223b733a363a22755f726f6c65223b733a353a226f776e6572223b733a373a22755f70686f6e65223b733a31313a223035302d32323232323132223b733a373a22755f656d61696c223b733a31363a22726f656540686f746d61696c2e636f6d223b733a363a22755f70617373223b733a34303a2261643035646435313464663230343039363130393732653639616135366638366337646665623165223b733a373a22755f746f6b656e223b4e3b733a31343a22755f726567697374726174696f6e223b733a31393a22323031362d31302d30342030393a35333a3233223b7d);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `c_id` int(11) NOT NULL,
  `c_name` varchar(120) NOT NULL,
  `c_description` text NOT NULL,
  `c_image` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`c_id`, `c_name`, `c_description`, `c_image`) VALUES
(1, 'Mass Destruction', 'In this course you will learn how to destroy things', ''),
(4, 'How To Build', 'In this course you will learn how to build', ''),
(6, 'Blalaology', 'In this course you will learn how to bla bla', ''),
(7, 'Painting Lamps', 'In this course you will learn how to paint lamps', ''),
(22, 'Just a course', 'Just another course..', '');

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

CREATE TABLE `enrollments` (
  `e_id` int(11) NOT NULL,
  `c_id` int(11) NOT NULL,
  `s_id` int(11) NOT NULL,
  `e_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `enrollments`
--

INSERT INTO `enrollments` (`e_id`, `c_id`, `s_id`, `e_date`) VALUES
(200, 7, 4, '2016-10-28 16:33:18'),
(201, 6, 4, '2016-10-28 16:33:18'),
(202, 1, 4, '2016-10-28 16:33:18'),
(259, 4, 54, '2016-10-28 17:57:22'),
(260, 6, 54, '2016-10-28 17:57:22'),
(261, 1, 54, '2016-10-28 17:57:22'),
(285, 1, 50, '2016-10-28 18:06:11'),
(286, 6, 50, '2016-10-28 18:06:11'),
(287, 7, 50, '2016-10-28 18:06:11'),
(288, 1, 3, '2016-10-28 18:06:18'),
(289, 7, 3, '2016-10-28 18:06:18'),
(290, 4, 53, '2016-10-28 18:08:20'),
(291, 1, 53, '2016-10-28 18:08:20'),
(292, 6, 53, '2016-10-28 18:08:20'),
(342, 1, 1, '2016-11-11 15:00:35'),
(343, 22, 1, '2016-11-11 15:00:35'),
(344, 4, 1, '2016-11-11 15:00:35'),
(345, 1, 55, '2016-11-16 17:24:05'),
(346, 4, 55, '2016-11-16 17:24:05'),
(347, 7, 55, '2016-11-16 17:24:06'),
(348, 22, 55, '2016-11-16 17:24:06');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `s_id` int(11) NOT NULL,
  `s_name` varchar(64) NOT NULL,
  `s_phone` varchar(20) NOT NULL,
  `s_email` varchar(255) NOT NULL,
  `s_image` varchar(250) NOT NULL,
  `s_registration` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`s_id`, `s_name`, `s_phone`, `s_email`, `s_image`, `s_registration`) VALUES
(1, 'Sason', '050-2222220', 'sason@hotmail.com', '', '2016-09-29 17:20:15'),
(3, 'Kuku', '050-2222225', 'kuku@hotmail.com', '', '2016-09-29 17:23:23'),
(4, 'Shoshi', '050-2222224', 'shoshi@hotmail.com', '', '2016-10-03 14:19:22'),
(50, 'Fafa', '050-8965476', 'sdg@af.com', '', '2016-10-21 13:29:03'),
(53, 'Kutz', '050-8889995', 'kutzi@hotmail.com', '', '2016-10-22 14:26:07'),
(54, 'Pupa', '050-2316548', 'pupa@hotmail.com', '', '2016-10-22 14:28:15'),
(55, 'Newbi', '050-8976524', 'newbi@hotmail.com', '', '2016-10-22 14:29:55');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `u_id` int(11) NOT NULL,
  `u_name` varchar(45) NOT NULL,
  `u_role` varchar(30) NOT NULL,
  `u_phone` varchar(20) NOT NULL,
  `u_email` varchar(255) NOT NULL,
  `u_pass` varchar(64) NOT NULL,
  `u_registration` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `u_name`, `u_role`, `u_phone`, `u_email`, `u_pass`, `u_registration`) VALUES
(4, 'Roee', 'owner', '050-2222212', 'roee@hotmail.com', 'ad05dd514df20409610972e69aa56f86c7dfeb1e', '2016-10-04 06:53:23'),
(12, 'Shoni', 'sales', '050-8352145', 'shoni@hotmail.com', 'c2993ad6fca49092f43f9ddca145c88cf3e3ef52', '2016-10-22 14:29:09'),
(14, 'Boss 2', 'manager', '050-8882226', 'boss2@hotmail.com', '701fbb7d7a333be3a05e7f4d69b183b3dba3ef4e', '2016-10-24 14:35:29'),
(15, 'Ror', 'sales', '050-8920024', 'ror@hotmail.com', 'ad05dd514df20409610972e69aa56f86c7dfeb1e', '2016-11-04 14:46:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ci_sessions`
--
ALTER TABLE `ci_sessions`
  ADD KEY `timestamp` (`timestamp`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`c_id`),
  ADD UNIQUE KEY `c_name` (`c_name`);

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`e_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`s_id`),
  ADD UNIQUE KEY `s_email` (`s_email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`),
  ADD UNIQUE KEY `u_email` (`u_email`),
  ADD KEY `u_pass` (`u_pass`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `e_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=351;
--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `s_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

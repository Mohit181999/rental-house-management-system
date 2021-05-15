-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 15, 2021 at 05:14 AM
-- Server version: 8.0.23
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rhms`
--

-- --------------------------------------------------------

--
-- Table structure for table `house`
--

CREATE TABLE `house` (
  `hid` int NOT NULL,
  `uid` int NOT NULL,
  `Type` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `rent` int NOT NULL,
  `file` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `housebooking`
--

CREATE TABLE `housebooking` (
  `bid` int NOT NULL,
  `hid` int NOT NULL,
  `Type` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `rent` int DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `uid` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `housebooking`
--

INSERT INTO `housebooking` (`bid`, `hid`, `Type`, `Address`, `rent`, `file`, `uid`) VALUES
(11, 3, 'Appartment', 'Rohini sec 11', 10000, '1620286384760-appartment.jfif', 34),
(12, 3, 'Appartment', 'Rohini sec 11', 10000, '1620286384760-appartment.jfif', 36);

-- --------------------------------------------------------

--
-- Table structure for table `owner`
--

CREATE TABLE `owner` (
  `uid` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  `email` varchar(320) NOT NULL,
  `Address` varchar(320) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `owner`
--

INSERT INTO `owner` (`uid`, `Name`, `email`, `Address`) VALUES
(33, 'Mohit', 'mohit21@gmail.com', 'new delhi'),
(35, '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `rid` int NOT NULL,
  `UserName` varchar(255) NOT NULL,
  `Text` varchar(255) NOT NULL,
  `hid` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`rid`, `UserName`, `Text`, `hid`) VALUES
(4, 'Punit', 'nice', 3),
(5, 'Harsh', 'very comfortable', 3);

-- --------------------------------------------------------

--
-- Table structure for table `tenant`
--

CREATE TABLE `tenant` (
  `uid` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  `email` varchar(320) NOT NULL,
  `Address` varchar(320) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tenant`
--

INSERT INTO `tenant` (`uid`, `Name`, `email`, `Address`) VALUES
(34, 'Punit', 'punit23@gmail.com', 'Paschim Vihar Paschimpuri, New Delhi, 110063, Delhi, India'),
(36, 'Harsh', 'harsh319@gmail.com', 'dfsrg');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` int NOT NULL,
  `email` varchar(320) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `email`, `password`, `role`) VALUES
(33, 'mohit21@gmail.com', '1q2w3e4r', 'Owner'),
(34, 'punit23@gmail.com', '1q2w3e4r', 'Tenet'),
(35, '', '', 'Owner'),
(36, 'harsh319@gmail.com', '1q2w3e4r', 'Tenet');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `house`
--
ALTER TABLE `house`
  ADD PRIMARY KEY (`hid`);

--
-- Indexes for table `housebooking`
--
ALTER TABLE `housebooking`
  ADD PRIMARY KEY (`bid`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`rid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `house`
--
ALTER TABLE `house`
  MODIFY `hid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `housebooking`
--
ALTER TABLE `housebooking`
  MODIFY `bid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `rid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

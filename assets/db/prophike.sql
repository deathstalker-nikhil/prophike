-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 22, 2015 at 12:55 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `prophike`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(300) NOT NULL,
  `password` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin@prophike.com', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `builders`
--

CREATE TABLE IF NOT EXISTS `builders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(1000) NOT NULL,
  `description` varchar(5000) NOT NULL,
  `logo_link` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE IF NOT EXISTS `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(500) NOT NULL,
  `areas` tinytext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `city` (`city`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `city`, `areas`) VALUES
(9, '1', '["1","2"]'),
(10, '2', '["2","3","4"]'),
(11, '3', '["3"]'),
(12, '4', '["4"]'),
(14, '6', '["6"]'),
(15, '7', '["7"]'),
(17, '9', '["9","4","5"]'),
(21, '13', '["13"]');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `min_price` int(11) NOT NULL,
  `max_price` int(11) NOT NULL,
  `property_type` varchar(100) NOT NULL,
  `location_id` int(11) NOT NULL,
  `builder_id` int(11) NOT NULL,
  `possession` varchar(100) NOT NULL,
  `payment_plan` varchar(500) NOT NULL,
  `address` varchar(1000) NOT NULL,
  `data` text NOT NULL,
  `is_hot_project` tinyint(1) NOT NULL DEFAULT '0',
  `is_best_investment_project` tinyint(1) NOT NULL DEFAULT '0',
  `pdf_link` int(11) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_locations` (`location_id`),
  KEY `fk_builders` (`builder_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `unit_details`
--

CREATE TABLE IF NOT EXISTS `unit_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `type` varchar(500) NOT NULL,
  `name` varchar(1000) NOT NULL,
  `area` varchar(50) NOT NULL,
  `price` varchar(12) NOT NULL,
  `price_per_unit` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_projects` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `fk_builders` FOREIGN KEY (`builder_id`) REFERENCES `builders` (`id`),
  ADD CONSTRAINT `fk_locations` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`);

--
-- Constraints for table `unit_details`
--
ALTER TABLE `unit_details`
  ADD CONSTRAINT `fk_projects` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

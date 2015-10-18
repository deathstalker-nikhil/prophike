-- phpMyAdmin SQL Dump
-- version 4.0.10.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 17, 2015 at 01:42 AM
-- Server version: 5.5.42-cll-lve
-- PHP Version: 5.4.31

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(2, 'admin@prophike.com', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `builders`
--

CREATE TABLE IF NOT EXISTS `builders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `builder_name` varchar(1000) NOT NULL,
  `builder_description` varchar(5000) NOT NULL,
  `logo_link` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `builders`
--

INSERT INTO `builders` (`id`, `builder_name`, `builder_description`, `logo_link`) VALUES
(7, 'Supertech', 'Supertech Limited, India''s leading real estate developer was founded 25 years back in National Capital Region and since then has been scaling new heights by each passing day. The company has set new trends of architectural finesse in the contemporary global scenario touching the horizons of excellence. Established under the dynamic leadership of Mr. R. K. Arora, Supertech has led to creation of various landmark projects. The leaders and skilled professionals of the company have worked towards launching out of the league projects and take the real estate sector to the next level. Supertech is the pioneer to launch the concept of mixed-use development in India and to come up with high rise constructions in North India.', '{"logo":["assets/uploads/builders/logo_home.png"],"type":"builder"}'),
(8, 'Amrapali', 'The beginning of the new millennium witnessed tremendous developments taking place in India that unleashed the latent entrepreneurial energy in various enterprises including construction. One such development was the emergence of the Amrapali Group that started off some 10 years ago under the able guidance of its Chairman & Managing Director Dr. Anil Kumar Sharma, a proud NIT & IIT alumnus. This group is now leading the ranks in the real estate domain and that too in a very short span of time. Today the group enjoys a pan-India presence and has already delivered over 25 world-class projects. The group also has more than 50 projects comprising residential, commercial and IT parks, in the pipeline. Amrapali’s projects delineate the skyline of Noida, the satellite city of Delhi, and other cities such as Indore, Raipur, Jaipur, Patna, Udaipur, Lucknow etc. It is our privilege to have the cricket maestro M.S.Dhoni as our brand ambassador.', '');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `user_name` varchar(500) NOT NULL,
  `user_phone` bigint(10) NOT NULL,
  `user_email` varchar(500) NOT NULL,
  `user_comment` text NOT NULL,
  `is_approved` tinyint(1) NOT NULL DEFAULT '0',
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_project_comments` (`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `city`, `areas`) VALUES
(6, 'Noida', '["Sector-74"]'),
(7, 'Greater Noida (West)', '["Tech Zone-4"]');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `slug` varchar(700) NOT NULL,
  `min_price` int(11) NOT NULL,
  `max_price` int(11) NOT NULL,
  `property_type` varchar(100) NOT NULL,
  `city` varchar(50) NOT NULL,
  `area` varchar(100) NOT NULL,
  `builder_id` int(11) NOT NULL,
  `possession` varchar(100) NOT NULL,
  `address` varchar(1000) NOT NULL,
  `data` text NOT NULL,
  `media` text NOT NULL,
  `is_hot_project` tinyint(1) NOT NULL DEFAULT '0',
  `is_best_investment_project` tinyint(1) NOT NULL DEFAULT '0',
  `is_project_of_the_day` tinyint(1) NOT NULL DEFAULT '0',
  `pdf_link` varchar(1000) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `fk_builders` (`builder_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`project_id`, `name`, `slug`, `min_price`, `max_price`, `property_type`, `city`, `area`, `builder_id`, `possession`, `address`, `data`, `media`, `is_hot_project`, `is_best_investment_project`, `is_project_of_the_day`, `pdf_link`, `created_on`) VALUES
(12, 'Supertech Capetown', 'supertech-capetown', 5170000, 13300000, 'Apartments', 'Noida', 'Sector-74', 7, '0', 'Sector-74, Noida', '{"features":"<p><img alt=\\"living room\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_living.jpg\\" \\/><\\/p>\\n\\n<p>Living Room<\\/p>\\n\\n<p>Floor: Vitrified Tiles<\\/p>\\n\\n<p>External Door and Window: Powder Coated Aluminum With Double Rebate<\\/p>\\n\\n<p>Electrical Fittings: Sheet and Switches<\\/p>\\n\\n<p>Walls: Oil Bound Distemper<\\/p>\\n\\n<p>Internal Door: Flush Shutter with Wooden Frame<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n\\n<p>Ceilings: Oil Bound Distemper<\\/p>\\n\\n<p><img alt=\\"dining room\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_dining.jpg\\" \\/><\\/p>\\n\\n<p>Dining<\\/p>\\n\\n<p>Floor: Vitrified Tiles<\\/p>\\n\\n<p>External Door and Window: Powder Coated Aluminum With Double Rebate<\\/p>\\n\\n<p>Electrical Fittings: Sheet and Switches<\\/p>\\n\\n<p>Walls: Oil Bound Distemper<\\/p>\\n\\n<p>Internal Door: Flush Shutter with Wooden Frame<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n\\n<p>Ceilings: Oil Bound Distemper<\\/p>\\n\\n<p><img alt=\\"bedroom\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_bedroom.jpg\\" \\/><\\/p>\\n\\n<p>Bedroom<\\/p>\\n\\n<p>Floor: Vitrified Tiles<\\/p>\\n\\n<p>External Door and Window: Powder Coated Aluminum With Double Rebate<\\/p>\\n\\n<p>Electrical Fittings: Sheet and Switches<\\/p>\\n\\n<p>Walls: Oil Bound Distemper<\\/p>\\n\\n<p>Internal Door: Flush Shutter with Wooden Frame<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n\\n<p>Ceilings: Oil Bound Distemper<\\/p>\\n\\n<p><img alt=\\"master bedrom\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_mbedroom.jpg\\" \\/><\\/p>\\n\\n<p>Master Bedroom<\\/p>\\n\\n<p>Floor: Vitrified Tiles<\\/p>\\n\\n<p>External Door and Window: Powder Coated Aluminum With Double Rebate<\\/p>\\n\\n<p>Electrical Fittings: Sheet and Switches<\\/p>\\n\\n<p>Walls: Oil Bound Distemper<\\/p>\\n\\n<p>Internal Door: Flush Shutter with Wooden Frame<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n\\n<p>Ceilings: Oil Bound Distemper<\\/p>\\n\\n<p><img alt=\\"dressing room\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_dressing.jpg\\" \\/><\\/p>\\n\\n<p>Dressing Room<\\/p>\\n\\n<p>Floor: Vitrified Tiles<\\/p>\\n\\n<p>External Door and Window: Powder Coated Aluminum With Double Rebate<\\/p>\\n\\n<p>Electrical Fittings: Sheet and Switches<\\/p>\\n\\n<p>Walls: Oil Bound Distemper<\\/p>\\n\\n<p>Internal Door: Flush Shutter with Wooden Frame<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n\\n<p>Ceilings: Oil Bound Distemper<\\/p>\\n\\n<p><img alt=\\"servant room\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_servantRoom.jpg\\" \\/><\\/p>\\n\\n<p>Servant Room<\\/p>\\n\\n<p>Floor: Ceramic Tiles<\\/p>\\n\\n<p>External Door and Window: Powder Coated Aluminum With Double Rebate<\\/p>\\n\\n<p>Electrical Fittings: Sheet and Switches<\\/p>\\n\\n<p>Walls: Oil Bound Distemper<\\/p>\\n\\n<p>Internal Door: Flush Shutter with Wooden Frame.<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n\\n<p>Ceilings: Oil Bound Distemper<\\/p>\\n\\n<p>\\u00a0<\\/p>\\n\\n<p><img alt=\\"kitchen\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_kitchen.jpg\\" \\/><\\/p>\\n\\n<p>Kitchen<\\/p>\\n\\n<p>Floor: Vitrified Tiles<\\/p>\\n\\n<p>External Door and Window: Powder Coated Aluminum With Double Rebate<\\/p>\\n\\n<p>Electrical Fittings: Sheet and Switches<\\/p>\\n\\n<p>Walls: Ceramic tiles of 7\\" heights<\\/p>\\n\\n<p>Fittings: Stain steel Sink with C.P.Fittings Full Modular Kitchen with RO System<\\/p>\\n\\n<p>Internal Door: Open<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n\\n<p>Ceilings: Oil Bound Distemper<\\/p>\\n\\n<p><img alt=\\"toilets\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_toilets.jpg\\" \\/><\\/p>\\n\\n<p>Toilet<\\/p>\\n\\n<p>Floor: Ceramic Tiles<\\/p>\\n\\n<p>Electrical Fittings: Sheet and Switches<\\/p>\\n\\n<p>Walls: Ceramic tiles of 7\\" heights<\\/p>\\n\\n<p>Fittings: Washbasin WC & C.P. Fittings<\\/p>\\n\\n<p>Internal Door: Flush Shutter<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n\\n<p>Ceilings: Flase Ceiling<\\/p>\\n\\n<p><img alt=\\"balcony\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_balcony.jpg\\" \\/><\\/p>\\n\\n<p>Balconies<\\/p>\\n\\n<p>Floor: Ceramic Tiles<\\/p>\\n\\n<p>Electrical Fittings: Sheet and Switches<\\/p>\\n\\n<p>Walls: Oil Bound Distemper<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n\\n<p>Ceilings: Permanent paint Finish<\\/p>\\n\\n<p><img alt=\\"lift\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_lift.jpg\\" \\/><\\/p>\\n\\n<p>Lift<\\/p>\\n\\n<p>Floor: PVC Flooring<\\/p>\\n\\n<p>Electrical Fittings: Sheet and Switches<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n\\n<p><img alt=\\"doors\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_doors.jpg\\" \\/><\\/p>\\n\\n<p>Lobbies\\/Corridor<\\/p>\\n\\n<p>Floor: Kota Stone\\/Veritified Tiles<\\/p>\\n\\n<p>Walls: Oil Bound Distemper<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n\\n<p><img alt=\\"exterior room\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_ext.jpg\\" \\/><\\/p>\\n\\n<p>Exterior Room<\\/p>\\n\\n<p>Walls: Texture Paint<\\/p>\\n\\n<p>Internal Door: Flush Shutter with Wooden Frame<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n","google_map_code":"https:\\/\\/www.google.co.in\\/maps\\/place\\/Supertech+Capetown\\/@28.575294,77.391295,476m\\/data=!3m2!1e3!4b1!4m2!3m1!1s0x390ce576e6cbffff:0xc8a40e38e7de8d16","overview":"<p>A world-class leisure and residential community spread out over approx 50 sprawling acres, CapeTown has been envisioned as a complete, self-contained campus area built around the best of the facilities where every home is designed to the most demanding standards.<\\/p>\\n\\n<p>8 Variants of well planned (2,3,4 bedroom) apartments and penthouse towers, Luxury Villas spread over a green area, CapeTown from Supertech is one of the best housing developments in the city.&#39;<\\/p>\\n\\n<p>CapeTown will comprise of upscale, well appointed apartments with modern conveniences such as a clubhouse, jogging track, swimming pool and more.<\\/p>\\n","payment_plan":"<p>[A] Down Payment Plan<\\/p>\\n\\n<table border=\\"0\\" cellpadding=\\"0\\" cellspacing=\\"0\\" [removed]=\\"width:100%\\">\\n <tbody>\\n  <tr>\\n   <td>Particulars<\\/td>\\n   <td>Percentage<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>At the time of Booking<\\/td>\\n   <td>10%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>Within 30 days of Booking<\\/td>\\n   <td>15%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>Within 60 days of Booking<\\/td>\\n   <td>15%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Offer of Possession<\\/td>\\n   <td>60%<\\/td>\\n  <\\/tr>\\n <\\/tbody>\\n<\\/table>\\n\\n<p>L.R. = Lease Rent<br \\/>\\nC.P. = Car Parking<br \\/>\\nC.M. = Club Membership<br \\/>\\nI.F.M.S. = Interest Free Maintenance Security<\\/p>\\n\\n<p>[C] TERMS AND CONDITIONS<\\/p>\\n\\n<ul>\\n <li>Price list as on date of booking shall be applicable.<\\/li>\\n <li>PLCs if any shall be charged along with installations towards basic cost.<\\/li>\\n <li>Cheques\\/Bank Drafts to be issued in favor of \\"SUPERTECH LIMITED A\\/C\\" payable at New Delhi. Outstation cheques shall not be accepted.<\\/li>\\n <li>Service Tax, VAT & Other government levies are extra, as applicable.<\\/li>\\n <li>Registration, Stamp Duty and misc. charges shall be payable at the time of Offer of Possession.<\\/li>\\n <li>Super Area includes the covered area plus the proportionate area under Common Corridor, Passages, Staircases, Mumties, Projections, Water Tanks, Lift Wells, etc.<\\/li>\\n <li>The term and condition of sale stated herein are indicative and are subject to detailed terms and conditions in the \\u2018Agreement to Sell\\u2019\\/\\u2019Flat Buyer\\u2019s Agreement\\u2019 and are subject to change at sole discretion of the company.<\\/li>\\n <li>All building plans, layouts, specifications are subject to change and modifications as decided by the company, architect or any other competent authority.<\\/li>\\n <li>Timely payments of the installments are the essence of the Booking.<\\/li>\\n <li>This price list supercedes all previous price lists.<\\/li>\\n<\\/ul>\\n","price_list":"<p>[A] Down Payment Plan<\\/p>\\n\\n<table border=\\"0\\" cellpadding=\\"0\\" cellspacing=\\"0\\" [removed]=\\"width:100%\\">\\n <tbody>\\n  <tr>\\n   <td rowspan=\\"2\\">Accommodation Type\\u00a0<\\/td>\\n   <td colspan=\\"2\\">Unit Size<\\/td>\\n   <td colspan=\\"2\\">Basic Sale Price in Rs.\\u00a0<\\/td>\\n   <td rowspan=\\"2\\">Total Price in Rs.\\u00a0<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>in sq.ft.<\\/td>\\n   <td>in sq.mt.\\u00a0<\\/td>\\n   <td>per sq.ft.<\\/td>\\n   <td>per sq.mt.\\u00a0<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>2 BHK\\u00a0<\\/td>\\n   <td>930<\\/td>\\n   <td>86.40<\\/td>\\n   <td>5850<\\/td>\\n   <td>62969<\\/td>\\n   <td>5440500<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>2 BHK\\u00a0<\\/td>\\n   <td>1082<\\/td>\\n   <td>100.52<\\/td>\\n   <td>5850<\\/td>\\n   <td>62969<\\/td>\\n   <td>6329700<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>2 BHK + Study<\\/td>\\n   <td>1150<\\/td>\\n   <td>106.84<\\/td>\\n   <td>5850<\\/td>\\n   <td>62969<\\/td>\\n   <td>6727500<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>3 BHK<\\/td>\\n   <td>1295<\\/td>\\n   <td>120.31<\\/td>\\n   <td>5850<\\/td>\\n   <td>62969<\\/td>\\n   <td>7575750<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>3 BHK<\\/td>\\n   <td>1505<\\/td>\\n   <td>139.82<\\/td>\\n   <td>5850<\\/td>\\n   <td>62969<\\/td>\\n   <td>8804250<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>3 BHK\\u00a0<\\/td>\\n   <td>1625<\\/td>\\n   <td>150.97<\\/td>\\n   <td>5850<\\/td>\\n   <td>62969<\\/td>\\n   <td>9506250<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>3 BHK + Study<\\/td>\\n   <td>1945<\\/td>\\n   <td>180.70<\\/td>\\n   <td>5850<\\/td>\\n   <td>62969<\\/td>\\n   <td>11378250<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>4 BHK + SQ<\\/td>\\n   <td>2385<\\/td>\\n   <td>221.57<\\/td>\\n   <td>5850<\\/td>\\n   <td>62969<\\/td>\\n   <td>13952250<\\/td>\\n  <\\/tr>\\n <\\/tbody>\\n<\\/table>\\n\\n<p>[C] Other Charges (One Time)<\\/p>\\n\\n<table border=\\"0\\" cellpadding=\\"0\\" cellspacing=\\"0\\" [removed]=\\"width:100%\\">\\n <tbody>\\n  <tr>\\n   <td>Location<\\/td>\\n   <td>Cost\\/sq.ft.<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>Ground Floor<\\/td>\\n   <td>Rs. 250<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>1st to 3rd Floor<\\/td>\\n   <td>Rs. 200<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>4th to 6th Floor<\\/td>\\n   <td>Rs. 150<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>7th to 9th Floor<\\/td>\\n   <td>Rs. 100<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>10 to 11th Floor<\\/td>\\n   <td>Rs. 50<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>Corner Flat<\\/td>\\n   <td>Rs. 50<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>Park Facing<\\/td>\\n   <td>Rs. 50<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>Road Facing<\\/td>\\n   <td>Rs. 50<\\/td>\\n  <\\/tr>\\n <\\/tbody>\\n<\\/table>\\n","specifications":["23","22","21","20","19","17","15","14"]}', '{"property":{"const_update":["assets/uploads/projects/construction_updates/Cons_Updt1.jpg","assets/uploads/projects/construction_updates/Cons_Updt2.jpg"],"cover":["assets/uploads/projects/project_cover_images/Gallery1.jpg"],"thumb":["assets/uploads/projects/project_thumbnails/Gallery1.jpg"],"gallery":["assets/uploads/projects/gallery/Gallery2.jpg"]},"type":"property"}', 1, 1, 1, '', '2015-09-20 16:08:14');

-- --------------------------------------------------------

--
-- Table structure for table `specifications`
--

CREATE TABLE IF NOT EXISTS `specifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `icon_path` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Dumping data for table `specifications`
--

INSERT INTO `specifications` (`id`, `name`, `icon_path`) VALUES
(7, 'CCTV Surveillance', '{"logo":["assets/uploads/specifications/cctv.jpg"],"type":"specification"}'),
(8, '24x7 Power Backup', '{"logo":["assets/uploads/specifications/24x7power-backup.jpg"],"type":"specification"}'),
(9, 'Clubhouse', '{"logo":["assets/uploads/specifications/clubhouse.jpg"],"type":"specification"}'),
(10, 'Coffee Bar', '{"logo":["assets/uploads/specifications/coffee-bar.jpg"],"type":"specification"}'),
(11, 'Gymnasium', '{"logo":["assets/uploads/specifications/gymnasium.jpg"],"type":"specification"}'),
(12, 'Hi-Speed Elevators', '{"logo":["assets/uploads/specifications/hi-speed-elevators.jpg"],"type":"specification"}'),
(13, 'Jogging Track', '{"logo":["assets/uploads/specifications/jogging-track.jpg"],"type":"specification"}'),
(14, 'Metro Connectivity', '{"logo":["assets/uploads/specifications/metro.png"],"type":"specification"}'),
(15, 'Green Landscape', '{"logo":["assets/uploads/specifications/open-landscape.jpg"],"type":"specification"}'),
(16, 'Park', '{"logo":["assets/uploads/specifications/park.png"],"type":"specification"}'),
(17, 'Parking', '{"logo":["assets/uploads/specifications/parking.jpg"],"type":"specification"}'),
(18, 'Party Lawn', '{"logo":["assets/uploads/specifications/party-lawn.jpg"],"type":"specification"}'),
(19, 'Kids Play Area', '{"logo":["assets/uploads/specifications/play-area.jpg"],"type":"specification"}'),
(20, 'Swimming Pool', '{"logo":["assets/uploads/specifications/swimming-pool.jpg"],"type":"specification"}'),
(21, 'Vaastu Friendly Design', '{"logo":["assets/uploads/specifications/vastu.png"],"type":"specification"}'),
(22, 'Amphitheatre', '{"logo":["assets/uploads/specifications/Amphitheatre.png"],"type":"specification"}'),
(23, 'Tennis Court', '{"logo":["assets/uploads/specifications/tennis-court.png"],"type":"specification"}');

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE IF NOT EXISTS `units` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unit_name` varchar(500) NOT NULL,
  `unit_type` varchar(500) NOT NULL,
  `unit_price` float NOT NULL,
  `unit_price_per_area` float NOT NULL,
  `unit_area` float NOT NULL,
  `unit_details` text NOT NULL,
  `image_path` varchar(500) NOT NULL,
  `p_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_projectUnits` (`p_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `unit_name`, `unit_type`, `unit_price`, `unit_price_per_area`, `unit_area`, `unit_details`, `image_path`, `p_id`) VALUES
(20, '2 BHK TYPE A', '2 BHK', 5168940, 5558000, 930, '', '{"img":["assets/uploads/projects/units/fp-big1.jpg"],"type":"unit"}', 12),
(21, '3 BHK TYPE A', '3 BHK', 7197610, 5558, 1295, '', '{"img":["assets/uploads/projects/units/fp-big4.jpg"],"type":"unit"}', 12);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_project_comments` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE;

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `fk_builders` FOREIGN KEY (`builder_id`) REFERENCES `builders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `units`
--
ALTER TABLE `units`
  ADD CONSTRAINT `fk_projectUnits` FOREIGN KEY (`p_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

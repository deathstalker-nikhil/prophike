-- phpMyAdmin SQL Dump
-- version 4.0.10.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 05, 2015 at 07:25 AM
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `builders`
--

INSERT INTO `builders` (`id`, `builder_name`, `builder_description`, `logo_link`) VALUES
(7, 'Supertech', 'Supertech Limited, India''s leading real estate developer was founded 25 years back in National Capital Region and since then has been scaling new heights by each passing day. The company has set new trends of architectural finesse in the contemporary global scenario touching the horizons of excellence. Established under the dynamic leadership of Mr. R. K. Arora, Supertech has led to creation of various landmark projects. The leaders and skilled professionals of the company have worked towards launching out of the league projects and take the real estate sector to the next level. Supertech is the pioneer to launch the concept of mixed-use development in India and to come up with high rise constructions in North India.', '{"logo":["assets/uploads/builders/logo_home.png"],"type":"builder"}'),
(8, 'Amrapali', 'The beginning of the new millennium witnessed tremendous developments taking place in India that unleashed the latent entrepreneurial energy in various enterprises including construction. One such development was the emergence of the Amrapali Group that started off some 10 years ago under the able guidance of its Chairman & Managing Director Dr. Anil Kumar Sharma, a proud NIT & IIT alumnus. This group is now leading the ranks in the real estate domain and that too in a very short span of time. Today the group enjoys a pan-India presence and has already delivered over 25 world-class projects. The group also has more than 50 projects comprising residential, commercial and IT parks, in the pipeline. Amrapali’s projects delineate the skyline of Noida, the satellite city of Delhi, and other cities such as Indore, Raipur, Jaipur, Patna, Udaipur, Lucknow etc. It is our privilege to have the cricket maestro M.S.Dhoni as our brand ambassador.', ''),
(9, 'Gaursons Limited', 'Founded in the year 1995, Gaursons India Limited has never looked back. With a credo of chasing excellence in each and every endeavour, Gaursons, since its inception, has been riding high on the path of success. Since the very beginning, the company is on a journey of architectural excellence and customer satisfaction with a clear vision - to not only create innovative architecture but transform real estate vision into reality. With a long list of residential projects in Delhi NCR, it is one of the leading builders active in the region today. This multi-interest, multi-utility, real estate company is determined to create new architectural marvels in the future.', ''),
(11, 'Townpark Buildcon', 'When it comes to your dream home or your office or any commercial or residential requirements on one can give you the shape to your dream as Townpark Buildcon can. We have a proven track record of delivering the best, as promised.', '{"logo":["assets/uploads/builders/tpb.JPG"],"type":"builder"}');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `project_id`, `user_name`, `user_phone`, `user_email`, `user_comment`, `is_approved`, `created_on`) VALUES
(3, 15, 'Prashant Chaudhary', 9899310579, 'prashantp099@gmail.com', 'Comment', 1, '2015-10-29 10:33:22'),
(4, 12, 'Anuj Suchchal', 9871363345, 'smandmas@gmail.com', 'jflkdflds', 1, '2015-10-29 14:22:56');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `city`, `areas`) VALUES
(6, 'Noida', '["Sector-74"]'),
(7, 'Greater Noida-West', '["Tech Zone-4","Sector-1","Sector-16C","Gaur City-2"]'),
(8, 'Yamuna Expressway', '["Sector-18"]');

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
  `possession` date NOT NULL,
  `address` varchar(1000) NOT NULL,
  `data` text NOT NULL,
  `media` text NOT NULL,
  `is_hot_project` tinyint(1) NOT NULL DEFAULT '0',
  `is_best_investment_project` tinyint(1) NOT NULL DEFAULT '0',
  `is_project_of_the_day` tinyint(1) NOT NULL DEFAULT '0',
  `is_live` tinyint(1) NOT NULL DEFAULT '0',
  `pdf_link` varchar(1000) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `fk_builders` (`builder_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=17 ;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`project_id`, `name`, `slug`, `min_price`, `max_price`, `property_type`, `city`, `area`, `builder_id`, `possession`, `address`, `data`, `media`, `is_hot_project`, `is_best_investment_project`, `is_project_of_the_day`, `is_live`, `pdf_link`, `created_on`) VALUES
(12, 'Supertech Capetown', 'supertech-capetown', 5170000, 13300000, 'Apartments', 'Noida', 'Sector-74', 7, '2015-11-01', 'Sector-74, Noida', '{"features":"<p><img alt=\\"living room\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_living.jpg\\" \\/><\\/p>\\n\\n<p>Living Room<\\/p>\\n\\n<p>Floor: Vitrified Tiles<\\/p>\\n\\n<p>External Door and Window: Powder Coated Aluminum With Double Rebate<\\/p>\\n\\n<p>Electrical Fittings: Sheet and Switches<\\/p>\\n\\n<p>Walls: Oil Bound Distemper<\\/p>\\n\\n<p>Internal Door: Flush Shutter with Wooden Frame<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n\\n<p>Ceilings: Oil Bound Distemper<\\/p>\\n\\n<p><img alt=\\"dining room\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_dining.jpg\\" \\/><\\/p>\\n\\n<p>Dining<\\/p>\\n\\n<p>Floor: Vitrified Tiles<\\/p>\\n\\n<p>External Door and Window: Powder Coated Aluminum With Double Rebate<\\/p>\\n\\n<p>Electrical Fittings: Sheet and Switches<\\/p>\\n\\n<p>Walls: Oil Bound Distemper<\\/p>\\n\\n<p>Internal Door: Flush Shutter with Wooden Frame<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n\\n<p>Ceilings: Oil Bound Distemper<\\/p>\\n\\n<p><img alt=\\"bedroom\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_bedroom.jpg\\" \\/><\\/p>\\n\\n<p>Bedroom<\\/p>\\n\\n<p>Floor: Vitrified Tiles<\\/p>\\n\\n<p>External Door and Window: Powder Coated Aluminum With Double Rebate<\\/p>\\n\\n<p>Electrical Fittings: Sheet and Switches<\\/p>\\n\\n<p>Walls: Oil Bound Distemper<\\/p>\\n\\n<p>Internal Door: Flush Shutter with Wooden Frame<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n\\n<p>Ceilings: Oil Bound Distemper<\\/p>\\n\\n<p><img alt=\\"master bedrom\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_mbedroom.jpg\\" \\/><\\/p>\\n\\n<p>Master Bedroom<\\/p>\\n\\n<p>Floor: Vitrified Tiles<\\/p>\\n\\n<p>External Door and Window: Powder Coated Aluminum With Double Rebate<\\/p>\\n\\n<p>Electrical Fittings: Sheet and Switches<\\/p>\\n\\n<p>Walls: Oil Bound Distemper<\\/p>\\n\\n<p>Internal Door: Flush Shutter with Wooden Frame<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n\\n<p>Ceilings: Oil Bound Distemper<\\/p>\\n\\n<p><img alt=\\"dressing room\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_dressing.jpg\\" \\/><\\/p>\\n\\n<p>Dressing Room<\\/p>\\n\\n<p>Floor: Vitrified Tiles<\\/p>\\n\\n<p>External Door and Window: Powder Coated Aluminum With Double Rebate<\\/p>\\n\\n<p>Electrical Fittings: Sheet and Switches<\\/p>\\n\\n<p>Walls: Oil Bound Distemper<\\/p>\\n\\n<p>Internal Door: Flush Shutter with Wooden Frame<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n\\n<p>Ceilings: Oil Bound Distemper<\\/p>\\n\\n<p><img alt=\\"servant room\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_servantRoom.jpg\\" \\/><\\/p>\\n\\n<p>Servant Room<\\/p>\\n\\n<p>Floor: Ceramic Tiles<\\/p>\\n\\n<p>External Door and Window: Powder Coated Aluminum With Double Rebate<\\/p>\\n\\n<p>Electrical Fittings: Sheet and Switches<\\/p>\\n\\n<p>Walls: Oil Bound Distemper<\\/p>\\n\\n<p>Internal Door: Flush Shutter with Wooden Frame.<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n\\n<p>Ceilings: Oil Bound Distemper<\\/p>\\n\\n<p>\\u00a0<\\/p>\\n\\n<p><img alt=\\"kitchen\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_kitchen.jpg\\" \\/><\\/p>\\n\\n<p>Kitchen<\\/p>\\n\\n<p>Floor: Vitrified Tiles<\\/p>\\n\\n<p>External Door and Window: Powder Coated Aluminum With Double Rebate<\\/p>\\n\\n<p>Electrical Fittings: Sheet and Switches<\\/p>\\n\\n<p>Walls: Ceramic tiles of 7\\" heights<\\/p>\\n\\n<p>Fittings: Stain steel Sink with C.P.Fittings Full Modular Kitchen with RO System<\\/p>\\n\\n<p>Internal Door: Open<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n\\n<p>Ceilings: Oil Bound Distemper<\\/p>\\n\\n<p><img alt=\\"toilets\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_toilets.jpg\\" \\/><\\/p>\\n\\n<p>Toilet<\\/p>\\n\\n<p>Floor: Ceramic Tiles<\\/p>\\n\\n<p>Electrical Fittings: Sheet and Switches<\\/p>\\n\\n<p>Walls: Ceramic tiles of 7\\" heights<\\/p>\\n\\n<p>Fittings: Washbasin WC & C.P. Fittings<\\/p>\\n\\n<p>Internal Door: Flush Shutter<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n\\n<p>Ceilings: Flase Ceiling<\\/p>\\n\\n<p><img alt=\\"balcony\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_balcony.jpg\\" \\/><\\/p>\\n\\n<p>Balconies<\\/p>\\n\\n<p>Floor: Ceramic Tiles<\\/p>\\n\\n<p>Electrical Fittings: Sheet and Switches<\\/p>\\n\\n<p>Walls: Oil Bound Distemper<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n\\n<p>Ceilings: Permanent paint Finish<\\/p>\\n\\n<p><img alt=\\"lift\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_lift.jpg\\" \\/><\\/p>\\n\\n<p>Lift<\\/p>\\n\\n<p>Floor: PVC Flooring<\\/p>\\n\\n<p>Electrical Fittings: Sheet and Switches<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n\\n<p><img alt=\\"doors\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_doors.jpg\\" \\/><\\/p>\\n\\n<p>Lobbies\\/Corridor<\\/p>\\n\\n<p>Floor: Kota Stone\\/Veritified Tiles<\\/p>\\n\\n<p>Walls: Oil Bound Distemper<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n\\n<p><img alt=\\"exterior room\\" src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_ext.jpg\\" \\/><\\/p>\\n\\n<p>Exterior Room<\\/p>\\n\\n<p>Walls: Texture Paint<\\/p>\\n\\n<p>Internal Door: Flush Shutter with Wooden Frame<\\/p>\\n\\n<p>Hardware: All Doors and windows with metal fittings along with mort ice lock on the main door<\\/p>\\n\\n<p>Electrical: Cooper wiring and PVC Concealed conduit, Provision for adequate light an d power points as well as television and TV outlets with modular switches and protective M.C.B&#39;s.<\\/p>\\n\\n<p>Water Supply: Underground and Overhead water tanks with pumps and 24 hours water supply. Individual R.O plant Standard make in each kitchen.<\\/p>\\n","google_map_code":"&lt;iframe src=\\"https:\\/\\/www.google.com\\/maps\\/embed?pb=!1m18!1m12!1m3!1d3189.0198336733574!2d77.39000020089219!3d28.57529399385453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce576e6cbffff:0xc8a40e38e7de8d16!2sSupertech+Capetown!5e1!3m2!1sen!2sin!4v1445171516611\\" width=\\"600\\" height=\\"450\\" frameborder=\\"0\\" [removed] allowfullscreen&gt;&lt;\\/iframe>","overview":"<p>A world-class leisure and residential community spread out over approx 50 sprawling acres, CapeTown has been envisioned as a complete, self-contained campus area built around the best of the facilities where every home is designed to the most demanding standards.<\\/p>\\n\\n<p>8 Variants of well planned (2,3,4 bedroom) apartments and penthouse towers, Luxury Villas spread over a green area, CapeTown from Supertech is one of the best housing developments in the city.&#39;<\\/p>\\n\\n<p>CapeTown will comprise of upscale, well appointed apartments with modern conveniences such as a clubhouse, jogging track, swimming pool and more.<\\/p>\\n","payment_plan":"<p>[A] Down Payment Plan<\\/p>\\n\\n<table border=\\"0\\" cellpadding=\\"0\\" cellspacing=\\"0\\">\\n <tbody>\\n  <tr>\\n   <td>Particulars<\\/td>\\n   <td>Percentage<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>At the time of Booking<\\/td>\\n   <td>10%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>Within 30 days of Booking<\\/td>\\n   <td>15%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>Within 60 days of Booking<\\/td>\\n   <td>15%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Offer of Possession<\\/td>\\n   <td>60%<\\/td>\\n  <\\/tr>\\n <\\/tbody>\\n<\\/table>\\n\\n<p>L.R. = Lease Rent<br \\/>\\nC.P. = Car Parking<br \\/>\\nC.M. = Club Membership<br \\/>\\nI.F.M.S. = Interest Free Maintenance Security<\\/p>\\n\\n<p>[C] TERMS AND CONDITIONS<\\/p>\\n\\n<ul>\\n <li>Price list as on date of booking shall be applicable.<\\/li>\\n <li>PLCs if any shall be charged along with installations towards basic cost.<\\/li>\\n <li>Cheques\\/Bank Drafts to be issued in favor of \\"SUPERTECH LIMITED A\\/C\\" payable at New Delhi. Outstation cheques shall not be accepted.<\\/li>\\n <li>Service Tax, VAT & Other government levies are extra, as applicable.<\\/li>\\n <li>Registration, Stamp Duty and misc. charges shall be payable at the time of Offer of Possession.<\\/li>\\n <li>Super Area includes the covered area plus the proportionate area under Common Corridor, Passages, Staircases, Mumties, Projections, Water Tanks, Lift Wells, etc.<\\/li>\\n <li>The term and condition of sale stated herein are indicative and are subject to detailed terms and conditions in the \\u2018Agreement to Sell\\u2019\\/\\u2019Flat Buyer\\u2019s Agreement\\u2019 and are subject to change at sole discretion of the company.<\\/li>\\n <li>All building plans, layouts, specifications are subject to change and modifications as decided by the company, architect or any other competent authority.<\\/li>\\n <li>Timely payments of the installments are the essence of the Booking.<\\/li>\\n <li>This price list supercedes all previous price lists.<\\/li>\\n<\\/ul>\\n","price_list":"<p>[A] Down Payment Plan<\\/p>\\n\\n<table border=\\"0\\" cellpadding=\\"0\\" cellspacing=\\"0\\">\\n <tbody>\\n  <tr>\\n   <td rowspan=\\"2\\">Accommodation Type\\u00a0<\\/td>\\n   <td colspan=\\"2\\">Unit Size<\\/td>\\n   <td colspan=\\"2\\">Basic Sale Price in Rs.\\u00a0<\\/td>\\n   <td rowspan=\\"2\\">Total Price in Rs.\\u00a0<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>in sq.ft.<\\/td>\\n   <td>in sq.mt.\\u00a0<\\/td>\\n   <td>per sq.ft.<\\/td>\\n   <td>per sq.mt.\\u00a0<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>2 BHK\\u00a0<\\/td>\\n   <td>930<\\/td>\\n   <td>86.40<\\/td>\\n   <td>5850<\\/td>\\n   <td>62969<\\/td>\\n   <td>5440500<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>2 BHK\\u00a0<\\/td>\\n   <td>1082<\\/td>\\n   <td>100.52<\\/td>\\n   <td>5850<\\/td>\\n   <td>62969<\\/td>\\n   <td>6329700<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>2 BHK + Study<\\/td>\\n   <td>1150<\\/td>\\n   <td>106.84<\\/td>\\n   <td>5850<\\/td>\\n   <td>62969<\\/td>\\n   <td>6727500<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>3 BHK<\\/td>\\n   <td>1295<\\/td>\\n   <td>120.31<\\/td>\\n   <td>5850<\\/td>\\n   <td>62969<\\/td>\\n   <td>7575750<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>3 BHK<\\/td>\\n   <td>1505<\\/td>\\n   <td>139.82<\\/td>\\n   <td>5850<\\/td>\\n   <td>62969<\\/td>\\n   <td>8804250<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>3 BHK\\u00a0<\\/td>\\n   <td>1625<\\/td>\\n   <td>150.97<\\/td>\\n   <td>5850<\\/td>\\n   <td>62969<\\/td>\\n   <td>9506250<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>3 BHK + Study<\\/td>\\n   <td>1945<\\/td>\\n   <td>180.70<\\/td>\\n   <td>5850<\\/td>\\n   <td>62969<\\/td>\\n   <td>11378250<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>4 BHK + SQ<\\/td>\\n   <td>2385<\\/td>\\n   <td>221.57<\\/td>\\n   <td>5850<\\/td>\\n   <td>62969<\\/td>\\n   <td>13952250<\\/td>\\n  <\\/tr>\\n <\\/tbody>\\n<\\/table>\\n\\n<p>[C] Other Charges (One Time)<\\/p>\\n\\n<table border=\\"0\\" cellpadding=\\"0\\" cellspacing=\\"0\\">\\n <tbody>\\n  <tr>\\n   <td>Location<\\/td>\\n   <td>Cost\\/sq.ft.<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>Ground Floor<\\/td>\\n   <td>Rs. 250<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>1st to 3rd Floor<\\/td>\\n   <td>Rs. 200<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>4th to 6th Floor<\\/td>\\n   <td>Rs. 150<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>7th to 9th Floor<\\/td>\\n   <td>Rs. 100<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>10 to 11th Floor<\\/td>\\n   <td>Rs. 50<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>Corner Flat<\\/td>\\n   <td>Rs. 50<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>Park Facing<\\/td>\\n   <td>Rs. 50<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>Road Facing<\\/td>\\n   <td>Rs. 50<\\/td>\\n  <\\/tr>\\n <\\/tbody>\\n<\\/table>\\n","specifications":["23","22","21","20","19","17","15","14"]}', '{"property":{"const_update":["assets/uploads/projects/construction_updates/Cons_Updt1.jpg","assets/uploads/projects/construction_updates/Cons_Updt2.jpg"],"cover":["assets/uploads/projects/project_cover_images/Gallery1.jpg"],"thumb":["assets/uploads/projects/project_thumbnails/Gallery1.jpg"],"gallery":["assets/uploads/projects/gallery/Gallery2.jpg"]},"type":"property"}', 1, 1, 1, 1, '', '2015-09-20 16:08:14'),
(14, 'Gaur Yamuna City', 'gyc', 2095000, 3385000, 'Apartments', 'Yamuna Expressway', 'Sector-18', 9, '2015-11-01', 'Gaur Yamuna City, Sector-18, Yeida', '{"features":"<table border=\\"0\\" cellpadding=\\"0\\" cellspacing=\\"0\\">\\n <tbody>\\n  <tr>\\n   <td>FLOORING<\\/td>\\n   <td>\\n   <ul>\\n    <li>Vitrified tiles 2&#39;x2&#39; in Drawing Room, Kitchen and Bedrooms<\\/li>\\n    <li>Ceramic tiles in Bathrooms and the Balconies<\\/li>\\n   <\\/ul>\\n   <\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>WALL & CEILING FINISH<\\/td>\\n   <td>\\n   <ul>\\n    <li>POP finish walls & ceiling with OBD<\\/li>\\n   <\\/ul>\\n   <\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>KITCHEN<\\/td>\\n   <td>\\n   <ul>\\n    <li>Granite working top with double stainless steel sink<\\/li>\\n    <li>2&#39;-0\\" dado above the working top and 5&#39;-0\\" from the floor level on remaining walls by ceramic tiles<\\/li>\\n    <li>Woodwork below the working top<\\/li>\\n    <li>Individual RO unit drinking water<\\/li>\\n   <\\/ul>\\n   <\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>TOILETS<\\/td>\\n   <td>\\n   <ul>\\n    <li>Ceramic tiles on walls up to door level<\\/li>\\n    <li>White sanitary ware with EWC, CP fittings and mirrors in all toilets<\\/li>\\n   <\\/ul>\\n   <\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>DOORS AND WINDOWS<\\/td>\\n   <td>\\n   <ul>\\n    <li>Outer doors and windows aluminum powder coated\\/UPVC<\\/li>\\n    <li>Internal Door-frames made of Maranti or equivalent wood<\\/li>\\n    <li>Internal doors made of painted flush shutter<\\/li>\\n    <li>Main entry door frame of (8&#39;-0\\" HT) Maranti or equivalent wood with laminated door shutter<\\/li>\\n    <li>Good quality hardware fittings<\\/li>\\n   <\\/ul>\\n   <\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>ELECTRICAL<\\/td>\\n   <td>\\n   <ul>\\n    <li>Copper wire in PVC conduits with MCB supported circuits and adequate power and light points in wall & ceiling<\\/li>\\n   <\\/ul>\\n   <\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>TV & TELEPHONE<\\/td>\\n   <td>\\n   <ul>\\n    <li>Intercom facilities<\\/li>\\n    <li>Provision for DTH Connection<\\/li>\\n   <\\/ul>\\n   <\\/td>\\n  <\\/tr>\\n <\\/tbody>\\n<\\/table>\\n\\n<p>\\u00a0<\\/p>\\n\\n<p>Note<\\/p>\\n\\n<ul>\\n <li>The Colour and design of tiles and motifs can be changed without any prior notice.<\\/li>\\n <li>Variation in colour and size of vitrified tiles\\/granite may occur.<\\/li>\\n <li>Variation in colour in mica may occur.<\\/li>\\n <li>Area in all categories of apartments may vary up to \\u00b13% without any change in cost.<\\/li>\\n <li>However, in case the variation is beyond \\u00b13%, pro rata charges are applicable.<\\/li>\\n <li>The request for any change in construction\\/specification of any type in the apartment will not be entertained.<\\/li>\\n<\\/ul>\\n\\n<p>Disclaimer: All specifications, designs, layout, images conditions are only indicative and some of these can be changed at the discretion of the builder\\/architect\\/authority.<\\/p>\\n","overview":"<p>Spread across a mammoth 300 acres, Gaur Yamuna City is India&#39;s largest group- housing development located on the Yamuna Expressway - one of the fastest-growing professional hubs of India. Offering an enviable blend of state-of-the-art residential, commercial, retail and hospitality development, the gated township - with special emphasis on the environment and sustainable living - has enviable lush-green environs, natural water bodies, jogging, cycling tracks and more. Situated minutes from the Formula One track, GYC at once, guarantees to bring you peace and equanimity, whilst bringing you world-class amenities at one of the most buzzing, and fastest growing hotspots in the country.<\\/p>\\n","payment_plan":"<p>NA<\\/p>\\n","price_list":"<p><img alt=\\"\\" src=\\"http:\\/\\/www.gauryamunacity.org\\/images\\/Price\\/gyc-new-prices.jpg\\" \\/><\\/p>\\n","specifications":["23","22","21","20","19","18","17","16","15","13","11","10","9","8","7"]}', '{"property":{"const_update":[],"cover":["assets/uploads/projects/project_cover_images/gaur-yamuna-city-bg.jpg"],"thumb":["assets/uploads/projects/project_thumbnails/gaur-yamuna-city-bg.jpg"],"gallery":[]},"type":"property"}', 0, 1, 0, 1, 'http://www.gaursonsindia.com/pdf/gaur-yamuna-city-may-2015.pdf', '2015-10-23 06:22:42'),
(15, 'Supertech North Eye', 'north_eye', 4800000, 34400000, 'Apartments', 'Noida', 'Sector-74', 7, '2015-11-01', 'Supertech Northeye, Plot No. GH-1, Sector 74, Noida - 201307', '{"features":"<p>1.<strong>Structure:<\\/strong><\\/p>\\n\\n<p>RCC framed earthquake resistant structure<\\/p>\\n\\n<p><img src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_wallfinish.jpg\\" \\/><\\/p>\\n\\n<p><strong>2. Wall finish:<\\/strong><\\/p>\\n\\n<p>Internal: All internal walls in cement plaster with plastic emulsion paint with POP punning or texture finish\\/paneling\\/wall paper.<\\/p>\\n\\n<p>Externals: External walls in texture paint & structural glazing. Plantation in common areas with proper street lights.<\\/p>\\n\\n<p>Lift Lobbies: Granite Wall Cladding.<\\/p>\\n\\n<p><img src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_flooring.jpg\\" \\/><\\/p>\\n\\n<p><strong>3. Flooring:<\\/strong><\\/p>\\n\\n<p>The living room, dinning room, family lounge, lobby & passage would be made of a mix of Italian\\/Spanish marble of Satvario\\/Perlatosislia\\/Bottichino\\/Kerima Marfil\\/Dyna or equivalent quality with designer patterns.<br \\/>\\nBedroom flooring done with italian marble and\\/or imported wood. Balconies made of marble\\/granite\\/terrazzo tiles.<br \\/>\\nStaicases and common entrance lobby and visitors lounge in granite & quality marble.<\\/p>\\n\\n<p>Living\\/Dinning: A mix of Italian\\/Spanish marble of Satvario\\/Perlatosislia\\/Bottichino\\/Kerima Marfil\\/Dyna or equivalent quality with designer patterns.<\\/p>\\n\\n<p>Master Bedroom: A mix of Italian\\/Spanish marble of Satvario\\/Perlatosislia\\/Bottichino\\/Kerima Marfil\\/Dyna or equivalent quality with designer patterns.<\\/p>\\n\\n<p>Teenager room: Engineering stone flooring.<\\/p>\\n\\n<p>Other Bedrooms: High grade wooden flooring<\\/p>\\n\\n<p>Servant room: Vitrified Tiles<\\/p>\\n\\n<p>Kitchen: Italian Marble<\\/p>\\n\\n<p>Toilets: Italian Marble \\/ Designer Tiles<\\/p>\\n\\n<p>Lift Lobby: Composite stone flooring<\\/p>\\n\\n<p><img src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_kitchen.jpg\\" \\/><\\/p>\\n\\n<p><strong>4. Kitchen:<\\/strong><\\/p>\\n\\n<p>Counter\\/Walls shall feature combinations of high quality granite\\/ imported\\/Indian marble. Double bowl stainless steel sink. Designer\\/modular woodwork & fittings. Chimney with exhaust fan. Single lever hot and cold water. R.O. system<\\/p>\\n\\n<p>Dado: Ceramic tiles till 600 mm above counter area, rest painted with plastic emulsion.<\\/p>\\n\\n<p><img src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_doors.jpg\\" \\/><\\/p>\\n\\n<p><strong>5. Doors:<\\/strong><\\/p>\\n\\n<p>Seasoned hardwood frame with European style moulded shutter.<\\/p>\\n\\n<p><img src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_toilets.jpg\\" \\/><\\/p>\\n\\n<p><strong>6.\\u00a0Toilets:<\\/strong><\\/p>\\n\\n<p>Wall with imported ceramic tiles up to false ceiling. W.C. and wash basin in matching shades of Hindware\\/Cera or equivalent. Jacuzzi in Master Bath. Would include exhaust fan\\/mirror.<\\/p>\\n\\n<p><img src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_electrical.jpg\\" \\/><\\/p>\\n\\n<p><strong>7. Electricals:<\\/strong><\\/p>\\n\\n<p>Modular switches of LEGRAND or equivalent make and copper wiring, Lights in All rooms, Kitchen, Toilets , Balconies and Passages.<\\/p>\\n\\n<p><img src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_power.jpg\\" \\/><\\/p>\\n\\n<p><strong>8. Power Backup:<\\/strong><\\/p>\\n\\n<p>100 % DG Power back-up for all the Apartments and Common areas.<\\/p>\\n\\n<p><img src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_communication.jpg\\" \\/><\\/p>\\n\\n<p><strong>9. Communication:<\\/strong><\\/p>\\n\\n<p>TV and telephone points, video door phone<\\/p>\\n\\n<p><img src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_lift.jpg\\" \\/><\\/p>\\n\\n<p><strong>10. Lobby:<\\/strong><\\/p>\\n\\n<p>High Speed Passenger Elevators (3.5m\\/s)<\\/p>\\n\\n<p><img src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_water.jpg\\" \\/><\\/p>\\n\\n<p><strong>11. Plumbing:<\\/strong><\\/p>\\n\\n<p>CPVC piping for water supply inside the toilet and kitchen & UPVC pipes for stacks<\\/p>\\n\\n<p><img src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_security.jpg\\" \\/><\\/p>\\n\\n<p><strong>11. Security:<\\/strong><\\/p>\\n\\n<p>Secured Gated Community with access Control at Entrances and CCTV for Parking Area and Entrance Lobby at Ground Floor<\\/p>\\n\\n<p><img src=\\"http:\\/\\/supertechlimited.com\\/images\\/spec_ac.jpg\\" \\/><\\/p>\\n\\n<p><strong>12. Air-Conditioning:<\\/strong><\\/p>\\n\\n<p>Air Conditioned Apartments with energy efficient. Air Conditioned Lift Lobbies and Entrance Halls.<\\/p>\\n","google_map_code":"&lt;iframe src=\\"https:\\/\\/www.google.com\\/maps\\/embed?pb=!1m14!1m8!1m3!1d3775.48486921423!2d77.3858714!3d28.5724762!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef67bbff7949:0x4a2971e3778e753a!2sNorth+Eye,+Supertech+Capetown,+Sector+74,+Noida,+Uttar+Pradesh+201304!5e1!3m2!1sen!2sin!4v1446114740085\\" width=\\"600\\" height=\\"450\\" frameborder=\\"0\\" [removed] allowfullscreen&gt;&lt;\\/iframe>","overview":"<p>Height titillates. Height satiates your desire to fly. It&#39;s at height that you come alive. With height, you break away from gravity and feel free. Supertech presents NorthEye, the tallest residential building in North India. Don&#39;t judge the height of NorthEye just in metres or merely by the number of its floors. With NorthEye&#39;s unprecedented levels of luxury, comforts, and services, live above everyone else. Figuratively as well as symbolically.<\\/p>\\n","payment_plan":"<p>[A] Down Payment Plan (10% Rebate on BSP)<\\/p>\\n\\n<table border=\\"0\\" cellpadding=\\"0\\" cellspacing=\\"0\\">\\n <tbody>\\n  <tr>\\n   <td>Particulars<\\/td>\\n   <td>Percentage<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>At the time of Booking<\\/td>\\n   <td>10%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>Within 60 days of booking<\\/td>\\n   <td>30%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of Basement Roof Slab<\\/td>\\n   <td>10%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of 6th Floor Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of 12th Floor Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of 18th Floor Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of 24th Floor Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of 30th Floor Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of 36th Floor Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of 42nd Floor Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of 55th Floor Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of 62nd Floor Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Offer of Possession Letter<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n <\\/tbody>\\n<\\/table>\\n\\n<p>[C] Construction Linked Plan<\\/p>\\n\\n<table border=\\"0\\" cellpadding=\\"0\\" cellspacing=\\"0\\">\\n <tbody>\\n  <tr>\\n   <td>Particulars<\\/td>\\n   <td>Percentage<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>At the time of Booking<\\/td>\\n   <td>10%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>Within 45 days of booking<\\/td>\\n   <td>10%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of Basement Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of 4th Floor Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of 8th Floor Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of 12th Floor Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of 16th Floor Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of 20th Floor Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of 24th Floor Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of 28th Floor Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of 32nd Floor Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of 36th Floor Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of 40th Floor Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of 44th Floor Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of 50th Floor Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of 58th Floor Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Start of 62nd Floor Roof Slab<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>On Offer of Possession Letter<\\/td>\\n   <td>5%<\\/td>\\n  <\\/tr>\\n <\\/tbody>\\n<\\/table>\\n\\n<p>[D] TERMS AND CONDITIONS<\\/p>\\n\\n<ul>\\n <li>Cheques\\/Bank Draft to be issued in favor of \\u201cSUPERTECH LIMITED\\u201d payable at New Delhi\\/Noida. Outstation cheques shall not be accepted.<\\/li>\\n <li>Maintenance Charges, Meter Connection Charges and other Charges are extra and shall be collected before the possession.<\\/li>\\n <li>Service tax, VAT & other government levies are extra, as applicable.<\\/li>\\n <li>Registration, Stamp Duty and Misc Charges shall be payable at the time of offer of possession.<\\/li>\\n <li>Super Area includes the covered area plus the proportionate area under common corridors, passages, staircases, mumties, projections, water tanks, lift wells, etc.<\\/li>\\n <li>The terms and condition of sale stated herein are indicative and are subject to detailed terms & conditions in the &#39;Agreement to Sell&#39;\\/ &#39;Flat Buyer&#39;s Agreement&#39; and are subject to change at sole discretion of the company.<\\/li>\\n <li>All building plans, layouts, specifications are subject to changes and modifications as decided by the company, architect or any other competent authority.<\\/li>\\n <li>Timely payment of the installments is the essence of the Booking.<\\/li>\\n <li>This Price List supercedes all previous price lists. Price list as on date of booking shall be applicable.<\\/li>\\n <li>Prices subject to revision at the sole discretion of the Company.<\\/li>\\n<\\/ul>\\n","price_list":"<p>[A] Basic Sales Price<\\/p>\\n\\n<table border=\\"0\\" cellpadding=\\"0\\" cellspacing=\\"0\\">\\n <tbody>\\n  <tr>\\n   <td>Particulars<\\/td>\\n   <td>Cost<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>EDC\\/IDC<\\/td>\\n   <td>Rs. 200\\/sq.ft.<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>Lease Rent Charges<\\/td>\\n   <td>Rs. 150\\/sq.ft.<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>IFMS<\\/td>\\n   <td>Rs. 100\\/sq.ft.<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>Electricity Installation Charges (Min. 2 kW)<\\/td>\\n   <td>Rs. 20,000\\/kW<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>Power Back-up (Optional)<\\/td>\\n   <td>Rs. 20,000\\/kW<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>Covered Car Parking (Per Slot)<\\/td>\\n   <td>Rs. 5,00,000<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>Club Membership Charges<\\/td>\\n   <td>Rs. 1,00,000<\\/td>\\n  <\\/tr>\\n <\\/tbody>\\n<\\/table>\\n\\n<p>[C] Preferential Location Charges<\\/p>\\n\\n<table border=\\"0\\" cellpadding=\\"0\\" cellspacing=\\"0\\">\\n <tbody>\\n  <tr>\\n   <td>Location<\\/td>\\n   <td>Cost\\/sq.ft.<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>3rd Floor<\\/td>\\n   <td>Rs. 700<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>4th Floor<\\/td>\\n   <td>Rs. 600<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>5th Floor<\\/td>\\n   <td>Rs. 500<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>6th \\u2013 10th Floor<\\/td>\\n   <td>Rs. 450<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>11th \\u2013 15th Floor<\\/td>\\n   <td>Rs. 400<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>16th \\u2013 19th Floor<\\/td>\\n   <td>Rs. 350<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>21st \\u2013 25th Floor<\\/td>\\n   <td>Rs. 400<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>26th \\u2013 30th Floor<\\/td>\\n   <td>Rs. 450<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>31st \\u2013 34th Floor<\\/td>\\n   <td>Rs. 500<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>36th to 39th Floor<\\/td>\\n   <td>Rs. 600<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>40th Floor<\\/td>\\n   <td>Rs. 650<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>41th Floor<\\/td>\\n   <td>Rs. 700<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>42th Floor<\\/td>\\n   <td>Rs. 750<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>43th Floor<\\/td>\\n   <td>Rs. 800<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>44th Floor<\\/td>\\n   <td>Rs. 850<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>45th Floor<\\/td>\\n   <td>Rs. 900<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>46th Floor<\\/td>\\n   <td>Club House<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>47th Floor<\\/td>\\n   <td>Rs. 950<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>48th Floor<\\/td>\\n   <td>Rs. 1000<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>49th Floor<\\/td>\\n   <td>Rs. 1050<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>50th Floor<\\/td>\\n   <td>Rs. 1100<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>51th Floor<\\/td>\\n   <td>Rs. 1150<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>52th Floor<\\/td>\\n   <td>Rs. 1200<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>53th Floor<\\/td>\\n   <td>Rs. 1250<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>54th Floor<\\/td>\\n   <td>Rs. 1300<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>55th Floor<\\/td>\\n   <td>Rs. 1350<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>56th Floor<\\/td>\\n   <td>Rs. 1400<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>57th Floor<\\/td>\\n   <td>Rs. 1450<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>58th Floor<\\/td>\\n   <td>Rs. 1500<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>59th Floor<\\/td>\\n   <td>Rs. 1550<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>60th Floor<\\/td>\\n   <td>Rs. 1600<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>61th Floor<\\/td>\\n   <td>Rs. 1650<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>62th Floor<\\/td>\\n   <td>Rs. 1700<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>63th Floor<\\/td>\\n   <td>Rs. 1750<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>64th Floor<\\/td>\\n   <td>Rs. 1800<\\/td>\\n  <\\/tr>\\n <\\/tbody>\\n<\\/table>\\n","specifications":["23","21","20","17","16","15","14","13","12","11","9","8","7"]}', '{"property":{"const_update":[],"cover":["assets/uploads/projects/project_cover_images/northeye-pic2.jpg"],"thumb":["assets/uploads/projects/project_thumbnails/northeye-pic2.jpg"],"gallery":[]},"type":"property"}', 1, 0, 0, 1, 'http://supertechlimited.com/pdf/northeye-brochure.pdf', '2015-10-24 03:17:17'),
(16, 'White Orchid', 'w_o', 3800000, 7000000, 'Apartments', 'Greater Noida-West', 'Gaur City-2', 11, '2016-12-01', 'Plot No. 3C, Sector 16C, Gaur City-2  Gr. Noida (West)', '{"features":"<p>FLOORING:<\\/p>\\n\\n<p>1- Vitrified tiles in drawing\\/dining\\/bedroom & kitchen<\\/p>\\n\\n<p>2- Anti-skid ceramic tiles in toilet & balcony<\\/p>\\n\\n<p>3- Laminated wooden flooring in master bedroom<\\/p>\\n\\n<p>\\u00a0<\\/p>\\n\\n<p>DOOR & WINDOWS:<\\/p>\\n\\n<p>1- Aluminum powder coated glazed<\\/p>\\n\\n<p>2- Doors & windows with wire mesh Shutters in windows.<\\/p>\\n\\n<p>\\u00a0<\\/p>\\n\\n<p>INTERNAL DOORS:<\\/p>\\n\\n<p>1- Wooden flush doors<\\/p>\\n\\n<p>\\u00a0<\\/p>\\n\\n<p>ELECTRICAL FIXTURES & FITTINGS<\\/p>\\n\\n<p>1- Modular Switches, (Brand Anchor) or Equivalent copper wiring.<\\/p>\\n\\n<p>2- Sufficient light & power point provision T.V and Phone in living bedroom.<\\/p>\\n\\n<p>\\u00a0<\\/p>\\n\\n<p>TOILET:<\\/p>\\n\\n<p>1- Anti-skid ceramic tiles in toilet & balcony<\\/p>\\n\\n<p>2- Aluminum powder coated glazed window with wire mesh.<\\/p>\\n\\n<p>3- ISI marked sanitary ware, WC&#39;s & wash basins<\\/p>\\n\\n<p>\\u00a0<\\/p>\\n\\n<p>KITCHEN:<\\/p>\\n\\n<p>1- Granite top working platform<\\/p>\\n\\n<p>2- Double bowl stainless steel sink<\\/p>\\n","overview":"<p>Situated right next to the Sector 121 of Noida in Greater Noida (West), popularly known as the Noida Extension, this is one of the highly emerging real estate hubs of India, we have launched our new project \\"White Orchid\\" within a grand township Gaur City II, is being developed to be a better and stronger and safer place to live in the neighbourhood of Delhi. Spread over 125 acres, The township has is a fine amalgam of high living ensconced not only by the greenery but also with modern amenities such as multiplex, stadium, Olympic size swimming pool, hotels, hospitals, schools and much more. Every corner of this complex receives profuse sunlight and fresh air. These apartments will have seasonings of fresh flow of air and natural light with proper ventilation. Vastu friendly designs of the apartments will enable its residents to have a peaceful life.<\\/p>\\n","payment_plan":"<p>NA<\\/p>\\n","price_list":"<table border=\\"0\\" cellpadding=\\"0\\" cellspacing=\\"0\\">\\n <tbody>\\n  <tr>\\n   <td>Unit Size<\\/td>\\n   <td>Price per sqft<\\/td>\\n   <td>Total Price<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>1097<\\/td>\\n   <td>3500<\\/td>\\n   <td>3839500<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>1293<\\/td>\\n   <td>3500<\\/td>\\n   <td>4525500<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>1544<\\/td>\\n   <td>3500<\\/td>\\n   <td>5404000<\\/td>\\n  <\\/tr>\\n  <tr>\\n   <td>1865<\\/td>\\n   <td>3500<\\/td>\\n   <td>6527500<\\/td>\\n  <\\/tr>\\n <\\/tbody>\\n<\\/table>\\n","specifications":["22","21","20","19","17","16","15","14","13","12","11","9","8","7"]}', '{"property":{"const_update":["assets/uploads/projects/construction_updates/tower1.jpg","assets/uploads/projects/construction_updates/tower2.jpg","assets/uploads/projects/construction_updates/tower3.JPG","assets/uploads/projects/construction_updates/View.JPG"],"cover":["assets/uploads/projects/project_cover_images/wo_cover.jpg"],"thumb":["assets/uploads/projects/project_thumbnails/w_o_tn.jpeg"],"gallery":["assets/uploads/projects/gallery/layout.JPG","assets/uploads/projects/gallery/Location_Map.JPG","assets/uploads/projects/gallery/pic1.JPG","assets/uploads/projects/gallery/siteplan.JPG"]},"type":"property"}', 1, 0, 0, 1, 'http://townparkbuildcon.com/brochure.pdf', '2015-11-03 06:57:56');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `unit_name`, `unit_type`, `unit_price`, `unit_price_per_area`, `unit_area`, `unit_details`, `image_path`, `p_id`) VALUES
(20, '2 BHK TYPE A', '2 BHK', 5168940, 2000000, 930, '', '{"img":["assets/uploads/projects/units/fp-big1.jpg"],"type":"unit"}', 12),
(21, '3 BHK TYPE A', '3 BHK', 7197610, 5558, 1295, '', '{"img":["assets/uploads/projects/units/fp-big4.jpg"],"type":"unit"}', 12),
(22, '2 BHK', '2 BHK', 3500, 3500, 1097, '<p>2 BHK + 2 Toilets</p>\n', '{"img":["assets/uploads/projects/units/2BHK1.JPG"],"type":"unit"}', 16),
(23, '3 BHK - Type 1', '3 BHK', 3500, 3500, 1293, '', '{"img":["assets/uploads/projects/units/3bhk1.JPG"],"type":"unit"}', 16),
(24, '3 BHK - Type 2', '3 BHK', 3500, 3500, 1544, '<p>3 BHK + 2 Toilets</p>\n', '{"img":["assets/uploads/projects/units/3bhk2.JPG"],"type":"unit"}', 16),
(25, '3 BHK - Type 3', '3 BHK', 3500, 3500, 1865, '', '{"img":["assets/uploads/projects/units/3bhk3.JPG"],"type":"unit"}', 16);

-- --------------------------------------------------------

--
-- Table structure for table `user_queries`
--

CREATE TABLE IF NOT EXISTS `user_queries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `p_id` int(11) DEFAULT NULL,
  `user_name` varchar(300) NOT NULL,
  `user_email` varchar(500) NOT NULL,
  `user_phone` varchar(10) NOT NULL,
  `user_query` varchar(1000) NOT NULL,
  `quick_contact` tinyint(1) NOT NULL DEFAULT '0',
  `arrange_site_visit` tinyint(1) NOT NULL DEFAULT '0',
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `project_queries_fk` (`p_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `user_queries`
--

INSERT INTO `user_queries` (`id`, `p_id`, `user_name`, `user_email`, `user_phone`, `user_query`, `quick_contact`, `arrange_site_visit`, `created_on`) VALUES
(8, NULL, 'Prashant', 'prashantp099@gmail.com', '', 'This is a quick query', 1, 0, '2015-10-30 21:37:24'),
(9, 12, 'Prashant Chaudhary', 'prashantp099@gmail.com', '9899310579', 'This is project Query', 0, 1, '2015-10-30 21:38:06'),
(10, NULL, 'Anuj suchchal', 'anujsuchchal@gmail.com', '', 'Shdhdhd', 1, 0, '2015-10-31 09:51:45');

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

--
-- Constraints for table `user_queries`
--
ALTER TABLE `user_queries`
  ADD CONSTRAINT `project_queries_fk` FOREIGN KEY (`p_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- ==========================================================
-- Elite Global Excellence (EGE) - MySQL Database Schema
-- Production Relational Schema for Academic & Research Platform
-- Database: ege_database
-- ==========================================================

CREATE DATABASE IF NOT EXISTS ege_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ege_database;

-- 1. Users Table (Admin & Staff)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('SUPER_ADMIN', 'ADMIN', 'EDITOR') DEFAULT 'ADMIN',
  status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
  last_login DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Ambassadors Table (Distinguished Academic Collaborators)
CREATE TABLE IF NOT EXISTS ambassadors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  photo_url TEXT,
  bio TEXT,
  research_interests TEXT,
  collaboration_highlights TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Events Table (Upcoming & Past Events)
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  event_date VARCHAR(100) NOT NULL,
  location_mode VARCHAR(100) DEFAULT 'Online / Virtual',
  category VARCHAR(100) DEFAULT 'Conference',
  image_url TEXT,
  status ENUM('UPCOMING', 'PAST') DEFAULT 'UPCOMING',
  registration_link TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. News & Press Releases Table
CREATE TABLE IF NOT EXISTS news_articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'Press release',
  author VARCHAR(255) DEFAULT 'EGE Communications',
  image_url TEXT,
  publish_date VARCHAR(100) NOT NULL,
  is_published BOOLEAN DEFAULT TRUE,
  views_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Partners Table (Universities, Research Bodies, Industry)
CREATE TABLE IF NOT EXISTS partners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) DEFAULT 'Academic Partner',
  logo_url TEXT,
  description TEXT,
  website_url TEXT,
  country VARCHAR(100),
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Workshops Table
CREATE TABLE IF NOT EXISTS workshops (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date_string VARCHAR(100) NOT NULL,
  mode VARCHAR(100) DEFAULT 'Online · Free',
  is_free BOOLEAN DEFAULT TRUE,
  status ENUM('UPCOMING', 'PAST') DEFAULT 'PAST',
  description TEXT,
  speaker_name VARCHAR(255),
  speaker_affiliation VARCHAR(255),
  registration_link TEXT,
  materials_available BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Courses Table
CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  tagline VARCHAR(255) DEFAULT 'LEARN · GROW · SUCCEED',
  duration VARCHAR(100) DEFAULT 'Announced Soon',
  mode VARCHAR(100) DEFAULT 'Online (Live)',
  type ENUM('UPCOMING', 'RECORDED_PAID') DEFAULT 'UPCOMING',
  description TEXT,
  objective TEXT,
  outline TEXT,
  benefits TEXT,
  price DECIMAL(10, 2) DEFAULT 0.00,
  registration_open BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Research Network Members Table
CREATE TABLE IF NOT EXISTS research_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) DEFAULT 'Research Assistant',
  affiliation VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  photo_url TEXT,
  research_area TEXT,
  email VARCHAR(255),
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. Careers / Open Roles Table
CREATE TABLE IF NOT EXISTS careers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL,
  location VARCHAR(100) DEFAULT 'Remote / Kuala Lumpur',
  type ENUM('FULL_TIME', 'PART_TIME', 'REMOTE', 'CONTRACT') DEFAULT 'FULL_TIME',
  description TEXT NOT NULL,
  requirements TEXT,
  status ENUM('OPEN', 'CLOSED') DEFAULT 'OPEN',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. Site Content Configuration Table (CMS)
CREATE TABLE IF NOT EXISTS site_content (
  id VARCHAR(100) PRIMARY KEY,
  section_key VARCHAR(100) NOT NULL,
  content_data JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 11. Contact Settings Table
CREATE TABLE IF NOT EXISTS contact_settings (
  id INT PRIMARY KEY DEFAULT 1,
  primary_address TEXT NOT NULL,
  secondary_address TEXT,
  primary_email VARCHAR(255) NOT NULL,
  secondary_email VARCHAR(255),
  phone_number VARCHAR(100) NOT NULL,
  website_url VARCHAR(255) NOT NULL,
  collaboration_note TEXT,
  map_query VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 12. Inbox & Inquiries Table (Contact, Quotes, Bookings, Applications)
CREATE TABLE IF NOT EXISTS inbox_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type ENUM('CONTACT', 'QUOTATION', 'MOCK_VIVA_BOOKING', 'WORKSHOP_REGISTRATION', 'JOB_APPLICATION', 'COLLABORATION') DEFAULT 'CONTACT',
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(100),
  subject VARCHAR(255),
  message TEXT,
  metadata JSON,
  status ENUM('UNREAD', 'READ', 'RESPONDED', 'ARCHIVED') DEFAULT 'UNREAD',
  admin_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 13. Certificate Verification Table
CREATE TABLE IF NOT EXISTS certificates (
  certificate_id VARCHAR(100) PRIMARY KEY,
  participant_name VARCHAR(255) NOT NULL,
  workshop_title VARCHAR(255) NOT NULL,
  issue_date VARCHAR(100) NOT NULL,
  status ENUM('VALID', 'EXPIRED', 'REVOKED') DEFAULT 'VALID',
  institution VARCHAR(255) DEFAULT 'Elite Global Excellence'
);

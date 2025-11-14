-- Cloudflare D1 Database Schema for Kesef Shemaguia Lecha
-- Run this after creating the D1 database

-- Analytics table: Track questionnaire completions and user behavior
CREATE TABLE IF NOT EXISTS analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event TEXT NOT NULL,
  data TEXT,  -- JSON string with questionnaire answers
  timestamp TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_analytics_event ON analytics(event);
CREATE INDEX idx_analytics_timestamp ON analytics(timestamp);

-- Contacts table: Store contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_timestamp ON contacts(timestamp);

-- Future: Users table (if you want to add user accounts)
-- CREATE TABLE IF NOT EXISTS users (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   email TEXT UNIQUE NOT NULL,
--   name TEXT,
--   created_at DATETIME DEFAULT CURRENT_TIMESTAMP
-- );

-- Future: Saved results table (if users want to save their results)
-- CREATE TABLE IF NOT EXISTS saved_results (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   user_id INTEGER,
--   answers TEXT,  -- JSON string
--   programs TEXT,  -- JSON string of recommended programs
--   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY (user_id) REFERENCES users(id)
-- );

-- 📋 העתק את כל הקוד הזה והדבק ב-Cloudflare D1 Console
-- https://dash.cloudflare.com/workers/d1/databases/3aa11527-4084-4988-aeab-706efe5ac8d4

-- Analytics table: Track questionnaire completions
CREATE TABLE IF NOT EXISTS analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event TEXT NOT NULL,
  data TEXT,
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

-- ✅ אחרי שהרצת את זה, לחץ "Execute" ותראה "Query executed successfully"

-- Snippity Pip Academy interest list. Run against both production and development D1 separately.
CREATE TABLE IF NOT EXISTS academy_interests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT COLLATE NOCASE NOT NULL,
  course TEXT NOT NULL CHECK(course IN ('Hair Cutting Course','Hair Extensions Course')),
  status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new','contacted','invited')),
  consent_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(email,course)
);
CREATE INDEX IF NOT EXISTS idx_academy_interests_course ON academy_interests(course,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_academy_interests_status ON academy_interests(status,created_at DESC);

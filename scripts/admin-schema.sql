CREATE TABLE IF NOT EXISTS aq_content (
  collection text NOT NULL, key text NOT NULL, value jsonb NOT NULL DEFAULT '{}',
  deleted boolean NOT NULL DEFAULT false, revision integer NOT NULL DEFAULT 1,
  updated_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(collection, key)
);
CREATE TABLE IF NOT EXISTS aq_sessions (
  token_hash text PRIMARY KEY, credential_hash text NOT NULL, expires_at timestamptz NOT NULL
);
CREATE TABLE IF NOT EXISTS aq_rate_limits (
  key text PRIMARY KEY, attempts integer NOT NULL, expires_at timestamptz NOT NULL
);
CREATE TABLE IF NOT EXISTS aq_media (
  id text PRIMARY KEY, name text NOT NULL, mime text NOT NULL, bytes bytea NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS aq_enquiries (
  id uuid PRIMARY KEY, payload jsonb NOT NULL, email_status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS aq_sessions_expiry_idx ON aq_sessions(expires_at);
CREATE INDEX IF NOT EXISTS aq_rate_limits_expiry_idx ON aq_rate_limits(expires_at);
ALTER TABLE aq_enquiries ADD COLUMN IF NOT EXISTS lead_status text NOT NULL DEFAULT 'new';
ALTER TABLE aq_enquiries ADD COLUMN IF NOT EXISTS notes text NOT NULL DEFAULT '';
ALTER TABLE aq_enquiries ADD COLUMN IF NOT EXISTS follow_up_at timestamptz;
ALTER TABLE aq_enquiries ADD COLUMN IF NOT EXISTS appointment_at timestamptz;
ALTER TABLE aq_enquiries ADD COLUMN IF NOT EXISTS revision integer NOT NULL DEFAULT 1;
ALTER TABLE aq_enquiries ADD COLUMN IF NOT EXISTS email_attempts integer NOT NULL DEFAULT 0;
ALTER TABLE aq_enquiries ADD COLUMN IF NOT EXISTS last_email_attempt_at timestamptz;
CREATE INDEX IF NOT EXISTS aq_enquiries_created_idx ON aq_enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS aq_enquiries_follow_up_idx ON aq_enquiries(follow_up_at) WHERE lead_status NOT IN ('won','lost');
CREATE TABLE IF NOT EXISTS aq_activity (
  day date NOT NULL DEFAULT CURRENT_DATE, event text NOT NULL, path text NOT NULL,
  channel text NOT NULL, count integer NOT NULL DEFAULT 1,
  PRIMARY KEY(day,event,path,channel)
);
CREATE TABLE IF NOT EXISTS aq_schema_migrations (
  name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now()
);
-- One-time owner-requested change: preserve subsequent dashboard email edits.
WITH migration AS (
  INSERT INTO aq_schema_migrations(name) VALUES ('business-email-2026-10-09')
  ON CONFLICT DO NOTHING RETURNING name
)
UPDATE aq_content
SET value=jsonb_set(value,'{email}','"aqenterprises204@gmail.com"'::jsonb),
    revision=revision+1, updated_at=now()
WHERE EXISTS (SELECT 1 FROM migration)
  AND collection='contact' AND key='settings' AND NOT deleted
  AND value->>'email'='mohammedtalha204@gmail.com';

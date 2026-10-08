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

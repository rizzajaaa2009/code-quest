-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  gold INTEGER DEFAULT 50,
  current_arc TEXT DEFAULT 'html-kingdom',
  hint_tokens INTEGER DEFAULT 3,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User progress table
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  quest_id TEXT NOT NULL,
  status TEXT DEFAULT 'locked',
  completed_challenges TEXT[] DEFAULT '{}',
  attempts_remaining INTEGER DEFAULT 3,
  score INTEGER DEFAULT 0,
  UNIQUE(user_id, quest_id)
);

-- User inventory table
CREATE TABLE user_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  item_id TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  UNIQUE(user_id, item_id)
);

-- Game sessions table for tracking current state
CREATE TABLE game_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  current_quest_id TEXT,
  current_challenge_id TEXT,
  challenge_state TEXT DEFAULT 'idle',
  attempt_count INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "select_own_users" ON users FOR SELECT
  TO authenticated USING (auth.uid()::text = id::text);
CREATE POLICY "insert_own_users" ON users FOR INSERT
  TO authenticated WITH CHECK (auth.uid()::text = id::text);
CREATE POLICY "update_own_users" ON users FOR UPDATE
  TO authenticated USING (auth.uid()::text = id::text) WITH CHECK (auth.uid()::text = id::text);

-- RLS Policies for user_progress
CREATE POLICY "select_own_progress" ON user_progress FOR SELECT
  TO authenticated USING (auth.uid()::text = user_id::text);
CREATE POLICY "insert_own_progress" ON user_progress FOR INSERT
  TO authenticated WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "update_own_progress" ON user_progress FOR UPDATE
  TO authenticated USING (auth.uid()::text = user_id::text) WITH CHECK (auth.uid()::text = user_id::text);

-- RLS Policies for user_inventory
CREATE POLICY "select_own_inventory" ON user_inventory FOR SELECT
  TO authenticated USING (auth.uid()::text = user_id::text);
CREATE POLICY "insert_own_inventory" ON user_inventory FOR INSERT
  TO authenticated WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "update_own_inventory" ON user_inventory FOR UPDATE
  TO authenticated USING (auth.uid()::text = user_id::text) WITH CHECK (auth.uid()::text = user_id::text);

-- RLS Policies for game_sessions
CREATE POLICY "select_own_sessions" ON game_sessions FOR SELECT
  TO authenticated USING (auth.uid()::text = user_id::text);
CREATE POLICY "insert_own_sessions" ON game_sessions FOR INSERT
  TO authenticated WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "update_own_sessions" ON game_sessions FOR UPDATE
  TO authenticated USING (auth.uid()::text = user_id::text) WITH CHECK (auth.uid()::text = user_id::text);
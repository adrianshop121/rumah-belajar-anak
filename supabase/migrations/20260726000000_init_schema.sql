-- Migration: Init Rumah Belajar Anak.id Full Schema
-- File: supabase/migrations/20260726000000_init_schema.sql

-- 1. Profiles Table (Parent Accounts)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  parent_pin VARCHAR(4) DEFAULT '1234',
  subscription_plan VARCHAR(20) DEFAULT 'pro' CHECK (subscription_plan IN ('free', 'pro', 'annual')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Child Profiles Table (Up to 5 profiles per parent account)
CREATE TABLE IF NOT EXISTS public.child_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  avatar_id TEXT NOT NULL DEFAULT 'bunny',
  avatar_img TEXT,
  age_tier VARCHAR(20) NOT NULL CHECK (age_tier IN ('balita', 'tk', 'sd_low', 'sd_high')),
  gender VARCHAR(10) CHECK (gender IN ('boy', 'girl')),
  favorite_topics TEXT[] DEFAULT ARRAY['angka', 'huruf']::TEXT[],
  islamic_content_enabled BOOLEAN DEFAULT TRUE,
  instruction_language VARCHAR(10) DEFAULT 'id' CHECK (instruction_language IN ('id', 'id_en')),
  daily_time_limit_minutes INT DEFAULT 60,
  allowed_start_hour INT DEFAULT 15,
  allowed_end_hour INT DEFAULT 18,
  xp_points INT DEFAULT 0,
  current_level TEXT DEFAULT 'Bintang Kecil',
  current_streak INT DEFAULT 1,
  longest_streak INT DEFAULT 1,
  last_active_date DATE DEFAULT CURRENT_DATE,
  streak_freezes_left INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Game Categories & Detailed Progress
CREATE TABLE IF NOT EXISTS public.game_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.child_profiles(id) ON DELETE CASCADE,
  category_id VARCHAR(50) NOT NULL,
  game_id VARCHAR(50) NOT NULL,
  stars_earned INT DEFAULT 3 CHECK (stars_earned BETWEEN 1 AND 3),
  xp_earned INT DEFAULT 50,
  score INT DEFAULT 100,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(child_id, category_id, game_id)
);

-- 4. Badges Collection
CREATE TABLE IF NOT EXISTS public.child_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.child_profiles(id) ON DELETE CASCADE,
  badge_key VARCHAR(50) NOT NULL,
  badge_title TEXT NOT NULL,
  badge_icon TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(child_id, badge_key)
);

-- 5. Screen Time Logs (Parent Monitoring)
CREATE TABLE IF NOT EXISTS public.screen_time_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.child_profiles(id) ON DELETE CASCADE,
  log_date DATE DEFAULT CURRENT_DATE,
  minutes_spent INT DEFAULT 0,
  sessions_count INT DEFAULT 1,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(child_id, log_date)
);

-- 6. Daily Challenges System
CREATE TABLE IF NOT EXISTS public.daily_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.child_profiles(id) ON DELETE CASCADE,
  challenge_date DATE DEFAULT CURRENT_DATE,
  title TEXT NOT NULL,
  category_id VARCHAR(50) NOT NULL,
  target_count INT DEFAULT 5,
  current_count INT DEFAULT 0,
  is_completed BOOLEAN DEFAULT FALSE,
  bonus_xp_claimed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(child_id, challenge_date)
);

-- Row Level Security (RLS) Configuration
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.child_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.child_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screen_time_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_challenges ENABLE ROW LEVEL SECURITY;

-- Parent RLS Policies
CREATE POLICY "Parents manage own profile" ON public.profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Parents manage own child profiles" ON public.child_profiles
  FOR ALL USING (parent_id = auth.uid());

CREATE POLICY "Parents access child progress" ON public.game_progress
  FOR ALL USING (child_id IN (SELECT id FROM public.child_profiles WHERE parent_id = auth.uid()));

CREATE POLICY "Parents access child badges" ON public.child_badges
  FOR ALL USING (child_id IN (SELECT id FROM public.child_profiles WHERE parent_id = auth.uid()));

CREATE POLICY "Parents access screen time logs" ON public.screen_time_logs
  FOR ALL USING (child_id IN (SELECT id FROM public.child_profiles WHERE parent_id = auth.uid()));

CREATE POLICY "Parents access daily challenges" ON public.daily_challenges
  FOR ALL USING (child_id IN (SELECT id FROM public.child_profiles WHERE parent_id = auth.uid()));

-- Migration: Init Rumah Belajar Anak.id Schema
-- Date: 2026-07-25

-- 1. Profiles Table (Parents)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  parent_pin VARCHAR(4) DEFAULT '1234',
  subscription_plan VARCHAR(20) DEFAULT 'free' CHECK (subscription_plan IN ('free', 'pro', 'annual')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Child Profiles Table (Up to 5 profiles per parent)
CREATE TABLE IF NOT EXISTS public.child_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  avatar_id TEXT NOT NULL DEFAULT 'bunny',
  age_tier VARCHAR(20) NOT NULL CHECK (age_tier IN ('balita', 'tk', 'sd_low', 'sd_high')),
  gender VARCHAR(10) CHECK (gender IN ('boy', 'girl')),
  favorite_topics TEXT[] DEFAULT ARRAY[]::TEXT[],
  islamic_content_enabled BOOLEAN DEFAULT FALSE,
  instruction_language VARCHAR(10) DEFAULT 'id' CHECK (instruction_language IN ('id', 'id_en')),
  daily_time_limit_minutes INT DEFAULT 60,
  allowed_start_hour INT DEFAULT 15,
  allowed_end_hour INT DEFAULT 18,
  xp_points INT DEFAULT 0,
  current_level TEXT DEFAULT 'Bintang Kecil',
  current_streak INT DEFAULT 0,
  longest_streak INT DEFAULT 0,
  last_active_date DATE DEFAULT CURRENT_DATE,
  streak_freezes_left INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Game Categories & Progress
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

-- 4. Badges Table
CREATE TABLE IF NOT EXISTS public.child_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.child_profiles(id) ON DELETE CASCADE,
  badge_key VARCHAR(50) NOT NULL,
  badge_title TEXT NOT NULL,
  badge_icon TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(child_id, badge_key)
);

-- 5. Screen Time Logs Table
CREATE TABLE IF NOT EXISTS public.screen_time_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.child_profiles(id) ON DELETE CASCADE,
  log_date DATE DEFAULT CURRENT_DATE,
  minutes_spent INT DEFAULT 0,
  sessions_count INT DEFAULT 1,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(child_id, log_date)
);

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.child_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.child_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screen_time_logs ENABLE ROW LEVEL SECURITY;

-- Parent Access Policies
CREATE POLICY "Parents can manage own profile" ON public.profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Parents can manage own child profiles" ON public.child_profiles
  FOR ALL USING (parent_id = auth.uid());

CREATE POLICY "Parents can read child progress" ON public.game_progress
  FOR ALL USING (child_id IN (SELECT id FROM public.child_profiles WHERE parent_id = auth.uid()));

CREATE POLICY "Parents can read child badges" ON public.child_badges
  FOR ALL USING (child_id IN (SELECT id FROM public.child_profiles WHERE parent_id = auth.uid()));

CREATE POLICY "Parents can read child screen time" ON public.screen_time_logs
  FOR ALL USING (child_id IN (SELECT id FROM public.child_profiles WHERE parent_id = auth.uid()));

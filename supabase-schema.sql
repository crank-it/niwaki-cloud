-- Supabase Schema for niwaki.cloud
-- Run these SQL commands in Supabase SQL Editor

-- Enable PostGIS
CREATE EXTENSION IF NOT EXISTS postgis SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (synced from Clerk)
CREATE TABLE public.users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'moderator', 'admin')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Species reference table
CREATE TABLE public.species (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  common_name TEXT NOT NULL,
  scientific_name TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'expert')),
  description TEXT,
  pruning_notes TEXT,
  climate_zones TEXT[],
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Garden locations
CREATE TABLE public.garden_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  location extensions.geography(POINT) NOT NULL,
  address TEXT,
  city TEXT,
  country TEXT,
  species_ids UUID[],
  is_featured BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_garden_locations_geo ON public.garden_locations USING GIST(location);
CREATE INDEX idx_garden_locations_status ON public.garden_locations(status);

-- Photos
CREATE TABLE public.photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  garden_location_id UUID REFERENCES public.garden_locations(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  thumbnail_path TEXT,
  title TEXT,
  description TEXT,
  is_primary BOOLEAN DEFAULT false,
  vote_count INTEGER DEFAULT 0,
  wilson_score FLOAT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Votes
CREATE TABLE public.votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  photo_id UUID NOT NULL REFERENCES public.photos(id) ON DELETE CASCADE,
  value INTEGER NOT NULL CHECK (value IN (-1, 1)),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, photo_id)
);

-- Comments
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  garden_location_id UUID REFERENCES public.garden_locations(id) ON DELETE CASCADE,
  photo_id UUID REFERENCES public.photos(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Moderation queue
CREATE TABLE public.moderation_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_type TEXT NOT NULL CHECK (content_type IN ('garden', 'photo', 'comment')),
  content_id UUID NOT NULL,
  reported_by TEXT REFERENCES public.users(id),
  reason TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  moderator_id TEXT REFERENCES public.users(id),
  moderator_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- Helper functions
CREATE OR REPLACE FUNCTION public.requesting_user_id()
RETURNS TEXT AS $$
  SELECT NULLIF(current_setting('request.jwt.claims', true)::json->>'sub', '')::text;
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION public.is_moderator_or_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users
    WHERE id = public.requesting_user_id()
    AND role IN ('moderator', 'admin')
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Wilson score function
CREATE OR REPLACE FUNCTION calculate_wilson_score(up INTEGER, down INTEGER)
RETURNS FLOAT AS $$
DECLARE
  n INTEGER;
  z FLOAT := 1.96;
  phat FLOAT;
BEGIN
  n := up + down;
  IF n = 0 THEN RETURN 0; END IF;
  phat := up::FLOAT / n;
  RETURN (phat + z*z/(2*n) - z * SQRT((phat*(1-phat) + z*z/(4*n))/n)) / (1 + z*z/n);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Trigger to update vote counts
CREATE OR REPLACE FUNCTION update_photo_votes()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.photos
  SET
    vote_count = (SELECT COALESCE(SUM(value), 0) FROM public.votes WHERE photo_id = COALESCE(NEW.photo_id, OLD.photo_id)),
    wilson_score = calculate_wilson_score(
      (SELECT COUNT(*) FROM public.votes WHERE photo_id = COALESCE(NEW.photo_id, OLD.photo_id) AND value = 1),
      (SELECT COUNT(*) FROM public.votes WHERE photo_id = COALESCE(NEW.photo_id, OLD.photo_id) AND value = -1)
    )
  WHERE id = COALESCE(NEW.photo_id, OLD.photo_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_vote_change
AFTER INSERT OR UPDATE OR DELETE ON public.votes
FOR EACH ROW EXECUTE FUNCTION update_photo_votes();

-- Nearby gardens function
CREATE OR REPLACE FUNCTION nearby_gardens(lat FLOAT, lng FLOAT, radius_km FLOAT DEFAULT 50, limit_count INTEGER DEFAULT 20)
RETURNS TABLE (
  id UUID,
  name TEXT,
  description TEXT,
  distance_km FLOAT,
  latitude FLOAT,
  longitude FLOAT,
  photo_url TEXT,
  vote_count INTEGER
) LANGUAGE sql STABLE AS $$
  SELECT
    g.id,
    g.name,
    g.description,
    (extensions.st_distance(g.location, extensions.st_point(lng, lat)::extensions.geography) / 1000)::FLOAT as distance_km,
    extensions.st_y(g.location::extensions.geometry)::FLOAT as latitude,
    extensions.st_x(g.location::extensions.geometry)::FLOAT as longitude,
    (SELECT storage_path FROM public.photos WHERE garden_location_id = g.id AND is_primary = true LIMIT 1) as photo_url,
    (SELECT COALESCE(SUM(vote_count), 0)::INTEGER FROM public.photos WHERE garden_location_id = g.id) as vote_count
  FROM public.garden_locations g
  WHERE g.status = 'approved'
    AND g.is_public = true
    AND extensions.st_dwithin(g.location, extensions.st_point(lng, lat)::extensions.geography, radius_km * 1000)
  ORDER BY g.location <-> extensions.st_point(lng, lat)::extensions.geography
  LIMIT limit_count;
$$;

-- Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.garden_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moderation_queue ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users viewable by all" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (id = requesting_user_id());

-- Gardens policies
CREATE POLICY "Approved gardens viewable" ON public.garden_locations
  FOR SELECT USING (status = 'approved' AND is_public = true);
CREATE POLICY "Users can view own gardens" ON public.garden_locations
  FOR SELECT USING (user_id = requesting_user_id());
CREATE POLICY "Users can insert gardens" ON public.garden_locations
  FOR INSERT WITH CHECK (user_id = requesting_user_id());
CREATE POLICY "Users can update own gardens" ON public.garden_locations
  FOR UPDATE USING (user_id = requesting_user_id());
CREATE POLICY "Moderators can update any garden" ON public.garden_locations
  FOR UPDATE USING (is_moderator_or_admin());

-- Photos policies
CREATE POLICY "Public photos viewable" ON public.photos
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.garden_locations g
    WHERE g.id = garden_location_id AND g.status = 'approved' AND g.is_public = true
  ));
CREATE POLICY "Users can upload photos" ON public.photos
  FOR INSERT WITH CHECK (user_id = requesting_user_id());
CREATE POLICY "Users can delete own photos" ON public.photos
  FOR DELETE USING (user_id = requesting_user_id());

-- Votes policies
CREATE POLICY "Votes viewable" ON public.votes FOR SELECT USING (true);
CREATE POLICY "Users can vote" ON public.votes
  FOR INSERT WITH CHECK (user_id = requesting_user_id());
CREATE POLICY "Users can change own vote" ON public.votes
  FOR UPDATE USING (user_id = requesting_user_id());
CREATE POLICY "Users can remove own vote" ON public.votes
  FOR DELETE USING (user_id = requesting_user_id());

-- Comments policies
CREATE POLICY "Visible comments viewable" ON public.comments
  FOR SELECT USING (is_visible = true);
CREATE POLICY "Users can comment" ON public.comments
  FOR INSERT WITH CHECK (user_id = requesting_user_id());

-- Moderation policies
CREATE POLICY "Moderators can view queue" ON public.moderation_queue
  FOR SELECT USING (is_moderator_or_admin());
CREATE POLICY "Moderators can update queue" ON public.moderation_queue
  FOR UPDATE USING (is_moderator_or_admin());
CREATE POLICY "Users can report" ON public.moderation_queue
  FOR INSERT WITH CHECK (true);

-- Garden to species junction table
CREATE TABLE IF NOT EXISTS public.garden_species (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  garden_location_id UUID NOT NULL REFERENCES public.garden_locations(id) ON DELETE CASCADE,
  species_id UUID NOT NULL REFERENCES public.species(id) ON DELETE CASCADE,
  UNIQUE(garden_location_id, species_id)
);

-- Enable RLS on garden_species
ALTER TABLE public.garden_species ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Garden species viewable" ON public.garden_species FOR SELECT USING (true);
CREATE POLICY "Users can manage own garden species" ON public.garden_species
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.garden_locations WHERE id = garden_location_id AND user_id = requesting_user_id())
  );

-- Add latitude and longitude columns to garden_locations for easier querying
-- These can be computed from the PostGIS geography column
ALTER TABLE public.garden_locations ADD COLUMN IF NOT EXISTS latitude FLOAT;
ALTER TABLE public.garden_locations ADD COLUMN IF NOT EXISTS longitude FLOAT;

-- Trigger to auto-populate lat/lng from geography
CREATE OR REPLACE FUNCTION update_garden_coords()
RETURNS TRIGGER AS $$
BEGIN
  NEW.latitude := extensions.st_y(NEW.location::extensions.geometry);
  NEW.longitude := extensions.st_x(NEW.location::extensions.geometry);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_garden_location_change
BEFORE INSERT OR UPDATE OF location ON public.garden_locations
FOR EACH ROW EXECUTE FUNCTION update_garden_coords();

-- Create storage bucket for photos
-- Note: Run this in Supabase Dashboard > Storage
-- INSERT INTO storage.buckets (id, name, public) VALUES ('photos', 'photos', true);

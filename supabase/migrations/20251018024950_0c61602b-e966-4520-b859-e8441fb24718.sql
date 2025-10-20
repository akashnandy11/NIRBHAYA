-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  voice_keyword TEXT, -- Secret keyword for voice activation
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- SOS Alerts table
CREATE TABLE public.sos_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'resolved')),
  trigger_type TEXT NOT NULL CHECK (trigger_type IN ('multi_tap', 'voice', 'manual')),
  tap_count INTEGER,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  location_accuracy DECIMAL(10, 2),
  recording_url TEXT,
  is_recording BOOLEAN DEFAULT false,
  responders_notified INTEGER DEFAULT 0,
  police_notified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  cancelled_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ
);

ALTER TABLE public.sos_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own alerts"
  ON public.sos_alerts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own alerts"
  ON public.sos_alerts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own alerts"
  ON public.sos_alerts FOR UPDATE
  USING (auth.uid() = user_id);

-- Verified responders table
CREATE TABLE public.responders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  responder_type TEXT NOT NULL CHECK (responder_type IN ('delivery', 'rideshare', 'security', 'volunteer')),
  kyc_verified BOOLEAN DEFAULT false,
  police_verified BOOLEAN DEFAULT false,
  aadhaar_number TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_available BOOLEAN DEFAULT true,
  reward_points INTEGER DEFAULT 0,
  total_responses INTEGER DEFAULT 0,
  rating DECIMAL(3, 2),
  account_status TEXT DEFAULT 'active' CHECK (account_status IN ('active', 'suspended', 'flagged')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.responders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active responders"
  ON public.responders FOR SELECT
  USING (account_status = 'active' AND is_available = true);

CREATE POLICY "Responders can update own profile"
  ON public.responders FOR UPDATE
  USING (auth.uid() = user_id);

-- Alert responses table (tracks who responded to which alert)
CREATE TABLE public.alert_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  alert_id UUID REFERENCES public.sos_alerts(id) ON DELETE CASCADE NOT NULL,
  responder_id UUID REFERENCES public.responders(id) ON DELETE CASCADE NOT NULL,
  response_time_seconds INTEGER,
  distance_km DECIMAL(10, 2),
  gps_verified BOOLEAN DEFAULT false,
  suspicious_activity BOOLEAN DEFAULT false,
  user_rating INTEGER CHECK (user_rating >= 1 AND user_rating <= 5),
  reward_earned INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

ALTER TABLE public.alert_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view responses to their alerts"
  ON public.alert_responses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.sos_alerts 
      WHERE id = alert_responses.alert_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Responders can view their responses"
  ON public.alert_responses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.responders 
      WHERE id = alert_responses.responder_id 
      AND user_id = auth.uid()
    )
  );

-- Safe places table
CREATE TABLE public.safe_places (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  place_type TEXT NOT NULL CHECK (place_type IN ('metro', 'cafe', 'police', 'store', 'mall', 'hospital', 'hotel')),
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  safety_rating TEXT NOT NULL DEFAULT 'medium' CHECK (safety_rating IN ('maximum', 'high', 'medium', 'low')),
  is_verified BOOLEAN DEFAULT false,
  is_open_24_7 BOOLEAN DEFAULT false,
  operating_hours TEXT,
  has_cctv BOOLEAN DEFAULT false,
  has_security BOOLEAN DEFAULT false,
  emergency_contact TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.safe_places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view safe places"
  ON public.safe_places FOR SELECT
  USING (is_verified = true);

-- Evidence/recordings metadata table
CREATE TABLE public.evidence (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  alert_id UUID REFERENCES public.sos_alerts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('audio', 'video')),
  file_size_bytes INTEGER,
  storage_path TEXT NOT NULL,
  duration_seconds INTEGER,
  is_encrypted BOOLEAN DEFAULT true,
  shared_with_police BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.evidence ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own evidence"
  ON public.evidence FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own evidence"
  ON public.evidence FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create storage bucket for recordings
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'emergency-recordings',
  'emergency-recordings',
  false,
  104857600, -- 100MB limit
  ARRAY['audio/webm', 'audio/wav', 'audio/mp3', 'video/webm', 'video/mp4']
) ON CONFLICT (id) DO NOTHING;

-- Storage policies for recordings
CREATE POLICY "Users can upload own recordings"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'emergency-recordings' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own recordings"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'emergency-recordings' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Auto-update timestamps trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_responders_updated_at
  BEFORE UPDATE ON public.responders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_safe_places_updated_at
  BEFORE UPDATE ON public.safe_places
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample safe places
INSERT INTO public.safe_places (name, place_type, address, latitude, longitude, safety_rating, is_verified, is_open_24_7, has_cctv, has_security)
VALUES
  ('Central Metro Station', 'metro', 'Connaught Place, New Delhi', 28.6315, 77.2167, 'high', true, true, true, true),
  ('Cafe Coffee Day - CP', 'cafe', 'Block A, Connaught Place', 28.6328, 77.2197, 'high', true, false, true, false),
  ('Police Outpost CP', 'police', 'Inner Circle, Connaught Place', 28.6304, 77.2177, 'maximum', true, true, true, true),
  ('24/7 Medical Store', 'store', 'Janpath Market', 28.6229, 77.2195, 'medium', true, true, true, false),
  ('Select Citywalk Mall', 'mall', 'Saket District Centre', 28.5244, 77.2066, 'high', true, false, true, true),
  ('Apollo Hospital', 'hospital', 'Sarita Vihar', 28.5355, 77.2910, 'maximum', true, true, true, true);

-- Enable realtime for critical tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.sos_alerts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.alert_responses;
-- Create enum for license tier types
CREATE TYPE public.license_tier_type AS ENUM (
    'basic',
    'standard', 
    'premium',
    'enterprise'
);

-- Create enum for license duration
CREATE TYPE public.license_duration AS ENUM (
    'perpetual',
    'annual',
    'monthly',
    'custom'
);

-- Create licensing_tiers table
CREATE TABLE public.licensing_tiers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type license_tier_type NOT NULL,
    description TEXT,
    features JSONB NOT NULL DEFAULT '[]',
    max_tracks INTEGER,
    max_storage_gb INTEGER,
    max_downloads_per_month INTEGER,
    max_team_members INTEGER DEFAULT 1,
    price_monthly DECIMAL(10,2),
    price_annual DECIMAL(10,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create user_subscriptions table to track user subscriptions
CREATE TABLE public.user_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    tier_id UUID REFERENCES public.licensing_tiers(id),
    status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'expired', 'trial')),
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    trial_ends_at TIMESTAMP WITH TIME ZONE,
    cancellation_date TIMESTAMP WITH TIME ZONE,
    payment_provider TEXT,
    payment_provider_subscription_id TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    UNIQUE(user_id, tier_id)
);

-- Create license_grants table to track individual licenses
CREATE TABLE public.license_grants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    track_id UUID REFERENCES public.tracks(id) ON DELETE CASCADE,
    license_type TEXT NOT NULL,
    duration license_duration NOT NULL,
    territories TEXT[] DEFAULT ARRAY['Worldwide'],
    usage_types TEXT[] NOT NULL,
    restrictions TEXT[],
    price DECIMAL(10,2) NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'active', 'expired', 'revoked')),
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create usage_tracking table
CREATE TABLE public.usage_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES public.user_subscriptions(id) ON DELETE CASCADE,
    track_count INTEGER DEFAULT 0,
    storage_used_bytes BIGINT DEFAULT 0,
    downloads_this_month INTEGER DEFAULT 0,
    team_members_count INTEGER DEFAULT 1,
    last_calculated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.licensing_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.license_grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;

-- Create policies for licensing_tiers
CREATE POLICY "Licensing tiers are viewable by everyone" 
    ON public.licensing_tiers FOR SELECT
    USING (true);

-- Create policies for user_subscriptions
CREATE POLICY "Users can view their own subscriptions" 
    ON public.user_subscriptions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions"
    ON public.user_subscriptions FOR UPDATE
    USING (auth.uid() = user_id);

-- Create policies for license_grants
CREATE POLICY "Users can view their own licenses"
    ON public.license_grants FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own licenses"
    ON public.license_grants FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create policies for usage_tracking
CREATE POLICY "Users can view their own usage"
    ON public.usage_tracking FOR SELECT
    USING (auth.uid() = user_id);

-- Insert default licensing tiers
INSERT INTO public.licensing_tiers 
    (name, type, description, features, max_tracks, max_storage_gb, max_downloads_per_month, max_team_members, price_monthly, price_annual)
VALUES
    (
        'Basic', 
        'basic',
        'Perfect for independent artists just getting started',
        '[
            "Up to 10 tracks",
            "5GB storage",
            "Basic analytics",
            "Standard support"
        ]',
        10,
        5,
        50,
        1,
        9.99,
        99.99
    ),
    (
        'Standard',
        'standard',
        'Great for growing artists and small labels',
        '[
            "Up to 50 tracks",
            "25GB storage",
            "Advanced analytics",
            "Priority support",
            "Custom license templates"
        ]',
        50,
        25,
        200,
        3,
        24.99,
        249.99
    ),
    (
        'Premium',
        'premium',
        'For professional artists and established labels',
        '[
            "Up to 200 tracks",
            "100GB storage",
            "Premium analytics",
            "24/7 support",
            "Custom license templates",
            "API access",
            "Bulk operations"
        ]',
        200,
        100,
        1000,
        10,
        49.99,
        499.99
    ),
    (
        'Enterprise',
        'enterprise',
        'Custom solutions for large organizations',
        '[
            "Unlimited tracks",
            "Custom storage limit",
            "Enterprise analytics",
            "Dedicated support",
            "Custom features",
            "Full API access",
            "Custom integrations"
        ]',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    );

-- Create function to calculate user usage
CREATE OR REPLACE FUNCTION public.calculate_user_usage()
RETURNS TRIGGER AS $$
BEGIN
    -- Update usage tracking
    INSERT INTO public.usage_tracking (
        user_id,
        subscription_id,
        track_count,
        storage_used_bytes,
        downloads_this_month,
        team_members_count,
        last_calculated_at
    )
    SELECT
        NEW.user_id,
        NEW.id,
        (SELECT COUNT(*) FROM public.tracks WHERE artist_id = NEW.user_id),
        COALESCE((SELECT SUM(CAST(metadata->>'file_size' AS BIGINT)) FROM public.tracks WHERE artist_id = NEW.user_id), 0),
        COALESCE((SELECT downloads_this_month FROM public.usage_tracking WHERE user_id = NEW.user_id), 0),
        1,
        NOW()
    ON CONFLICT (user_id)
    DO UPDATE SET
        subscription_id = EXCLUDED.subscription_id,
        track_count = EXCLUDED.track_count,
        storage_used_bytes = EXCLUDED.storage_used_bytes,
        last_calculated_at = EXCLUDED.last_calculated_at;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for usage calculation
CREATE TRIGGER on_subscription_change
    AFTER INSERT OR UPDATE ON public.user_subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION public.calculate_user_usage();

-- Add subscription_id to tracks table
ALTER TABLE public.tracks
    ADD COLUMN subscription_id UUID REFERENCES public.user_subscriptions(id),
    ADD COLUMN license_required BOOLEAN DEFAULT true; 
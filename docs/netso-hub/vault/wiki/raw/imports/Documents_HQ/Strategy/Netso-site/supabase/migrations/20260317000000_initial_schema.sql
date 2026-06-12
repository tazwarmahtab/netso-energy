-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- User roles enum
CREATE TYPE user_role AS ENUM ('customer', 'internal', 'investor');

-- User profiles (role assignment)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  role user_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sites (tenant root)
CREATE TABLE sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  location GEOGRAPHY(POINT),
  rooftop_size_sqm DECIMAL(10,2),
  capacity_kw DECIMAL(10,2) NOT NULL,
  pergola_type TEXT,
  inverter_brand TEXT,
  inverter_serial TEXT,
  status TEXT DEFAULT 'prospect',
  installed_at TIMESTAMPTZ,
  activated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lead pipeline
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  rooftop_size_sqm DECIMAL(10,2),
  current_monthly_bill DECIMAL(12,2),
  status TEXT DEFAULT 'new',
  assigned_to UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_assignment CHECK (
    (status = 'new' AND assigned_to IS NULL) OR (status != 'new' AND assigned_to IS NOT NULL)
  )
);

-- Proposals
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  site_id UUID REFERENCES sites(id),
  proposed_capacity_kw DECIMAL(10,2),
  estimated_production_kwh_year DECIMAL(12,2),
  proposed_tariff_bdt_per_kwh DECIMAL(10,4),
  contract_duration_years INT DEFAULT 20,
  proposal_document_url TEXT,
  status TEXT DEFAULT 'pending',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Production data (time-series)
CREATE TABLE production_data (
  id BIGSERIAL,
  site_id UUID REFERENCES sites(id) NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  production_w DECIMAL(12,2),
  daily_kwh DECIMAL(12,4),
  consumption_kwh DECIMAL(12,4),
  grid_export_kwh DECIMAL(12,4),
  temperature_c DECIMAL(6,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alerts
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES sites(id),
  type TEXT NOT NULL,
  severity TEXT DEFAULT 'warning',
  message TEXT,
  resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_production_data_site_timestamp ON production_data(site_id, timestamp DESC);
CREATE INDEX idx_sites_customer ON sites(customer_id);
CREATE INDEX idx_leads_status ON leads(status);

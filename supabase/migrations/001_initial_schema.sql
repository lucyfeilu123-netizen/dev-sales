-- DevSales Initial Schema
-- Sales system for website developers

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Contacts
create table contacts (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  company_id uuid,
  source text default 'other' not null,
  tags text[] default '{}' not null,
  score integer default 0 not null,
  avatar_url text,
  notes text,
  position text
);

-- Companies
create table companies (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  website text,
  industry text default 'other' not null,
  size text,
  budget_range text,
  current_site_score integer,
  logo_url text,
  address text,
  city text,
  state text
);

-- Add foreign key for contacts -> companies
alter table contacts
  add constraint contacts_company_id_fkey
  foreign key (company_id) references companies(id) on delete set null;

-- Deals
create table deals (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  contact_id uuid references contacts(id) on delete set null,
  company_id uuid references companies(id) on delete set null,
  stage text default 'lead' not null,
  value numeric(12,2) default 0 not null,
  probability integer default 20 not null,
  expected_close_date date,
  actual_close_date date,
  notes text
);

-- Activities
create table activities (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now() not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  deal_id uuid references deals(id) on delete cascade,
  contact_id uuid references contacts(id) on delete cascade,
  type text not null,
  subject text not null,
  body text,
  scheduled_at timestamptz,
  completed_at timestamptz
);

-- Proposals
create table proposals (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  deal_id uuid references deals(id) on delete cascade not null,
  title text not null,
  content_json jsonb default '{}' not null,
  status text default 'draft' not null,
  sent_at timestamptz,
  viewed_at timestamptz,
  signed_at timestamptz,
  total_value numeric(12,2) default 0 not null
);

-- Invoices
create table invoices (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now() not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  deal_id uuid references deals(id) on delete cascade not null,
  amount numeric(12,2) not null,
  status text default 'draft' not null,
  stripe_invoice_id text,
  due_date date not null,
  paid_at timestamptz,
  description text
);

-- Email templates
create table email_templates (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now() not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  subject text not null,
  body text not null,
  category text default 'general' not null
);

-- Website audits
create table website_audits (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now() not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  company_id uuid references companies(id) on delete cascade not null,
  url text not null,
  lighthouse_score jsonb,
  recommendations text[],
  status text default 'pending' not null
);

-- Indexes
create index idx_contacts_user_id on contacts(user_id);
create index idx_contacts_company_id on contacts(company_id);
create index idx_contacts_email on contacts(email);
create index idx_companies_user_id on companies(user_id);
create index idx_deals_user_id on deals(user_id);
create index idx_deals_stage on deals(stage);
create index idx_deals_contact_id on deals(contact_id);
create index idx_activities_deal_id on activities(deal_id);
create index idx_proposals_deal_id on proposals(deal_id);
create index idx_invoices_deal_id on invoices(deal_id);

-- Row Level Security
alter table contacts enable row level security;
alter table companies enable row level security;
alter table deals enable row level security;
alter table activities enable row level security;
alter table proposals enable row level security;
alter table invoices enable row level security;
alter table email_templates enable row level security;
alter table website_audits enable row level security;

-- RLS Policies (users can only see their own data)
create policy "Users can view own contacts" on contacts for select using (auth.uid() = user_id);
create policy "Users can insert own contacts" on contacts for insert with check (auth.uid() = user_id);
create policy "Users can update own contacts" on contacts for update using (auth.uid() = user_id);
create policy "Users can delete own contacts" on contacts for delete using (auth.uid() = user_id);

create policy "Users can view own companies" on companies for select using (auth.uid() = user_id);
create policy "Users can insert own companies" on companies for insert with check (auth.uid() = user_id);
create policy "Users can update own companies" on companies for update using (auth.uid() = user_id);
create policy "Users can delete own companies" on companies for delete using (auth.uid() = user_id);

create policy "Users can view own deals" on deals for select using (auth.uid() = user_id);
create policy "Users can insert own deals" on deals for insert with check (auth.uid() = user_id);
create policy "Users can update own deals" on deals for update using (auth.uid() = user_id);
create policy "Users can delete own deals" on deals for delete using (auth.uid() = user_id);

create policy "Users can view own activities" on activities for select using (auth.uid() = user_id);
create policy "Users can insert own activities" on activities for insert with check (auth.uid() = user_id);
create policy "Users can update own activities" on activities for update using (auth.uid() = user_id);
create policy "Users can delete own activities" on activities for delete using (auth.uid() = user_id);

create policy "Users can view own proposals" on proposals for select using (auth.uid() = user_id);
create policy "Users can insert own proposals" on proposals for insert with check (auth.uid() = user_id);
create policy "Users can update own proposals" on proposals for update using (auth.uid() = user_id);
create policy "Users can delete own proposals" on proposals for delete using (auth.uid() = user_id);

create policy "Users can view own invoices" on invoices for select using (auth.uid() = user_id);
create policy "Users can insert own invoices" on invoices for insert with check (auth.uid() = user_id);
create policy "Users can update own invoices" on invoices for update using (auth.uid() = user_id);
create policy "Users can delete own invoices" on invoices for delete using (auth.uid() = user_id);

create policy "Users can view own templates" on email_templates for select using (auth.uid() = user_id);
create policy "Users can insert own templates" on email_templates for insert with check (auth.uid() = user_id);
create policy "Users can update own templates" on email_templates for update using (auth.uid() = user_id);
create policy "Users can delete own templates" on email_templates for delete using (auth.uid() = user_id);

create policy "Users can view own audits" on website_audits for select using (auth.uid() = user_id);
create policy "Users can insert own audits" on website_audits for insert with check (auth.uid() = user_id);
create policy "Users can update own audits" on website_audits for update using (auth.uid() = user_id);
create policy "Users can delete own audits" on website_audits for delete using (auth.uid() = user_id);

-- Updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger contacts_updated_at before update on contacts for each row execute function update_updated_at();
create trigger companies_updated_at before update on companies for each row execute function update_updated_at();
create trigger deals_updated_at before update on deals for each row execute function update_updated_at();
create trigger proposals_updated_at before update on proposals for each row execute function update_updated_at();

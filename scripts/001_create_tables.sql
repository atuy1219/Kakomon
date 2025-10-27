-- プロフィールテーブル
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  email text not null,
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_all"
  on public.profiles for select
  using (true);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- 学部テーブル
create table if not exists public.faculties (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamp with time zone default now()
);

alter table public.faculties enable row level security;

create policy "faculties_select_all"
  on public.faculties for select
  using (true);

-- 学科テーブル
create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),
  faculty_id uuid not null references public.faculties(id) on delete cascade,
  name text not null,
  created_at timestamp with time zone default now(),
  unique(faculty_id, name)
);

alter table public.departments enable row level security;

create policy "departments_select_all"
  on public.departments for select
  using (true);

-- 科目テーブル
create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  department_id uuid not null references public.departments(id) on delete cascade,
  name text not null,
  created_at timestamp with time zone default now(),
  unique(department_id, name)
);

alter table public.subjects enable row level security;

create policy "subjects_select_all"
  on public.subjects for select
  using (true);

-- 教授テーブル
create table if not exists public.professors (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  name text not null,
  created_at timestamp with time zone default now(),
  unique(subject_id, name)
);

alter table public.professors enable row level security;

create policy "professors_select_all"
  on public.professors for select
  using (true);

-- 過去問テーブル
create table if not exists public.past_exams (
  id uuid primary key default gen_random_uuid(),
  professor_id uuid not null references public.professors(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  content text not null,
  year integer,
  semester text,
  created_at timestamp with time zone default now()
);

alter table public.past_exams enable row level security;

create policy "past_exams_select_all"
  on public.past_exams for select
  using (true);

create policy "past_exams_insert_own"
  on public.past_exams for insert
  with check (auth.uid() = user_id);

create policy "past_exams_update_own"
  on public.past_exams for update
  using (auth.uid() = user_id);

create policy "past_exams_delete_own"
  on public.past_exams for delete
  using (auth.uid() = user_id);

-- 質問テーブル
create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  past_exam_id uuid not null references public.past_exams(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  content text not null,
  created_at timestamp with time zone default now()
);

alter table public.questions enable row level security;

create policy "questions_select_all"
  on public.questions for select
  using (true);

create policy "questions_insert_own"
  on public.questions for insert
  with check (auth.uid() = user_id);

create policy "questions_update_own"
  on public.questions for update
  using (auth.uid() = user_id);

create policy "questions_delete_own"
  on public.questions for delete
  using (auth.uid() = user_id);

-- ユーザーAPIキーテーブル（AI機能用）
create table if not exists public.user_api_keys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade unique,
  api_key text not null,
  provider text not null default 'openai',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.user_api_keys enable row level security;

create policy "user_api_keys_select_own"
  on public.user_api_keys for select
  using (auth.uid() = user_id);

create policy "user_api_keys_insert_own"
  on public.user_api_keys for insert
  with check (auth.uid() = user_id);

create policy "user_api_keys_update_own"
  on public.user_api_keys for update
  using (auth.uid() = user_id);

create policy "user_api_keys_delete_own"
  on public.user_api_keys for delete
  using (auth.uid() = user_id);

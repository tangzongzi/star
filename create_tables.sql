-- 创建 tasks 表
create table public.tasks (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) not null,
  title text not null,
  description text,
  points integer not null default 0,
  status text not null default 'pending',
  parent_id uuid references auth.users(id),
  due_date timestamp with time zone,
  completed_at timestamp with time zone
);

-- 设置 tasks 表的 RLS 策略
alter table public.tasks enable row level security;

-- 允许已认证用户查看自己的任务
create policy "Users can view their own tasks"
  on public.tasks for select
  using (auth.uid() = user_id);

-- 允许家长查看其子女的任务
create policy "Parents can view their children's tasks"
  on public.tasks for select
  using (auth.uid() = parent_id);

-- 允许已认证用户创建任务
create policy "Users can create tasks"
  on public.tasks for insert
  with check (auth.uid() = user_id);

-- 允许用户更新自己的任务
create policy "Users can update their own tasks"
  on public.tasks for update
  using (auth.uid() = user_id);

-- 允许家长更新其子女的任务
create policy "Parents can update their children's tasks"
  on public.tasks for update
  using (auth.uid() = parent_id);

-- 创建 rewards 表
create table public.rewards (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) not null,
  title text not null,
  description text,
  points_required integer not null default 0,
  status text not null default 'available',
  parent_id uuid references auth.users(id),
  redeemed_at timestamp with time zone
);

-- 设置 rewards 表的 RLS 策略
alter table public.rewards enable row level security;

-- 允许已认证用户查看可用的奖励
create policy "Users can view available rewards"
  on public.rewards for select
  using (auth.uid() = user_id);

-- 允许家长创建奖励
create policy "Parents can create rewards"
  on public.rewards for insert
  with check (auth.uid() = parent_id);

-- 允许家长更新奖励
create policy "Parents can update rewards"
  on public.rewards for update
  using (auth.uid() = parent_id); 
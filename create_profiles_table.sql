-- 创建用户资料表，用于保存更多用户信息
create table public.profiles (
  id uuid references auth.users(id) primary key,
  username text unique not null,
  role text not null default 'parent',
  points integer not null default 0,
  parent_id uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 设置 profiles 表的 RLS 策略
alter table public.profiles enable row level security;

-- 允许已认证用户读取自己的资料
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- 允许父母读取子女的资料
create policy "Parents can view their children's profiles"
  on public.profiles for select
  using (exists (
    select 1 from public.profiles
    where profiles.parent_id = auth.uid()
  ));

-- 允许已认证用户更新自己的资料
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 创建用户注册触发器函数
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, role, points, parent_id)
  values (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'role',
    coalesce((new.raw_user_meta_data->>'points')::int, 0),
    (case
      when new.raw_user_meta_data->>'role' = 'child' and new.raw_user_meta_data->>'parentUsername' is not null then
        (select id from auth.users u join public.profiles p on u.id = p.id where p.username = new.raw_user_meta_data->>'parentUsername')
      else null
    end)
  );
  return new;
end;
$$ language plpgsql security definer;

-- 创建触发器
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user(); 
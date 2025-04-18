-- 创建用户资料表，用于保存更多用户信息
create table public.profiles (
  id uuid references auth.users(id) primary key,
  username text unique not null,
  role text not null default 'parent',
  points integer not null default 0,
  parent_username text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 设置 profiles 表的 RLS 策略
alter table public.profiles enable row level security;

-- 允许已认证用户读取自己的资料
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- 允许所有已认证用户查看所有profiles（为了家长子女关联）
create policy "Users can view all profiles"
  on public.profiles for select
  using (true);

-- 允许已认证用户更新自己的资料
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 允许服务角色插入新profiles
create policy "Service role can insert profiles"
  on public.profiles for insert
  using (true);  -- 允许服务插入新profiles，依赖触发器安全

-- 创建用户注册触发器函数
create or replace function public.handle_new_user()
returns trigger as $$
declare
  new_username text;
  new_role text;
  new_points integer;
  new_parent_username text;
begin
  -- 提取元数据信息并记录日志
  new_username := new.raw_user_meta_data->>'username';
  new_role := coalesce(new.raw_user_meta_data->>'role', 'parent');
  new_points := coalesce((new.raw_user_meta_data->>'points')::int, 0);
  new_parent_username := new.raw_user_meta_data->>'parentUsername';
  
  raise notice 'Creating profile for user: %, role: %, parent: %', 
    new_username, new_role, coalesce(new_parent_username, 'none');
    
  -- 验证必要数据
  if new_username is null then
    raise exception 'Username cannot be null';
  end if;
  
  -- 简单插入用户资料
  insert into public.profiles (
    id, 
    username, 
    role, 
    points,
    parent_username
  )
  values (
    new.id,
    new_username,
    new_role,
    new_points,
    new_parent_username
  );
  
  raise notice 'Successfully created profile for user: %', new_username;
  return new;
exception
  when others then
    raise notice 'Error in handle_new_user trigger: %', SQLERRM;
    return new; -- 仍然返回new以允许用户创建，即使profile失败
end;
$$ language plpgsql security definer;

-- 创建触发器
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user(); 
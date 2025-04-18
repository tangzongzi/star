-- 创建一个简单的函数，返回服务器状态
create or replace function public.get_service_status()
returns json
language sql
security definer
as $$
  select json_build_object(
    'server_time', now(),
    'is_working', true,
    'supabase_version', current_setting('server_version'),
    'message', '服务连接正常'
  );
$$; 
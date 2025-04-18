-- 重新创建更稳健的触发器函数
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_username text;
  new_role text;
  new_points integer;
  new_parent_username text;
BEGIN
  -- 提取元数据信息
  new_username := new.raw_user_meta_data->>'username';
  new_role := coalesce(new.raw_user_meta_data->>'role', 'parent');
  new_points := coalesce((new.raw_user_meta_data->>'points')::int, 0);
  new_parent_username := new.raw_user_meta_data->>'parentUsername';
  
  -- 日志记录
  RAISE NOTICE 'Creating profile for user: %, role: %, parent: %', 
    new_username, new_role, coalesce(new_parent_username, 'none');
  
  -- 检查是否已存在相同用户名的档案
  PERFORM 1 FROM public.profiles WHERE username = new_username;
  IF FOUND THEN
    RAISE NOTICE 'Profile with username % already exists. Skipping creation.', new_username;
    RETURN new;
  END IF;
  
  -- 创建用户档案
  INSERT INTO public.profiles (
    id, 
    username, 
    role, 
    points,
    parent_username,
    created_at,
    updated_at
  )
  VALUES (
    new.id,
    new_username,
    new_role,
    new_points,
    new_parent_username,
    NOW(),
    NOW()
  );
  
  RAISE NOTICE 'Successfully created profile for user: %', new_username;
  RETURN new;
EXCEPTION
  WHEN unique_violation THEN
    RAISE NOTICE 'Profile with user ID or username already exists';
    RETURN new;
  WHEN OTHERS THEN
    RAISE NOTICE 'Error in handle_new_user trigger: %', SQLERRM;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 重新创建触发器
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user(); 
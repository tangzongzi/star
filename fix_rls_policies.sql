-- 删除现有的可能导致递归的策略
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Service role can insert profiles" ON public.profiles;

-- 创建新的简化策略
-- 允许任何人查看所有profiles（无需认证检查）
CREATE POLICY "Anyone can view all profiles" 
  ON public.profiles FOR SELECT 
  USING (true);

-- 允许任何人插入新profiles（由触发器保证数据完整性）
CREATE POLICY "Anyone can insert profiles"
  ON public.profiles FOR INSERT
  WITH CHECK (true);

-- 允许匹配ID的用户更新自己的资料
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 允许匹配ID的用户删除自己的资料
CREATE POLICY "Users can delete own profile"
  ON public.profiles FOR DELETE
  USING (auth.uid() = id); 
-- 确认用户邮箱的SQL脚本
-- 需要在Supabase的SQL编辑器中运行

-- 查看未确认的用户
SELECT id, email, email_confirmed_at, created_at
FROM auth.users
WHERE email_confirmed_at IS NULL;

-- 为特定用户手动确认邮箱 (替换 'EMAIL_HERE' 为实际用户邮箱)
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email LIKE '%@gmail.com';

-- 或者确认所有用户的邮箱
-- UPDATE auth.users 
-- SET email_confirmed_at = NOW()
-- WHERE email_confirmed_at IS NULL;

-- 确认完成后查看结果
SELECT id, email, email_confirmed_at, created_at
FROM auth.users; 
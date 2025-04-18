# 禁用 Supabase 邮箱确认步骤

在Supabase中，你可以通过以下步骤来禁用强制邮箱确认：

## 方法1：修改项目设置（推荐）

1. 登录 [Supabase 控制台](https://app.supabase.com/)
2. 选择你的项目
3. 在左侧导航栏点击 **Authentication**
4. 点击 **Providers** 选项卡
5. 在 **Email** 部分，关闭 **Confirm email** 选项
6. 点击 **Save** 保存更改

## 方法2：使用SQL确认所有现有用户的邮箱

如果您已经有未确认的用户，可以运行以下SQL脚本来确认所有现有用户的邮箱：

```sql
-- 确认所有未验证的邮箱
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;
```

## 方法3：修改认证设置

1. 登录 [Supabase 控制台](https://app.supabase.com/)
2. 选择你的项目
3. 在左侧导航栏点击 **Authentication**
4. 点击 **Policies** 选项卡
5. 将 **Confirm Email** 设置为 **Optional**
6. 点击 **Save** 保存更改

选择以上任一方法后，用户应该可以在注册后直接登录，无需邮箱确认步骤。 
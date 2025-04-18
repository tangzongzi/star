import { createClient } from '@supabase/supabase-js'

// 获取环境变量
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 检查环境变量配置
console.log('Supabase配置:', { 
  urlConfigured: !!supabaseUrl, 
  keyConfigured: !!supabaseAnonKey,
  urlLength: supabaseUrl?.length || 0,
  keyLength: supabaseAnonKey?.length || 0
})

// 如果URL和密钥未设置，显示警告
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase 环境变量未配置！', {
    VITE_SUPABASE_URL: supabaseUrl ? '已设置' : '未设置',
    VITE_SUPABASE_ANON_KEY: supabaseAnonKey ? '已设置' : '未设置'
  })
}

// 创建Supabase客户端
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
})

// 检查Supabase客户端是否可用
export async function checkSupabaseConnection() {
  try {
    console.log('正在检查Supabase连接...')
    const { data, error } = await supabase.from('profiles').select('count', { count: 'exact' }).limit(1)
    
    if (error) {
      console.error('Supabase连接测试失败:', error)
      return {
        success: false,
        error: error.message,
        details: error
      }
    }
    
    console.log('Supabase连接测试成功:', data)
    return {
      success: true,
      data
    }
  } catch (err) {
    console.error('Supabase连接检查异常:', err)
    return {
      success: false,
      error: err.message,
      details: err
    }
  }
}

// 初始化检查
checkSupabaseConnection().then(result => {
  if (result.success) {
    console.log('✅ Supabase连接正常')
  } else {
    console.error('❌ Supabase连接异常:', result.error)
  }
})

// 用户相关操作
export const auth = {
  // 以用户名注册
  async signUp(username, password, metadata) {
    try {
      console.log('开始注册用户:', { username, metadata })
      
      // 用户名验证 - 只允许字母、数字和下划线
      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      if (!usernameRegex.test(username)) {
        throw new Error('用户名只能包含字母、数字和下划线');
      }
      
      // 使用用户名创建一个有效的邮箱格式
      const email = `${username}@gmail.com`;
      
      console.log('调用supabase.auth.signUp:', { email, hasPassword: !!password, metadata })
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            ...metadata,
            username // 将真实用户名存储在用户元数据中
          }
        }
      })
      
      if (error) {
        console.error('Supabase注册错误:', error)
        throw error
      }
      
      console.log('Supabase注册成功:', { 
        user: data.user?.id,
        session: !!data.session,
        userMetadata: data.user?.user_metadata
      })
      
      return data
    } catch (err) {
      console.error('auth.signUp方法捕获错误:', err)
      throw err
    }
  },

  // 以用户名登录
  async signIn(username, password) {
    try {
      console.log('开始登录用户:', { username })
      
      // 使用用户名创建一个有效的邮箱格式
      const email = `${username}@gmail.com`;
      
      // 简单登录调用
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        console.error('登录错误:', error)
        throw error
      }
      
      console.log('登录成功:', { user: data.user?.id })
      return data
    } catch (err) {
      console.error('auth.signIn方法捕获错误:', err)
      throw err
    }
  },

  // 通过用户名查找用户
  async getUserByUsername(username) {
    try {
      console.log('查询用户:', { username })
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single()
        
      if (error && error.code !== 'PGRST116') {
        console.error('查询用户错误:', error)
        throw error
      }
      
      console.log('查询用户结果:', { found: !!data, data })
      return { data }
    } catch (err) {
      console.error('getUserByUsername方法捕获错误:', err)
      throw err
    }
  },

  // 登出
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }
}

// 任务相关操作
export const tasks = {
  // 创建任务
  async create(task) {
    const { data, error } = await supabase
      .from('tasks')
      .insert(task)
      .select()
      .single()
    if (error) throw error
    return data
  },

  // 获取任务列表
  async list(userId, filters = {}) {
    let query = supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
    
    if (filters.status) {
      query = query.eq('status', filters.status)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data
  },

  // 更新任务
  async update(taskId, updates) {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', taskId)
      .select()
      .single()
    if (error) throw error
    return data
  },

  // 删除任务
  async delete(taskId) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)
    if (error) throw error
  }
}

// 奖励相关操作
export const rewards = {
  // 创建奖励
  async create(reward) {
    const { data, error } = await supabase
      .from('rewards')
      .insert(reward)
      .select()
      .single()
    if (error) throw error
    return data
  },

  // 获取奖励列表
  async list(userId) {
    const { data, error } = await supabase
      .from('rewards')
      .select('*')
      .eq('user_id', userId)
    if (error) throw error
    return data
  },

  // 更新奖励
  async update(rewardId, updates) {
    const { data, error } = await supabase
      .from('rewards')
      .update(updates)
      .eq('id', rewardId)
      .select()
      .single()
    if (error) throw error
    return data
  },

  // 删除奖励
  async delete(rewardId) {
    const { error } = await supabase
      .from('rewards')
      .delete()
      .eq('id', rewardId)
    if (error) throw error
  }
}

// 用户积分相关操作
export const points = {
  // 获取用户积分
  async get(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('points')
      .eq('id', userId)
      .single()
    if (error) throw error
    return data.points
  },

  // 更新用户积分
  async update(userId, points) {
    const { data, error } = await supabase
      .from('users')
      .update({ points })
      .eq('id', userId)
      .select()
      .single()
    if (error) throw error
    return data.points
  }
} 
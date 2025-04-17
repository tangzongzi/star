import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 用户相关操作
export const auth = {
  // 注册
  async signUp(email, password, metadata) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    if (error) throw error
    return data
  },

  // 登录
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    return data
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
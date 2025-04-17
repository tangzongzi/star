import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { auth, tasks, rewards, points } from '../lib/supabase'

export const useAppStore = defineStore('app', () => {
  const currentUser = ref(null)
  const notifications = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // 用户认证相关
  const isAuthenticated = computed(() => !!currentUser.value)
  const userRole = computed(() => currentUser.value?.user_metadata?.role || '')
  const userPoints = computed(() => currentUser.value?.user_metadata?.points || 0)

  // 注册
  async function register({ email, password, role, parentEmail }) {
    try {
      isLoading.value = true
      error.value = null
      
      // 如果是子账户，验证父账户是否存在
      if (role === 'child' && parentEmail) {
        const { data: parentUser } = await auth.getUserByEmail(parentEmail)
        if (!parentUser) {
          throw new Error('父账户不存在')
        }
      }

      const { user } = await auth.signUp(email, password, {
        role,
        points: 0,
        parentEmail
      })

      currentUser.value = user
      notify({
        type: 'success',
        message: '注册成功！'
      })
      
      return user
    } catch (e) {
      error.value = e.message
      notify({
        type: 'error',
        message: e.message
      })
      throw e
    } finally {
      isLoading.value = false
    }
  }

  // 登录
  async function login(email, password) {
    try {
      isLoading.value = true
      error.value = null
      
      const { user } = await auth.signIn(email, password)
      currentUser.value = user
      
      notify({
        type: 'success',
        message: '登录成功！'
      })
      
      return user
    } catch (e) {
      error.value = e.message
      notify({
        type: 'error',
        message: e.message
      })
      throw e
    } finally {
      isLoading.value = false
    }
  }

  // 登出
  async function logout() {
    try {
      await auth.signOut()
      currentUser.value = null
      notify({
        type: 'success',
        message: '已安全退出'
      })
    } catch (e) {
      error.value = e.message
      notify({
        type: 'error',
        message: e.message
      })
    }
  }

  // 处理认证状态变化
  function handleAuthChange(event, session) {
    if (event === 'SIGNED_IN' && session) {
      currentUser.value = session.user
    } else if (event === 'SIGNED_OUT') {
      currentUser.value = null
    }
  }

  // 设置会话
  async function setSession(session) {
    if (session) {
      currentUser.value = session.user
    } else {
      currentUser.value = null
    }
  }

  // 任务相关
  async function createTask(task) {
    try {
      isLoading.value = true
      error.value = null
      
      const newTask = await tasks.create({
        ...task,
        user_id: currentUser.value.id
      })
      
      notify({
        type: 'success',
        message: '任务创建成功！'
      })
      
      return newTask
    } catch (e) {
      error.value = e.message
      notify({
        type: 'error',
        message: e.message
      })
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function updateTask(taskId, updates) {
    try {
      isLoading.value = true
      error.value = null
      
      const updatedTask = await tasks.update(taskId, updates)
      
      notify({
        type: 'success',
        message: '任务更新成功！'
      })
      
      return updatedTask
    } catch (e) {
      error.value = e.message
      notify({
        type: 'error',
        message: e.message
      })
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function deleteTask(taskId) {
    try {
      isLoading.value = true
      error.value = null
      
      await tasks.delete(taskId)
      
      notify({
        type: 'success',
        message: '任务已删除'
      })
    } catch (e) {
      error.value = e.message
      notify({
        type: 'error',
        message: e.message
      })
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function getTasks(filters = {}) {
    try {
      isLoading.value = true
      error.value = null
      
      return await tasks.list(currentUser.value.id, filters)
    } catch (e) {
      error.value = e.message
      notify({
        type: 'error',
        message: e.message
      })
      throw e
    } finally {
      isLoading.value = false
    }
  }

  // 积分相关
  async function updatePoints(userId, newPoints) {
    try {
      isLoading.value = true
      error.value = null
      
      const updatedPoints = await points.update(userId, newPoints)
      
      // 更新当前用户的积分
      if (currentUser.value.id === userId) {
        currentUser.value = {
          ...currentUser.value,
          user_metadata: {
            ...currentUser.value.user_metadata,
            points: updatedPoints
          }
        }
      }
      
      notify({
        type: 'success',
        message: '积分更新成功！'
      })
      
      return updatedPoints
    } catch (e) {
      error.value = e.message
      notify({
        type: 'error',
        message: e.message
      })
      throw e
    } finally {
      isLoading.value = false
    }
  }

  // 通知相关
  function notify({ type = 'info', message, duration = 3000 }) {
    const id = Date.now()
    notifications.value.push({ id, type, message })
    
    setTimeout(() => {
      dismissNotification(id)
    }, duration)
  }

  // 关闭通知
  function dismissNotification(id) {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  return {
    // 状态
    currentUser,
    notifications,
    isLoading,
    error,
    
    // 计算属性
    isAuthenticated,
    userRole,
    userPoints,
    
    // 方法
    register,
    login,
    logout,
    handleAuthChange,
    setSession,
    createTask,
    updateTask,
    deleteTask,
    getTasks,
    updatePoints,
    notify,
    dismissNotification
  }
}) 
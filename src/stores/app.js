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
  const username = computed(() => currentUser.value?.user_metadata?.username || '')

  // 注册
  async function register({ username, password, role, parentUsername }) {
    try {
      isLoading.value = true;
      error.value = null;
      
      console.log("开始注册用户 [app.js]:", { username, role, parentUsername });
      
      // 基本验证
      if (!username || !password) {
        throw new Error('用户名和密码不能为空');
      }
      
      if (password.length < 6) {
        throw new Error('密码长度不能少于6位');
      }
      
      if (role === 'child' && !parentUsername) {
        throw new Error('儿童账户必须指定家长用户名');
      }
      
      // 先检查父账户
      if (role === 'child' && parentUsername) {
        try {
          console.log("正在验证父账户存在性:", parentUsername);
          const { data: parentUser } = await auth.getUserByUsername(parentUsername);
          console.log("查询父账户结果:", parentUser);
          if (!parentUser) {
            console.warn("父账户不存在:", parentUsername);
            throw new Error('父账户不存在');
          }
          
          if (parentUser.role !== 'parent') {
            console.warn("指定的父账户不是家长角色:", parentUser.role);
            throw new Error('指定的账户不是家长账户');
          }
        } catch (err) {
          console.error("查询父账户时出错:", err);
          if (err.message === "父账户不存在" || err.message === "指定的账户不是家长账户") {
            throw err;
          }
          // 其他错误，可能是连接问题，继续尝试注册
          console.warn("尝试继续注册，尽管查询父账户失败");
        }
      }

      console.log("准备调用auth.signUp进行注册");
      const userData = await auth.signUp(username, password, {
        role,
        points: 0,
        parentUsername: role === 'child' ? parentUsername : null
      });
      
      if (!userData || !userData.user) {
        console.error("注册失败，没有返回用户数据");
        throw new Error('注册失败，请稍后重试');
      }
      
      console.log("注册成功，用户数据:", userData);
      currentUser.value = userData.user;
      
      notify({
        type: 'success',
        message: '注册成功！'
      });
      
      return userData.user;
    } catch (e) {
      console.error("注册过程中出错 [app.js]:", e);
      error.value = e.message;
      notify({
        type: 'error',
        message: e.message || '注册失败，请稍后重试'
      });
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  // 登录
  async function login(username, password) {
    try {
      isLoading.value = true
      error.value = null
      
      console.log('开始登录用户:', { username })
      
      // 简单登录，无需处理邮箱验证
      const { user } = await auth.signIn(username, password)
      currentUser.value = user
      
      notify({
        type: 'success',
        message: '登录成功！'
      })
      
      return user
    } catch (e) {
      console.error('登录失败:', e)
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
    username,
    
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
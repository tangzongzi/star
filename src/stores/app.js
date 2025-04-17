import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', {
  state: () => ({
    // 用户信息
    user: null,
    userType: null, // 'parent' | 'child'
    points: 0,
    currentMode: null, // 'parent' | 'child'

    // 通知
    notification: null,
  }),

  actions: {
    // 登录
    async login({ username, password, remember }) {
      // 从 localStorage 获取用户数据
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(u => u.username === username)

      if (!user) {
        throw new Error('用户名不存在')
      }

      if (user.password !== password) {
        throw new Error('密码错误')
      }

      // 设置用户信息
      this.user = {
        username: user.username,
        type: user.type,
      }
      this.userType = user.type
      this.currentMode = user.type

      // 记住登录
      if (remember) {
        localStorage.setItem('currentUser', JSON.stringify(this.user))
      }

      return this.user
    },

    // 注册
    async register({ username, password, userType, parentUsername }) {
      console.log('Registering user with data:', { username, userType, parentUsername })

      if (!username || !password || !userType) {
        throw new Error('请填写所有必填字段')
      }

      // 从 localStorage 获取用户数据
      let users = []
      try {
        const usersStr = localStorage.getItem('users')
        console.log('Current users in localStorage:', usersStr)
        users = usersStr ? JSON.parse(usersStr) : []
      } catch (error) {
        console.error('Failed to parse users from localStorage:', error)
        localStorage.setItem('users', '[]')
        users = []
      }

      // 检查用户名是否已存在
      if (users.some(u => u.username === username)) {
        throw new Error('用户名已存在')
      }

      // 如果是儿童账号，验证家长账号
      if (userType === 'child') {
        if (!parentUsername) {
          throw new Error('请输入家长用户名')
        }
        const parentUser = users.find(u => u.username === parentUsername && u.type === 'parent')
        if (!parentUser) {
          throw new Error('找不到对应的家长账号')
        }
      }

      // 创建新用户
      const newUser = {
        username,
        password,
        type: userType,
        parentUsername: userType === 'child' ? parentUsername : null,
        points: 0,
        createdAt: new Date().toISOString()
      }

      console.log('Creating new user:', newUser)

      // 保存用户数据
      try {
        users.push(newUser)
        const usersStr = JSON.stringify(users)
        console.log('Saving users to localStorage:', usersStr)
        localStorage.setItem('users', usersStr)
        
        // 验证保存是否成功
        const savedUsers = JSON.parse(localStorage.getItem('users'))
        console.log('Verified saved users:', savedUsers)
        if (!savedUsers.some(u => u.username === username)) {
          throw new Error('用户数据保存失败')
        }
      } catch (error) {
        console.error('Failed to save user to localStorage:', error)
        throw new Error('注册失败，请重试')
      }

      return newUser
    },

    // 登出
    logout() {
      this.user = null
      this.userType = null
      this.currentMode = null
      localStorage.removeItem('currentUser')
    },

    // 切换模式（家长/儿童）
    setCurrentMode(mode) {
      if (this.userType === 'parent') {
        this.currentMode = mode
      }
    },

    // 显示通知
    notify(message, type = 'info') {
      this.notification = {
        id: Date.now(),
        message,
        type,
      }
    },

    // 检查登录状态
    checkAuth() {
      const savedUser = localStorage.getItem('currentUser')
      if (savedUser) {
        const user = JSON.parse(savedUser)
        this.user = user
        this.userType = user.type
        this.currentMode = user.type
        return true
      }
      return false
    },
  }
}) 
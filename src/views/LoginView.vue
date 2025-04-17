<template>
  <div class="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- 装饰元素 -->
    <div class="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full filter blur-3xl animate-blob"></div>
    <div class="absolute top-40 right-20 w-64 h-64 bg-indigo-400/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
    <div class="absolute -bottom-20 left-40 w-64 h-64 bg-purple-400/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
    
    <!-- 闪烁的星星 -->
    <div class="stars absolute inset-0">
      <div v-for="i in 20" :key="i" class="star" :style="{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`
      }"></div>
    </div>
    
    <div class="w-full max-w-md relative z-10">
      <div class="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl px-8 pt-8 pb-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            {{ isLogin ? '欢迎回来' : '创建账号' }}
          </h2>
          <p class="mt-2 text-gray-600">{{ isLogin ? '登录您的账号管理任务和奖励' : '注册新账号开始使用星星任务系统' }}</p>
        </div>
        
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- 登录错误提示 -->
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
            {{ error }}
          </div>
          
          <!-- 邮箱 -->
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2" for="email">
              邮箱
            </label>
            <input
              id="email"
              v-model.trim="formData.email"
              class="form-input transition-all duration-200 shadow-sm block w-full rounded-xl border border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
              type="email"
              placeholder="请输入邮箱"
              required
            />
          </div>
          
          <!-- 密码 -->
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2" for="password">
              密码
            </label>
            <input
              id="password"
              v-model="formData.password"
              class="form-input transition-all duration-200 shadow-sm block w-full rounded-xl border border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
              type="password"
              placeholder="请输入密码"
              required
            />
          </div>
          
          <div v-if="!isLogin" class="space-y-5">
            <!-- 确认密码 -->
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2" for="confirm-password">
                确认密码
              </label>
              <input
                id="confirm-password"
                v-model="formData.confirmPassword"
                class="form-input transition-all duration-200 shadow-sm block w-full rounded-xl border border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                type="password"
                placeholder="请再次输入密码"
                required
              />
            </div>
            
            <!-- 账号类型 -->
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2">
                账号类型
              </label>
              <div class="flex space-x-4">
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio text-primary focus:ring-primary/50"
                    v-model="formData.role"
                    name="accountType"
                    value="parent"
                  />
                  <span class="ml-2 text-gray-700">家长</span>
                </label>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio text-primary focus:ring-primary/50"
                    v-model="formData.role"
                    name="accountType"
                    value="child"
                  />
                  <span class="ml-2 text-gray-700">儿童</span>
                </label>
              </div>
            </div>
            
            <!-- 家长账号 -->
            <div v-if="formData.role === 'child'" class="fade-in">
              <label class="block text-gray-700 text-sm font-medium mb-2" for="parentUsername">
                家长邮箱
              </label>
              <input
                id="parentUsername"
                v-model.trim="formData.parentEmail"
                class="form-input transition-all duration-200 shadow-sm block w-full rounded-xl border border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                type="email"
                placeholder="请输入家长的邮箱地址"
                required
              />
            </div>
          </div>
          
          <!-- 记住登录 -->
          <div v-if="isLogin" class="flex items-center justify-between">
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                class="form-checkbox text-primary focus:ring-primary/50 rounded"
                v-model="formData.remember"
              />
              <span class="ml-2 text-sm text-gray-700">记住登录</span>
            </label>
            <button type="button" class="text-sm text-primary hover:text-primary-dark">
              忘记密码?
            </button>
          </div>
          
          <!-- 提交按钮 -->
          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:-translate-y-0.5"
              :disabled="loading"
            >
              <span v-if="loading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                处理中...
              </span>
              <span v-else>{{ isLogin ? '登录' : '注册' }}</span>
            </button>
          </div>
        </form>
        
        <div class="mt-6 text-center">
          <button @click="toggleMode" class="text-sm text-primary hover:text-primary-dark transition-colors">
            {{ isLogin ? '没有账号? 注册' : '已有账号? 登录' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/app'

const router = useRouter()
const appStore = useAppStore()

const isLogin = ref(true)
const loading = ref(false)
const error = ref('')

const formData = ref({
  email: '',
  password: '',
  confirmPassword: '',
  role: 'parent',
  parentEmail: '',
  remember: false
})

// 切换登录/注册模式
function toggleMode() {
  isLogin.value = !isLogin.value
  error.value = ''
}

// 重置家长邮箱
watch(() => formData.value.role, (newVal) => {
  if (newVal !== 'child') {
    formData.value.parentEmail = ''
  }
})

// 处理表单提交
async function handleSubmit() {
  error.value = ''
  loading.value = true
  
  try {
    // 表单验证
    if (!formData.value.email || !formData.value.password) {
      throw new Error('请输入邮箱和密码')
    }
    
    // 注册模式
    if (!isLogin.value) {
      if (formData.value.password.length < 6) {
        throw new Error('密码长度不能少于6位')
      }
      
      if (formData.value.password !== formData.value.confirmPassword) {
        throw new Error('两次输入的密码不一致')
      }
      
      if (formData.value.role === 'child' && !formData.value.parentEmail) {
        throw new Error('请输入家长邮箱')
      }
      
      // 注册新用户
      await appStore.register({
        email: formData.value.email,
        password: formData.value.password,
        role: formData.value.role,
        parentEmail: formData.value.parentEmail
      })
      
      // 注册成功后切换到登录模式
      isLogin.value = true
    } else {
      // 登录
      await appStore.login(formData.value.email, formData.value.password)
      
      // 登录成功后重定向
      const redirectPath = appStore.userRole === 'parent' ? '/parent' : '/child'
      router.push(redirectPath)
    }
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.star {
  position: absolute;
  width: 3px;
  height: 3px;
  background-color: white;
  border-radius: 50%;
  opacity: 0.5;
  animation: twinkle 5s infinite;
}

@keyframes twinkle {
  0% { opacity: 0.2; }
  50% { opacity: 1; }
  100% { opacity: 0.2; }
}
</style> 
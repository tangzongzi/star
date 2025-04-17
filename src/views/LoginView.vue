<template>
  <div class="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
      <!-- 气泡装饰 -->
      <div class="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full filter blur-3xl animate-blob"></div>
      <div class="absolute top-40 right-20 w-64 h-64 bg-indigo-400/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-20 left-40 w-64 h-64 bg-purple-400/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      
      <!-- 闪烁的星星 -->
      <div class="stars">
        <div v-for="i in 20" :key="i" class="star" :style="{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          animationDelay: `${Math.random() * 5}s`
        }"></div>
      </div>
    </div>
    
    <div class="w-full max-w-md relative z-10">
      <div class="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl px-8 pt-10 pb-10">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            {{ isLogin ? '欢迎回来' : '创建账号' }}
          </h2>
          <p class="mt-2 text-gray-600">{{ isLogin ? '登录以管理任务和奖励' : '注册开始使用星星任务系统' }}</p>
        </div>
        
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- 登录错误提示 -->
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
            {{ error }}
          </div>
          
          <!-- 用户名 -->
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2" for="username">
              用户名
            </label>
            <input
              id="username"
              v-model.trim="formData.username"
              class="form-input transition-all duration-200 shadow-sm block w-full rounded-xl border border-gray-300 focus:border-violet-500 focus:ring focus:ring-violet-500/20 py-3 px-4"
              type="text"
              placeholder="请输入用户名"
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
              class="form-input transition-all duration-200 shadow-sm block w-full rounded-xl border border-gray-300 focus:border-violet-500 focus:ring focus:ring-violet-500/20 py-3 px-4"
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
                class="form-input transition-all duration-200 shadow-sm block w-full rounded-xl border border-gray-300 focus:border-violet-500 focus:ring focus:ring-violet-500/20 py-3 px-4"
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
              <div class="grid grid-cols-2 gap-4">
                <label class="relative block">
                  <input
                    type="radio"
                    class="peer sr-only"
                    v-model="formData.role"
                    name="accountType"
                    value="parent"
                  />
                  <div class="p-3 border border-gray-200 rounded-xl cursor-pointer transition-all duration-200 text-center peer-checked:border-violet-500 peer-checked:bg-violet-50 peer-checked:text-violet-600 hover:border-violet-200">
                    <svg class="w-5 h-5 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fill-rule="evenodd" d="M10 1.667c-4.6 0-8.333 3.733-8.333 8.333 0 4.6 3.733 8.333 8.333 8.333 4.6 0 8.333-3.733 8.333-8.333 0-4.6-3.733-8.333-8.333-8.333zm-2 7.5a2 2 0 104 0h1.25c.69 0 1.25-.56 1.25-1.25V7c0-.69-.56-1.25-1.25-1.25h-5c-.69 0-1.25.56-1.25 1.25v1.667c0 .69.56 1.25 1.25 1.25H8v-.833z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm font-medium">家长</span>
                  </div>
                </label>
                <label class="relative block">
                  <input
                    type="radio"
                    class="peer sr-only"
                    v-model="formData.role"
                    name="accountType"
                    value="child"
                  />
                  <div class="p-3 border border-gray-200 rounded-xl cursor-pointer transition-all duration-200 text-center peer-checked:border-violet-500 peer-checked:bg-violet-50 peer-checked:text-violet-600 hover:border-violet-200">
                    <svg class="w-5 h-5 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fill-rule="evenodd" d="M10 0c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm-3.2 13.4a1 1 0 011-1h4.4a1 1 0 110 2h-4.4a1 1 0 01-1-1zm1-3.4a1 1 0 100 2h4.4a1 1 0 100-2h-4.4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm font-medium">儿童</span>
                  </div>
                </label>
              </div>
            </div>
            
            <!-- 家长账号 -->
            <div v-if="formData.role === 'child'" class="fade-in">
              <label class="block text-gray-700 text-sm font-medium mb-2" for="parentUsername">
                家长用户名
              </label>
              <input
                id="parentUsername"
                v-model.trim="formData.parentUsername"
                class="form-input transition-all duration-200 shadow-sm block w-full rounded-xl border border-gray-300 focus:border-violet-500 focus:ring focus:ring-violet-500/20 py-3 px-4"
                type="text"
                placeholder="请输入家长用户名"
                required
              />
            </div>
          </div>
          
          <!-- 记住登录 -->
          <div v-if="isLogin" class="flex items-center justify-between">
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                class="form-checkbox text-violet-500 focus:ring-violet-500/50 rounded"
                v-model="formData.remember"
              />
              <span class="ml-2 text-sm text-gray-700">记住登录</span>
            </label>
            <button type="button" class="text-sm text-violet-600 hover:text-violet-800">
              忘记密码?
            </button>
          </div>
          
          <!-- 提交按钮 -->
          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-300 transform hover:-translate-y-1"
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
          <button @click="toggleMode" class="text-sm text-violet-600 hover:text-violet-800 transition-colors">
            {{ isLogin ? '没有账号? 注册' : '已有账号? 登录' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/app'

const router = useRouter()
const appStore = useAppStore()

const isLogin = ref(true)
const loading = ref(false)
const error = ref('')

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  role: 'parent',
  parentUsername: '',
  remember: false
})

// 切换登录/注册模式
function toggleMode() {
  isLogin.value = !isLogin.value
  error.value = ''
}

// 重置家长用户名
watch(() => formData.value.role, (newVal) => {
  if (newVal !== 'child') {
    formData.value.parentUsername = ''
  }
})

// 处理表单提交
async function handleSubmit() {
  error.value = ''
  loading.value = true
  
  try {
    // 表单验证
    if (!formData.value.username || !formData.value.password) {
      throw new Error('请输入用户名和密码')
    }
    
    // 注册模式
    if (!isLogin.value) {
      if (formData.value.password.length < 6) {
        throw new Error('密码长度不能少于6位')
      }
      
      if (formData.value.password !== formData.value.confirmPassword) {
        throw new Error('两次输入的密码不一致')
      }
      
      if (formData.value.role === 'child' && !formData.value.parentUsername) {
        throw new Error('请输入家长用户名')
      }
      
      // 注册新用户 - 使用用户名而不是邮箱
      await appStore.register({
        username: formData.value.username,
        password: formData.value.password,
        role: formData.value.role,
        parentUsername: formData.value.parentUsername
      })
      
      // 注册成功后切换到登录模式
      isLogin.value = true
    } else {
      // 登录 - 使用用户名而不是邮箱
      await appStore.login(formData.value.username, formData.value.password)
      
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
  animation: blob 12s infinite;
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
    transform: translate(30px, -50px) scale(1.2);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.8);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  opacity: 0.6;
  animation: twinkle 4s infinite ease-in-out;
}

@keyframes twinkle {
  0% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0.2; transform: scale(0.8); }
}
</style> 
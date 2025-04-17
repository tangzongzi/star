<template>
  <div class="min-h-screen w-full bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 relative overflow-hidden flex flex-col">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- 左上角装饰 -->
      <div class="absolute -top-20 -left-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply opacity-20 animate-blob"></div>
      <!-- 右上角装饰 -->
      <div class="absolute -top-20 -right-20 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply opacity-20 animate-blob animation-delay-2000"></div>
      <!-- 左下角装饰 -->
      <div class="absolute -bottom-20 -left-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply opacity-20 animate-blob animation-delay-4000"></div>
      <!-- 右下角装饰 -->
      <div class="absolute -bottom-20 -right-20 w-96 h-96 bg-violet-400 rounded-full mix-blend-multiply opacity-20 animate-blob animation-delay-6000"></div>
      
      <!-- 星星装饰 -->
      <div class="absolute inset-0" aria-hidden="true">
        <div class="absolute h-2 w-2 bg-white rounded-full top-1/4 left-1/4 animate-twinkle"></div>
        <div class="absolute h-2 w-2 bg-white rounded-full top-3/4 left-1/3 animate-twinkle animation-delay-1000"></div>
        <div class="absolute h-2 w-2 bg-white rounded-full top-1/3 right-1/4 animate-twinkle animation-delay-2000"></div>
        <div class="absolute h-2 w-2 bg-white rounded-full bottom-1/4 right-1/3 animate-twinkle animation-delay-3000"></div>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="flex-1 flex items-center justify-center p-4">
      <div class="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md relative overflow-hidden">
        <!-- 装饰性圆形 -->
        <div class="absolute -top-20 -right-20 w-40 h-40 bg-purple-200 rounded-full opacity-20"></div>
        <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-violet-200 rounded-full opacity-20"></div>
        
        <h2 class="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">欢迎回来</h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-6 relative">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <input
              id="username"
              v-model="formData.username"
              type="text"
              required
              class="block w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
              placeholder="请输入用户名"
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              required
              class="block w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
              placeholder="请输入密码"
            >
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                type="checkbox"
                v-model="formData.remember"
                class="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
              >
              <span class="ml-2 text-sm text-gray-600">记住我</span>
            </label>
          </div>

          <button
            type="submit"
            class="w-full py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-200"
          >
            登录
          </button>
        </form>

        <div class="mt-6 text-center">
          <router-link to="/register" class="text-sm text-violet-600 hover:text-violet-700 transition-colors duration-200">
            还没有账号？立即注册
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/app'

const router = useRouter()
const appStore = useAppStore()

const formData = reactive({
  username: '',
  password: '',
  remember: false
})

const handleSubmit = async () => {
  try {
    await appStore.login({
      username: formData.username,
      password: formData.password,
      remember: formData.remember
    })
    
    appStore.notify('登录成功！', 'success')
    
    // 根据用户类型跳转到相应页面
    const userType = appStore.userType
    router.push(userType === 'parent' ? '/parent' : '/child')
  } catch (error) {
    appStore.notify(error.message || '登录失败，请重试', 'error')
  }
}
</script>

<style scoped>
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

@keyframes twinkle {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(0.7);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animate-twinkle {
  animation: twinkle 2s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animation-delay-6000 {
  animation-delay: 6s;
}

.animation-delay-1000 {
  animation-delay: 1s;
}
</style> 
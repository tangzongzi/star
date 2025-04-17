<!-- 
  注意：此页面已弃用。
  注册功能已整合到 LoginView.vue 中。
  请使用登录页面进行注册和登录。
-->

<template>
  <div class="min-h-screen bg-gradient-to-b from-violet-50 to-indigo-50">
    <div class="container mx-auto px-4 py-8">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-800">此页面已弃用</h1>
        <p class="text-gray-600 mt-2">注册功能已整合到登录页面</p>
        <router-link to="/login" class="mt-4 inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
          前往登录/注册页面
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // 自动重定向到登录页面
  router.push('/login')
})
</script> 
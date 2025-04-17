<template>
  <div class="min-h-screen">
    <!-- 只在非登录/注册页面显示顶部导航栏 -->
    <header v-if="!isAuthPage" class="w-full bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span class="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">星星任务</span>
        </div>
      </div>
    </header>

    <Suspense>
      <NotificationToast />
      <template #fallback>
        <div class="fixed top-4 right-4 z-50"></div>
      </template>
    </Suspense>
    
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-gray-900/20 backdrop-blur-sm z-50">
      <div class="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center">
        <svg class="animate-spin h-10 w-10 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-700">加载中...</p>
      </div>
    </div>
    
    <router-view></router-view>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from './stores/app'
import { supabase } from './lib/supabase'
import NotificationToast from './components/NotificationToast.vue'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const isLoading = ref(true)

// 判断当前是否在登录或注册页面
const isAuthPage = computed(() => {
  return ['/login', '/register'].includes(route.path)
})

// 初始化应用程序
onMounted(async () => {
  try {
    // 监听认证状态变化
    supabase.auth.onAuthStateChange((event, session) => {
      appStore.handleAuthChange(event, session)
    })
    
    // 检查当前会话
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      await appStore.setSession(session)
      
      // 根据用户角色导航到相应页面
      if (router.currentRoute.value.path === '/login' || router.currentRoute.value.path === '/register') {
        router.push(appStore.userRole === 'parent' ? '/parent' : '/child')
      }
    } else if (!['/', '/login', '/register'].includes(router.currentRoute.value.path)) {
      // 未登录用户只能访问登录和注册页面
      router.push('/login')
    }
  } catch (error) {
    console.error('初始化应用程序时出错:', error)
    appStore.notify({
      type: 'error',
      message: '应用程序初始化失败，请刷新页面重试'
    })
  } finally {
    isLoading.value = false
  }
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 
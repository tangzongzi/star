<template>
  <Transition name="toast">
    <div 
      v-if="notifications.length > 0" 
      class="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md"
    >
      <Transition-group name="notification">
        <div 
          v-for="notification in notifications" 
          :key="notification.id"
          class="flex items-center p-4 rounded-lg shadow-lg backdrop-blur-md text-sm border transition-all"
          :class="notificationClasses(notification.type)"
        >
          <div class="mr-3 shrink-0">
            <!-- 成功图标 -->
            <svg v-if="notification.type === 'success'" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            
            <!-- 错误图标 -->
            <svg v-else-if="notification.type === 'error'" class="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            
            <!-- 警告图标 -->
            <svg v-else-if="notification.type === 'warning'" class="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            
            <!-- 信息图标 -->
            <svg v-else class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          
          <div class="flex-1">
            {{ notification.message }}
          </div>
          
          <button 
            @click="dismissNotification(notification.id)" 
            class="ml-3 p-1 rounded-full hover:bg-gray-200/50 transition-colors"
          >
            <svg class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </Transition-group>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '../stores/app'

const appStore = useAppStore()

// 获取通知列表
const notifications = computed(() => appStore.notifications)

// 根据通知类型返回对应的样式类
function notificationClasses(type) {
  switch (type) {
    case 'success':
      return 'bg-green-50/90 border-green-200 text-green-800'
    case 'error':
      return 'bg-red-50/90 border-red-200 text-red-800'
    case 'warning':
      return 'bg-yellow-50/90 border-yellow-200 text-yellow-800'
    default:
      return 'bg-blue-50/90 border-blue-200 text-blue-800'
  }
}

// 关闭通知
function dismissNotification(id) {
  appStore.dismissNotification(id)
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.notification-move {
  transition: transform 0.3s ease;
}
</style> 
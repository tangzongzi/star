<template>
  <div class="min-h-screen bg-[#FAFBFF]">
    <!-- 顶部导航栏 -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E5E9F2]">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <div class="flex items-center space-x-8">
          <router-link to="/parent" class="flex items-center">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center mr-3">
              <span class="text-white text-lg font-bold">星</span>
            </div>
            <span class="text-lg font-semibold text-gray-900">星星任务</span>
          </router-link>
        </div>
        <nav class="flex items-center space-x-4">
          <router-link 
            to="/parent" 
            class="flex items-center px-4 py-2 rounded-lg text-sm font-medium"
            :class="$route.path === '/parent' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:text-indigo-600'"
          >
            <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            任务管理
          </router-link>
          <router-link 
            to="/parent/rewards" 
            class="flex items-center px-4 py-2 rounded-lg text-sm font-medium"
            :class="$route.path.includes('/rewards') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:text-indigo-600'"
          >
            <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15.0006L8.46447 18.5361L7.05025 17.1219L12 12.1721L16.9497 17.1219L15.5355 18.5361L12 15.0006Z" fill="currentColor"/>
              <path d="M12 8.82847L8.46447 12.364L7.05025 10.9498L12 6.00001L16.9497 10.9498L15.5355 12.364L12 8.82847Z" fill="currentColor"/>
            </svg>
            奖励管理
          </router-link>
          <div class="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100/50">
            <svg class="w-5 h-5 text-amber-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
            <span class="text-amber-700 font-medium">{{ points }} 积分</span>
          </div>
          <div class="relative group">
            <button class="flex items-center space-x-2 focus:outline-none">
              <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                <span>{{ appStore.username ? appStore.username.charAt(0).toUpperCase() : 'U' }}</span>
              </div>
            </button>
          </div>
        </nav>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="container mx-auto px-4 pt-24 pb-12">
      <!-- 欢迎区域 -->
      <section class="mb-10">
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-8 md:p-10">
          <div class="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
            <div class="md:max-w-xl">
              <h1 class="text-2xl md:text-3xl font-bold text-white mb-2">
                欢迎回来，家长 👋
              </h1>
              <p class="text-indigo-100 text-sm md:text-base max-w-xl">
                通过给孩子设置任务和奖励，培养孩子的责任感和自律能力。
              </p>
            </div>
            <button 
              @click="showAddTaskModal = true"
              class="mt-4 md:mt-0 inline-flex items-center px-4 py-2 rounded-lg bg-white text-indigo-600 font-medium text-sm hover:bg-indigo-50 transition-all duration-200 shadow-sm"
            >
              <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4V20M20 12L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              添加新任务
            </button>
          </div>
          <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/10 to-transparent rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
        </div>
      </section>

      <!-- 状态统计区域 -->
      <section class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
        <div class="bg-white rounded-xl border border-gray-100 p-6 hover:border-indigo-100 transition-colors">
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500 mb-3">待完成任务</span>
            <div class="flex items-baseline space-x-2">
              <span class="text-2xl md:text-3xl font-bold text-indigo-600">{{ pendingCount }}</span>
              <span class="text-sm text-gray-400">个</span>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl border border-gray-100 p-6 hover:border-purple-100 transition-colors">
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500 mb-3">待审核任务</span>
            <div class="flex items-baseline space-x-2">
              <span class="text-2xl md:text-3xl font-bold text-purple-600">{{ reviewCount }}</span>
              <span class="text-sm text-gray-400">个</span>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl border border-gray-100 p-6 hover:border-green-100 transition-colors">
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500 mb-3">已完成任务</span>
            <div class="flex items-baseline space-x-2">
              <span class="text-2xl md:text-3xl font-bold text-green-600">{{ completedCount }}</span>
              <span class="text-sm text-gray-400">个</span>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl border border-gray-100 p-6 hover:border-red-100 transition-colors">
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500 mb-3">已过期任务</span>
            <div class="flex items-baseline space-x-2">
              <span class="text-2xl md:text-3xl font-bold text-red-600">{{ expiredCount }}</span>
              <span class="text-sm text-gray-400">个</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 任务列表区域 -->
      <section class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div class="p-6 md:p-8 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-bold text-gray-900">全部任务</h2>
              <p class="text-sm text-gray-500 mt-1">管理和跟踪所有任务的进度</p>
            </div>
            <div class="flex items-center space-x-2">
              <button 
                @click="showAddTaskModal = true"
                class="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-sm hover:from-indigo-700 hover:to-purple-700 transition-all"
              >
                <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V20M20 12L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                添加任务
              </button>
            </div>
          </div>
        </div>

        <!-- 任务卡片列表 -->
        <div class="p-6 md:p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div 
              v-for="task in tasks" 
              :key="task.id" 
              class="group relative bg-white rounded-xl border border-gray-100 p-6 hover:border-indigo-100 hover:shadow-sm transition-all duration-200"
            >
              <div class="flex flex-col h-full">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {{ task.title }}
                    </h3>
                    <p class="text-sm text-gray-500 line-clamp-2">{{ task.description }}</p>
                  </div>
                  <div class="flex items-center justify-center w-10 h-10 rounded-full bg-amber-50 ml-4">
                    <span class="text-amber-600 font-semibold text-sm">{{ task.points }}</span>
                  </div>
                </div>
                <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <span 
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" 
                    :class="getStatusClass(task.status)"
                  >
                    {{ getStatusText(task.status) }}
                  </span>
                  <button 
                    @click="deleteTask(task.id)"
                    class="text-sm text-gray-400 hover:text-red-500 transition-colors"
                  >
                    删除
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 空状态 -->
          <div 
            v-if="!tasks.length" 
            class="flex flex-col items-center justify-center py-12 px-4"
          >
            <div class="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12H15M12 9V15M12 3C19.2 3 21 4.8 21 12C21 19.2 19.2 21 12 21C4.8 21 3 19.2 3 12C3 4.8 4.8 3 12 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-1">还没有任务</h3>
            <p class="text-sm text-gray-500 text-center max-w-sm">
              点击"添加任务"按钮开始创建新的任务吧！
            </p>
          </div>
        </div>
      </section>
    </main>

    <!-- 添加任务模态框 -->
    <AddTaskModal v-if="showAddTaskModal" @close="showAddTaskModal = false" @add="addTask" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import AddTaskModal from '@/components/AddTaskModal.vue'

const appStore = useAppStore()
const showAddTaskModal = ref(false)

// 模拟数据
const tasks = ref([
  {
    id: 1,
    title: '整理房间',
    description: '把床铺好，收拾玩具和书本',
    points: 5,
    status: 'pending'
  },
  {
    id: 2,
    title: '完成家庭作业',
    description: '认真完成今天的全部家庭作业',
    points: 10,
    status: 'review'
  },
  {
    id: 3,
    title: '阅读30分钟',
    description: '阅读一本有益的书籍30分钟',
    points: 8,
    status: 'completed'
  }
])

// 计算属性
const points = computed(() => appStore.points)
const pendingCount = computed(() => tasks.value.filter(t => t.status === 'pending').length)
const reviewCount = computed(() => tasks.value.filter(t => t.status === 'review').length)
const completedCount = computed(() => tasks.value.filter(t => t.status === 'completed').length)
const expiredCount = computed(() => tasks.value.filter(t => t.status === 'expired').length)

// 方法
const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-indigo-50 text-indigo-600',
    review: 'bg-purple-50 text-purple-600',
    completed: 'bg-green-50 text-green-600',
    expired: 'bg-red-50 text-red-600'
  }
  return classes[status]
}

const getStatusText = (status) => {
  const texts = {
    pending: '待完成',
    review: '待审核',
    completed: '已完成',
    expired: '已过期'
  }
  return texts[status]
}

const addTask = (task) => {
  tasks.value.push({
    id: Date.now(),
    ...task,
    status: 'pending'
  })
  showAddTaskModal.value = false
}

const deleteTask = (taskId) => {
  if (confirm('确定要删除这个任务吗？')) {
    tasks.value = tasks.value.filter(t => t.id !== taskId)
  }
}
</script> 
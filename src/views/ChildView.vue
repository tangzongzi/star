<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="container mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
        <h1 class="text-lg sm:text-xl font-bold text-primary">
          <span class="hidden sm:inline">任务中心</span>
          <span class="sm:hidden">任务中心</span>
        </h1>
        <div class="flex items-center gap-2 sm:gap-4">
          <!-- 积分显示 -->
          <div class="flex items-center bg-amber-50 px-2 sm:px-3 py-1.5 rounded-lg text-amber-700">
            <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span class="text-sm sm:text-base font-medium">{{ points }}</span>
          </div>
          
          <!-- 奖励按钮 -->
          <button 
            @click="router.push('/child/rewards')"
            class="btn-outline-primary px-2 sm:px-3 py-1.5 text-sm flex items-center min-w-[4rem] justify-center"
          >
            <svg class="w-4 h-4 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="hidden sm:inline">奖励中心</span>
            <span class="sm:hidden">奖励</span>
          </button>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-4 sm:py-6">
      <!-- 欢迎区域 -->
      <div class="mb-6 sm:mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="bg-gradient-to-r from-primary/10 to-primary-light/10 px-4 sm:px-6 py-4 sm:py-8">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
            <div>
              <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">你好，小朋友！</h2>
              <p class="text-sm sm:text-base text-gray-600 max-w-2xl">
                完成家长布置的任务，获得星星奖励，用星星兑换你想要的奖励吧！
              </p>
            </div>
            <div class="flex flex-row sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
              <div class="flex items-center rounded-lg sm:rounded-full bg-amber-100 px-3 py-2 flex-1 sm:flex-initial justify-center sm:justify-start">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <div>
                  <span class="text-xs text-amber-700">你的星星</span>
                  <div class="font-bold text-amber-800">{{ points }}个</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 任务类别选项卡 -->
      <div class="mb-4 sm:mb-6 border-b border-gray-200">
        <div class="flex overflow-x-auto hide-scrollbar -mb-px space-x-3 sm:space-x-4 md:space-x-8">
          <button 
            v-for="tab in tabs" 
            :key="tab.value"
            @click="activeTab = tab.value"
            class="py-2 px-1 font-medium border-b-2 transition-colors whitespace-nowrap text-xs sm:text-sm md:text-base"
            :class="activeTab === tab.value 
              ? 'border-primary text-primary' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            {{ tab.label }}
            <span 
              v-if="tab.value !== 'all'" 
              class="ml-1 sm:ml-1.5 bg-gray-100 text-gray-700 px-1.5 sm:px-2 py-0.5 rounded-full text-xs"
            >
              {{ getTaskCountByStatus(tab.value) }}
            </span>
          </button>
        </div>
      </div>

      <!-- 任务列表 -->
      <div class="grid grid-cols-1 gap-4 sm:gap-6">
        <div class="bg-white rounded-xl shadow-sm p-3 sm:p-4">
          <div v-if="filteredTasks.length > 0">
            <TransitionGroup name="list" tag="div" class="space-y-2 sm:space-y-3">
              <TaskCard
                v-for="task in filteredTasks"
                :key="task.id"
                :task="task"
                mode="child"
                @complete="completeTask"
              />
            </TransitionGroup>
          </div>
          <div v-else class="text-center py-6 sm:py-8">
            <div class="mx-auto w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
              <svg class="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <h3 class="text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2">
              {{ activeTab === 'pending' ? '暂无待完成任务' : 
                 activeTab === 'completed' ? '暂无已完成任务' : 
                 activeTab === 'approved' ? '暂无已批准任务' : '暂无已拒绝任务' }}
            </h3>
            <p class="text-sm text-gray-500">{{ getEmptyStateMessage() }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/app';
import { useTasksStore } from '@/stores/tasks';
import TaskCard from '@/components/TaskCard.vue';

const router = useRouter();
const appStore = useAppStore();
const tasksStore = useTasksStore();

// 获取积分
const points = computed(() => appStore.points);

// 任务标签页
const activeTab = ref('pending');
const tabs = [
  { label: '全部任务', value: 'all' },
  { label: '待完成', value: 'pending' },
  { label: '待审核', value: 'completed' },
  { label: '已完成', value: 'approved' },
  { label: '已拒绝', value: 'rejected' }
];

// 过滤任务
const filteredTasks = computed(() => {
  if (activeTab.value === 'all') {
    return tasksStore.allTasks;
  }
  return tasksStore.getTasksByStatus(activeTab.value);
});

// 获取特定状态的任务数量
const getTaskCountByStatus = (status) => {
  return tasksStore.getTasksByStatus(status).length;
};

// 获取空状态信息
const getEmptyStateMessage = () => {
  switch (activeTab.value) {
    case 'pending':
      return '当前没有需要完成的任务，请等待家长添加';
    case 'completed':
      return '还没有完成的任务，去完成一些任务吧';
    case 'approved':
      return '还没有获得批准的任务，继续努力吧';
    case 'rejected':
      return '没有被拒绝的任务，继续保持';
    default:
      return '';
  }
};

// 完成任务
const completeTask = (task) => {
  tasksStore.updateTaskStatus(task.id, 'completed');
  appStore.notify('任务已提交，等待家长审核', 'success');
};

// 加载数据
onMounted(() => {
  // 如果当前不是孩子模式，则跳转到家长页面
  if (appStore.currentMode !== 'child') {
    router.push('/parent');
    return;
  }
});
</script>

<style scoped>
.btn-primary {
  @apply bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.btn-outline-primary {
  @apply border border-primary text-primary rounded-lg hover:bg-primary-light/10 transition focus:outline-none focus:ring-2 focus:ring-primary/50;
}
</style> 
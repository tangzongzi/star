<template>
  <div class="min-h-screen bg-gradient-to-b from-violet-50 to-indigo-50">
    <!-- 顶部导航 -->
    <header class="bg-white/80 border-b border-violet-100 sticky top-0 z-10 backdrop-blur-lg">
      <div class="container mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
        <h1 class="text-lg sm:text-xl font-bold">
          <span class="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
            <svg class="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
            <span class="hidden sm:inline">星星任务</span>
            <span class="sm:hidden">任务</span>
          </span>
        </h1>
        <div class="flex items-center gap-3 sm:gap-4">
          <!-- 积分显示 -->
          <div class="flex items-center bg-gradient-to-r from-amber-50 via-amber-100/70 to-amber-50 px-4 py-2 rounded-full shadow-lg shadow-amber-100/50 border border-amber-100/80">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-amber-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span class="text-base sm:text-lg font-bold text-amber-600">{{ points }}</span>
          </div>
          
          <!-- 奖励按钮 -->
          <button 
            @click="router.push('/child/rewards')"
            class="reward-btn px-4 sm:px-5 py-2 text-sm sm:text-base flex items-center gap-2"
          >
            <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
            <span class="hidden sm:inline">奖励商店</span>
            <span class="sm:hidden">奖励</span>
          </button>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-6 sm:py-8">
      <!-- 欢迎区域 -->
      <div class="mb-8 sm:mb-10">
        <div class="bg-white/90 rounded-3xl shadow-xl border border-violet-100/50 overflow-hidden relative">
          <div class="absolute inset-0 bg-gradient-to-r from-violet-100/20 to-indigo-100/20"></div>
          <!-- 装饰元素 -->
          <div class="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-b from-violet-200/30 to-indigo-200/30 rounded-full blur-3xl"></div>
          <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-t from-amber-200/20 to-yellow-200/20 rounded-full blur-3xl"></div>
          
          <div class="relative px-6 sm:px-8 py-6 sm:py-8">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
              <div class="flex-1">
                <h2 class="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">
                  <span class="bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    你好，小朋友！
                  </span>
                </h2>
                <p class="text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed">
                  完成任务可以获得闪闪发光的星星哦！攒够星星就能换取心仪的奖励，让我们一起开始今天的任务冒险吧！
                </p>
              </div>
              <div class="flex flex-row sm:flex-col gap-3 shrink-0 w-full sm:w-auto">
                <div class="stats-card flex items-center rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 px-4 py-3 flex-1 sm:flex-initial border border-amber-100/50 shadow-lg shadow-amber-100/30">
                  <svg class="w-7 h-7 sm:w-8 sm:h-8 text-amber-500 mr-3 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <div>
                    <span class="text-sm text-amber-700 font-medium">已获得星星</span>
                    <div class="text-xl font-bold text-amber-600">{{ points }}颗</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 任务类别选项卡 -->
      <div class="mb-6 sm:mb-8">
        <div class="flex overflow-x-auto hide-scrollbar space-x-4 sm:space-x-6 md:space-x-8 pb-2">
          <button 
            v-for="tab in tabs" 
            :key="tab.value"
            @click="activeTab = tab.value"
            class="tab-button py-2 px-4 font-medium rounded-full transition-all duration-300 whitespace-nowrap text-sm sm:text-base relative group"
            :class="activeTab === tab.value 
              ? 'bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-lg shadow-violet-200' 
              : 'text-gray-600 hover:text-violet-600 hover:bg-violet-50'"
          >
            {{ tab.label }}
            <span 
              v-if="tab.value !== 'all'" 
              class="ml-2 px-2 py-0.5 rounded-full text-xs font-medium"
              :class="activeTab === tab.value ? 'bg-white/20 text-white' : 'bg-violet-100 text-violet-600'"
            >
              {{ getTaskCountByStatus(tab.value) }}
            </span>
          </button>
        </div>
      </div>

      <!-- 任务列表 -->
      <div class="grid grid-cols-1 gap-4 sm:gap-6">
        <div class="bg-white/90 rounded-3xl shadow-xl border border-violet-100/50 p-4 sm:p-6 backdrop-blur-sm">
          <div v-if="filteredTasks.length > 0">
            <TransitionGroup 
              name="list" 
              tag="div" 
              class="space-y-3 sm:space-y-4"
            >
              <TaskCard
                v-for="task in filteredTasks"
                :key="task.id"
                :task="task"
                mode="child"
                @complete="completeTask"
              />
            </TransitionGroup>
          </div>
          <div v-else class="text-center py-12 sm:py-16">
            <div class="mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-6 bg-gradient-to-b from-violet-50 to-indigo-50 rounded-full flex items-center justify-center text-violet-400 transform -rotate-12 shadow-lg shadow-violet-100/50 border border-violet-100/50">
              <svg class="w-10 h-10 sm:w-12 sm:h-12 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <h3 class="text-lg sm:text-xl font-bold text-violet-800 mb-2 sm:mb-3">
              {{ activeTab === 'pending' ? '暂时没有新任务' : 
                 activeTab === 'completed' ? '还没有完成的任务' : 
                 activeTab === 'approved' ? '还没有获得批准的任务' : '没有被拒绝的任务' }}
            </h3>
            <p class="text-sm sm:text-base text-gray-600 max-w-md mx-auto">{{ getEmptyStateMessage() }}</p>
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
.reward-btn {
  @apply bg-gradient-to-r from-violet-500 via-indigo-500 to-violet-500 text-white rounded-full shadow-lg shadow-violet-200 hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-400/50;
}

.stats-card {
  @apply hover:scale-105 transition-transform duration-300;
}

.tab-button {
  @apply hover:scale-105 transition-transform duration-300;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-move {
  transition: transform 0.5s ease;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style> 
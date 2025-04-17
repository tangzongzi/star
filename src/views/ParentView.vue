<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-primary">
          <span class="hidden sm:inline">家长管理面板</span>
          <span class="sm:hidden">家长面板</span>
        </h1>
        <div class="flex items-center gap-4">
          <!-- 显示当前积分 -->
          <div class="flex items-center bg-amber-50 px-3 py-1.5 rounded-lg text-amber-700">
            <svg class="w-5 h-5 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span class="font-medium">{{ points }}</span>
          </div>
          
          <!-- 奖励管理按钮 -->
          <button 
            @click="router.push('/parent/rewards')"
            class="btn-outline-primary px-3 py-1.5 text-sm flex items-center"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="hidden sm:inline">奖励管理</span>
            <span class="sm:hidden">奖励</span>
          </button>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-6">
      <!-- 欢迎区域 -->
      <div class="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="bg-gradient-to-r from-primary/10 to-primary-light/10 px-6 py-8">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-2">欢迎，家长</h2>
              <p class="text-gray-600 max-w-2xl">
                通过给孩子设置任务和奖励，培养孩子的责任感和自律能力。
                已完成的任务会给予星星奖励，孩子可以用这些星星兑换奖励。
              </p>
            </div>
            <button 
              @click="showAddTaskModal = true"
              class="btn-primary px-4 py-2 text-sm md:text-base flex items-center whitespace-nowrap"
            >
              <svg class="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              添加新任务
            </button>
          </div>
        </div>
      </div>

      <!-- 任务类别选项卡 -->
      <div class="mb-6 border-b border-gray-200">
        <div class="flex overflow-x-auto hide-scrollbar -mb-px space-x-4 md:space-x-8">
          <button 
            v-for="tab in tabs" 
            :key="tab.value"
            @click="activeTab = tab.value"
            class="py-2 px-1 font-medium border-b-2 transition-colors whitespace-nowrap text-sm md:text-base"
            :class="activeTab === tab.value 
              ? 'border-primary text-primary' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            {{ tab.label }}
            <span 
              v-if="tab.value !== 'all'" 
              class="ml-1.5 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs"
            >
              {{ getTaskCountByStatus(tab.value) }}
            </span>
          </button>
        </div>
      </div>

      <!-- 任务列表 -->
      <div v-if="filteredTasks.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TaskCard 
          v-for="task in filteredTasks" 
          :key="task.id" 
          :task="task"
          mode="parent"
          @approve="approveTask"
          @reject="rejectTask"
          @delete="deleteTask"
          @restore="restoreTask"
        />
      </div>
      <div v-else class="text-center py-12 bg-white rounded-xl shadow-sm">
        <div class="mx-auto w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-700 mb-2">暂无任务</h3>
        <p class="text-gray-500 mb-4">
          {{ 
            activeTab === 'pending' ? '没有待完成的任务' : 
            activeTab === 'completed' ? '没有等待审核的任务' : 
            activeTab === 'approved' ? '没有已完成的任务' : 
            activeTab === 'rejected' ? '没有被拒绝的任务' : 
            '暂无任务'
          }}
        </p>
        <button 
          v-if="activeTab === 'all' || activeTab === 'pending'"
          @click="showAddTaskModal = true"
          class="btn-primary px-4 py-2"
        >
          添加新任务
        </button>
      </div>

      <!-- 奖励请求部分 -->
      <div v-if="rewardRequests.length > 0" class="mt-10">
        <h2 class="text-xl font-bold text-gray-800 mb-4">奖励请求</h2>
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">奖励</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">描述</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">请求时间</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="request in rewardRequests" :key="request.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ request.title }}</td>
                  <td class="px-6 py-4 text-sm text-gray-500">{{ request.description }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(request.createdAt) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button 
                        @click="approveRewardRequest(request.id)"
                        class="text-green-600 hover:text-green-900 flex items-center text-xs"
                      >
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        同意
                      </button>
                      <button 
                        @click="rejectRewardRequest(request.id)"
                        class="text-red-600 hover:text-red-900 flex items-center text-xs"
                      >
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        拒绝
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- 添加任务模态框 -->
    <div v-if="showAddTaskModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showAddTaskModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                  添加新任务
                </h3>
                <div class="mt-2 space-y-4">
                  <div>
                    <label for="taskTitle" class="block text-sm font-medium text-gray-700 mb-1">任务名称</label>
                    <input type="text" id="taskTitle" v-model="newTask.title" class="focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                  </div>
                  <div>
                    <label for="taskDescription" class="block text-sm font-medium text-gray-700 mb-1">任务描述</label>
                    <textarea id="taskDescription" v-model="newTask.description" rows="3" class="focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
                  </div>
                  <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                    <div class="w-full sm:w-1/2">
                      <label for="taskPoints" class="block text-sm font-medium text-gray-700 mb-1">奖励星星</label>
                      <input type="number" id="taskPoints" v-model="newTask.points" min="1" class="focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>
                    <div class="w-full sm:w-1/2">
                      <label for="taskDifficulty" class="block text-sm font-medium text-gray-700 mb-1">任务难度</label>
                      <select id="taskDifficulty" v-model="newTask.difficulty" class="focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                        <option value="1">简单</option>
                        <option value="2">适中</option>
                        <option value="3">有挑战</option>
                        <option value="4">困难</option>
                        <option value="5">极难</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              @click="addTask" 
              type="button" 
              :disabled="!isTaskFormValid"
              :class="[
                'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm',
                isTaskFormValid ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-300 cursor-not-allowed'
              ]"
            >
              添加任务
            </button>
            <button 
              @click="showAddTaskModal = false" 
              type="button" 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/app';
import { useTasksStore } from '@/stores/tasks';
import { useRewardsStore } from '@/stores/rewards';
import TaskCard from '@/components/TaskCard.vue';

const router = useRouter();
const appStore = useAppStore();
const tasksStore = useTasksStore();
const rewardsStore = useRewardsStore();

// 获取积分
const points = computed(() => appStore.points);

// 任务标签页
const activeTab = ref('all');
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

// 添加任务相关
const showAddTaskModal = ref(false);
const newTask = ref({
  title: '',
  description: '',
  points: 5,
  difficulty: 2
});

const isTaskFormValid = computed(() => {
  return newTask.value.title.trim() !== '' && 
         newTask.value.points > 0;
});

const addTask = () => {
  if (!isTaskFormValid.value) return;
  
  tasksStore.addTask({
    title: newTask.value.title,
    description: newTask.value.description,
    points: parseInt(newTask.value.points),
    difficulty: parseInt(newTask.value.difficulty)
  });
  
  // 重置表单并关闭模态框
  newTask.value = {
    title: '',
    description: '',
    points: 5,
    difficulty: 2
  };
  showAddTaskModal.value = false;
};

// 任务状态更新
const approveTask = (task) => {
  tasksStore.updateTaskStatus(task.id, 'approved');
  appStore.notify('任务已批准', 'success');
};

const rejectTask = (task) => {
  tasksStore.updateTaskStatus(task.id, 'rejected');
  appStore.notify('任务已拒绝', 'info');
};

const restoreTask = (task) => {
  tasksStore.updateTaskStatus(task.id, 'pending');
  appStore.notify('任务已恢复', 'success');
};

const deleteTask = (task) => {
  tasksStore.deleteTask(task.id);
  appStore.notify('任务已删除', 'info');
};

// 奖励请求处理
const rewardRequests = computed(() => rewardsStore.rewardRequests);

const approveRewardRequest = (requestId) => {
  rewardsStore.approveRewardRequest(requestId);
  appStore.notify('已批准奖励请求', 'success');
};

const rejectRewardRequest = (requestId) => {
  rewardsStore.rejectRewardRequest(requestId);
  appStore.notify('已拒绝奖励请求', 'info');
};

// 格式化日期
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

// 加载数据
onMounted(() => {
  // 如果当前不是家长模式，则跳转到孩子页面
  if (appStore.currentMode !== 'parent') {
    router.push('/child');
    return;
  }
  
  console.log('Parent View Mounted');
  console.log('Tasks:', tasksStore.allTasks);
  console.log('Rewards:', rewardsStore.allRewards); 
  console.log('Reward Requests:', rewardsStore.rewardRequests);
});
</script>

<style scoped>
.btn-primary {
  @apply bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50;
}

.btn-outline-danger {
  @apply border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition focus:outline-none focus:ring-2 focus:ring-red-500/50;
}

.btn-outline-primary {
  @apply border border-primary text-primary rounded-lg hover:bg-primary/10 transition focus:outline-none focus:ring-2 focus:ring-primary/50;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style> 
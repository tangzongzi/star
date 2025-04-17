<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-primary">
          <span class="hidden sm:inline">奖励管理</span>
          <span class="sm:hidden">奖励管理</span>
        </h1>
        <div class="flex items-center gap-4">
          <!-- 显示当前积分 -->
          <div class="flex items-center bg-amber-50 px-3 py-1.5 rounded-lg text-amber-700">
            <svg class="w-5 h-5 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span class="font-medium">{{ points }}</span>
          </div>
          
          <!-- 返回按钮 -->
          <button 
            @click="router.push('/parent')"
            class="btn-primary px-3 py-1.5 text-sm flex items-center"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span class="hidden sm:inline">返回任务中心</span>
            <span class="sm:hidden">返回</span>
          </button>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-6">
      <!-- 奖励请求处理部分 -->
      <div v-if="pendingRewardRequests.length > 0" class="mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">待处理的奖励请求</h2>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">奖励</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">消耗星星</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">请求时间</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="request in pendingRewardRequests" :key="request.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ request.title }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      {{ request.points }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(request.createdAt) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex space-x-2">
                      <button 
                        @click="approveRequest(request.id)"
                        class="px-3 py-1 text-xs rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                      >
                        批准
                      </button>
                      <button 
                        @click="rejectRequest(request.id)"
                        class="px-3 py-1 text-xs rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                      >
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
      
      <!-- 奖励管理部分 -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">奖励管理</h2>
          <button 
            @click="showAddRewardModal = true"
            class="btn-primary px-4 py-2 text-sm flex items-center"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            添加奖励
          </button>
        </div>
        
        <div v-if="allRewards.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="reward in allRewards" 
            :key="reward.id"
            class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all"
            :class="{ 'opacity-60': reward.redeemed }"
          >
            <div class="bg-primary-light/10 px-4 py-3 border-b border-primary-light/20">
              <div class="flex justify-between items-center">
                <h3 class="font-medium truncate" :title="reward.title">
                  {{ reward.title }}
                  <span v-if="reward.redeemed" class="ml-2 text-xs text-gray-500">(已兑换)</span>
                </h3>
                <div class="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
                  <svg class="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  {{ reward.points }}
                </div>
              </div>
            </div>
            <div class="p-4">
              <p class="text-sm text-gray-600 mb-4">{{ reward.description }}</p>
              <div v-if="reward.category" class="mb-4">
                <span class="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                  {{ reward.category }}
                </span>
              </div>
              <div class="flex justify-end space-x-2">
                <button 
                  v-if="reward.redeemed"
                  @click="restoreReward(reward.id)"
                  class="px-3 py-1.5 text-xs flex items-center rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                >
                  <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  恢复
                </button>
                <button 
                  @click="deleteReward(reward.id)"
                  class="px-3 py-1.5 text-xs flex items-center rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                >
                  <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  删除
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-12 bg-white rounded-xl shadow-sm">
          <div class="mx-auto w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0 0l-4-4m4 4l4-4M4 19h16M4 7h16M4 13h16"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-700 mb-2">暂无奖励</h3>
          <p class="text-gray-500 mb-4">点击上方"添加奖励"按钮来创建第一个奖励</p>
        </div>
      </div>
    </main>

    <!-- 添加奖励的模态框 -->
    <div v-if="showAddRewardModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
        <button 
          @click="showAddRewardModal = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <h3 class="text-lg font-bold text-gray-900 mb-6">添加新奖励</h3>
        
        <form @submit.prevent="addNewReward">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="reward-title">
              奖励名称
            </label>
            <input 
              id="reward-title"
              v-model="newReward.title"
              type="text" 
              class="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:ring focus:ring-primary/30 focus:outline-none"
              placeholder="输入奖励名称"
              required
            />
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="reward-description">
              奖励描述
            </label>
            <textarea 
              id="reward-description"
              v-model="newReward.description"
              class="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:ring focus:ring-primary/30 focus:outline-none"
              placeholder="输入奖励描述"
              rows="3"
              required
            ></textarea>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="reward-category">
              奖励类别
            </label>
            <select 
              id="reward-category"
              v-model="newReward.category"
              class="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:ring focus:ring-primary/30 focus:outline-none"
            >
              <option value="">-- 选择类别 --</option>
              <option value="特权奖励">特权奖励</option>
              <option value="体验奖励">体验奖励</option>
              <option value="物质奖励">物质奖励</option>
              <option value="其他">其他</option>
            </select>
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="reward-points">
              所需星星
            </label>
            <input 
              id="reward-points"
              v-model.number="newReward.points"
              type="number" 
              min="1"
              class="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:ring focus:ring-primary/30 focus:outline-none"
              placeholder="输入所需星星数量"
              required
            />
          </div>
          
          <div class="flex justify-end">
            <button 
              type="button"
              @click="showAddRewardModal = false"
              class="mr-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button 
              type="submit"
              class="btn-primary px-4 py-2"
            >
              添加奖励
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/app';
import { useRewardsStore } from '@/stores/rewards';

const router = useRouter();
const appStore = useAppStore();
const rewardsStore = useRewardsStore();

// 获取积分
const points = computed(() => appStore.points);

// 奖励相关
const allRewards = computed(() => rewardsStore.allRewards);
const pendingRewardRequests = computed(() => rewardsStore.pendingRewardRequests);

// 用于添加奖励的状态
const showAddRewardModal = ref(false);
const newReward = ref({
  title: '',
  description: '',
  category: '',
  points: 10
});

// 添加新奖励
const addNewReward = () => {
  rewardsStore.addReward({
    title: newReward.value.title,
    description: newReward.value.description,
    category: newReward.value.category,
    points: newReward.value.points
  });
  
  // 重置表单
  newReward.value = {
    title: '',
    description: '',
    category: '',
    points: 10
  };
  
  // 关闭模态框
  showAddRewardModal.value = false;
};

// 批准奖励请求
const approveRequest = (requestId) => {
  if (rewardsStore.approveRewardRequest(requestId)) {
    appStore.notify('奖励请求已批准', 'success');
  } else {
    appStore.notify('处理奖励请求时出错', 'error');
  }
};

// 拒绝奖励请求
const rejectRequest = (requestId) => {
  if (rewardsStore.rejectRewardRequest(requestId)) {
    appStore.notify('奖励请求已拒绝，积分已退还', 'info');
  } else {
    appStore.notify('处理奖励请求时出错', 'error');
  }
};

// 删除奖励
const deleteReward = (rewardId) => {
  if (confirm('确定要删除这个奖励吗？')) {
    rewardsStore.deleteReward(rewardId);
  }
};

// 恢复已兑换的奖励
const restoreReward = (rewardId) => {
  rewardsStore.restoreReward(rewardId);
};

// 格式化日期
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

// 加载数据
onMounted(() => {
  // 如果当前不是家长模式，则跳转到儿童页面
  if (appStore.currentMode !== 'parent') {
    router.push('/child');
    return;
  }
});
</script>

<style scoped>
.btn-primary {
  @apply inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium 
  bg-primary text-primary-foreground hover:bg-primary/90 
  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring;
}

.btn-outline {
  @apply inline-flex items-center justify-center rounded-lg border border-input px-4 py-2 text-sm font-medium 
  bg-background hover:bg-accent hover:text-accent-foreground
  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring;
}

.glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.125);
}

.clay {
  background: var(--clay-background);
  border-radius: 12px;
  box-shadow: 8px 8px 16px var(--clay-shadow-dark),
             -8px -8px 16px var(--clay-shadow-light);
}

.clay-pressed {
  box-shadow: inset 8px 8px 16px var(--clay-shadow-dark),
              inset -8px -8px 16px var(--clay-shadow-light);
}
</style> 
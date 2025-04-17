<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-primary">
          <span class="hidden sm:inline">我的奖励</span>
          <span class="sm:hidden">我的奖励</span>
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
            @click="router.push('/child')"
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
      <!-- 可兑换奖励部分 -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">可兑换奖励</h2>
        </div>
        
        <div v-if="availableRewards.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="reward in availableRewards" 
            :key="reward.id"
            class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all"
          >
            <div class="bg-primary-light/10 px-4 py-3 border-b border-primary-light/20">
              <div class="flex justify-between items-center">
                <h3 class="font-medium truncate" :title="reward.title">{{ reward.title }}</h3>
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
              <div class="flex justify-end">
                <button 
                  @click="requestReward(reward)"
                  :disabled="points < reward.points || hasRequestedReward(reward.id)"
                  :class="[
                    'px-3 py-1.5 text-xs flex items-center rounded-lg transition-colors',
                    points >= reward.points && !hasRequestedReward(reward.id)
                      ? 'bg-primary text-white hover:bg-primary-dark' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  ]"
                >
                  <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span v-if="hasRequestedReward(reward.id)">已申请</span>
                  <span v-else-if="points < reward.points">星星不足</span>
                  <span v-else>兑换</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-12 bg-white rounded-xl shadow-sm">
          <div class="mx-auto w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0 0l-4-4m4 4l4-4M4 19h16M4 7h16M4 13h16"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-700 mb-2">暂无可兑换奖励</h3>
          <p class="text-gray-500 mb-4">还没有可以兑换的奖励，请等待家长添加</p>
        </div>
      </div>

      <!-- 已请求奖励部分 -->
      <div v-if="pendingRewardRequests.length > 0" class="mt-10 mb-8">
        <h2 class="text-xl font-bold text-gray-800 mb-4">奖励请求</h2>
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">奖励</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">消耗星星</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">请求时间</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
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
                    <span class="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">等待批准</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <!-- 已批准的奖励部分 -->
      <div v-if="approvedRequests.length > 0" class="mt-10">
        <h2 class="text-xl font-bold text-gray-800 mb-4">已获得的奖励</h2>
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">奖励</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">消耗星星</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">兑换时间</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="request in approvedRequests" :key="request.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ request.title }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      {{ request.points }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(request.processedAt) }}</td>
                </tr>
              </tbody>
            </table>
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
import { useRewardsStore } from '@/stores/rewards';

const router = useRouter();
const appStore = useAppStore();
const rewardsStore = useRewardsStore();

// 获取积分
const points = computed(() => appStore.points);

// 奖励相关
const availableRewards = computed(() => rewardsStore.availableRewards);
const pendingRewardRequests = computed(() => rewardsStore.pendingRewardRequests);
const approvedRequests = computed(() => 
  rewardsStore.rewardRequests.filter(req => req.status === 'approved')
);

// 检查是否已经申请了特定奖励
const hasRequestedReward = (rewardId) => {
  return pendingRewardRequests.value.some(req => req.rewardId === rewardId);
};

// 请求奖励
const requestReward = (reward) => {
  if (points.value < reward.points) {
    appStore.notify('星星不足，无法兑换该奖励', 'error');
    return;
  }
  
  if (hasRequestedReward(reward.id)) {
    appStore.notify('你已经申请过这个奖励了', 'info');
    return;
  }
  
  if (rewardsStore.requestReward(reward.id)) {
    appStore.notify(`已请求兑换"${reward.title}"，等待家长批准`, 'success');
  }
};

// 格式化日期
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

// 加载数据
onMounted(() => {
  // 如果当前不是孩子模式，则跳转到家长页面
  if (appStore.currentMode !== 'child') {
    router.push('/parent');
    return;
  }
  
  console.log('Child Rewards View Mounted');
  console.log('Available Rewards:', rewardsStore.availableRewards);
  console.log('Pending Reward Requests:', rewardsStore.pendingRewardRequests);
});
</script>

<style scoped>
.btn-primary {
  @apply bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50;
}

.btn-outline-danger {
  @apply border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition focus:outline-none focus:ring-2 focus:ring-red-500/50;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style> 
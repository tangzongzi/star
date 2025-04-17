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
          <div class="hidden md:flex items-center space-x-1">
            <div class="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100/50">
              <svg class="w-5 h-5 text-amber-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              <span class="text-amber-700 font-medium">{{ points }} 积分</span>
            </div>
          </div>
        </div>
        <nav class="flex items-center space-x-4">
          <router-link 
            to="/parent" 
            class="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 transition-colors"
          >
            返回任务
          </router-link>
        </nav>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="container mx-auto px-4 pt-24 pb-12">
      <!-- 欢迎区域 -->
      <section class="mb-10">
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-8 md:p-12">
          <div class="relative z-10">
            <h1 class="text-2xl md:text-3xl font-bold text-white mb-4">
              奖励管理 🎁
            </h1>
            <p class="text-amber-100 text-base md:text-lg max-w-2xl">
              在这里创建和管理孩子可以兑换的奖励，合理设置奖励可以更好地激励孩子完成任务。
            </p>
          </div>
          <!-- 装饰性背景元素 -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/10 to-transparent rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
        </div>
      </section>

      <!-- 统计卡片区域 -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <!-- 可用奖励 -->
        <div class="bg-white rounded-2xl border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
              <svg class="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 11.5L12 2.5L3 11.5H6V19.5C6 20.0523 6.44772 20.5 7 20.5H17C17.5523 20.5 18 20.0523 18 19.5V11.5H21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="text-3xl font-bold text-gray-900">{{ availableRewards }}</span>
          </div>
          <h3 class="text-sm font-medium text-gray-900">可用奖励</h3>
          <p class="text-sm text-gray-500 mt-1">当前可以兑换的奖励数量</p>
        </div>

        <!-- 已兑换 -->
        <div class="bg-white rounded-2xl border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
              <svg class="w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M12 3L14.39 5.42C15.3653 4.52494 16.6016 3.99771 17.89 3.93C19.1784 3.86229 20.4574 4.25894 21.47 5.05C22.4826 5.84106 23.1591 6.97875 23.3795 8.2439C23.5999 9.50905 23.3485 10.8071 22.67 11.89L24 14L21.27 15.33C20.9547 16.4019 20.4193 17.401 19.6977 18.2775C18.9761 19.154 18.0809 19.8941 17.0637 20.4597C16.0465 21.0254 14.9243 21.4064 13.7652 21.5832C12.6061 21.76 11.4297 21.7297 10.2835 21.494C9.13725 21.2583 8.04471 20.8217 7.06028 20.2064C6.07585 19.5911 5.21851 18.8077 4.52777 17.8966C3.83703 16.9854 3.32624 15.9621 3.01984 14.8756C2.71343 13.7892 2.61757 12.6578 2.74 11.54L0 10.19L1.36 8.09C0.682173 7.00717 0.431614 5.70941 0.652954 4.44458C0.874294 3.17975 1.55168 2.04237 2.56502 1.25155C3.57836 0.460733 4.85819 0.0642062 6.14733 0.131931C7.43647 0.199656 8.67348 0.726962 9.65 1.62L12 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="text-3xl font-bold text-gray-900">{{ redeemedCount }}</span>
          </div>
          <h3 class="text-sm font-medium text-gray-900">已兑换奖励</h3>
          <p class="text-sm text-gray-500 mt-1">累计兑换的奖励次数</p>
        </div>

        <!-- 总星星消耗 -->
        <div class="bg-white rounded-2xl border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="text-3xl font-bold text-gray-900">{{ totalPointsSpent }}</span>
          </div>
          <h3 class="text-sm font-medium text-gray-900">总星星消耗</h3>
          <p class="text-sm text-gray-500 mt-1">累计兑换消耗的星星数量</p>
        </div>

        <!-- 平均兑换价值 -->
        <div class="bg-white rounded-2xl border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8V16M12 11V16M8 14V16M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="text-3xl font-bold text-gray-900">{{ averagePoints }}</span>
          </div>
          <h3 class="text-sm font-medium text-gray-900">平均兑换价值</h3>
          <p class="text-sm text-gray-500 mt-1">每个奖励平均所需星星数</p>
        </div>
      </section>

      <!-- 奖励列表区域 -->
      <section class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div class="p-6 md:p-8 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-bold text-gray-900">全部奖励</h2>
              <p class="text-sm text-gray-500 mt-1">管理可兑换的奖励项目</p>
            </div>
            <button 
              @click="showAddRewardModal = true"
              class="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium text-sm hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-sm hover:shadow focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4V20M20 12L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              添加奖励
            </button>
          </div>
        </div>

        <!-- 奖励卡片列表 -->
        <div class="p-6 md:p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div 
              v-for="reward in rewards" 
              :key="reward.id" 
              class="group relative bg-white rounded-xl border border-gray-100 p-6 hover:border-amber-100 hover:shadow-sm transition-all duration-200"
            >
              <div class="flex flex-col h-full">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                      {{ reward.title }}
                    </h3>
                    <p class="text-sm text-gray-500 line-clamp-2">{{ reward.description }}</p>
                  </div>
                  <div class="flex items-center justify-center w-10 h-10 rounded-full bg-amber-50 ml-4">
                    <span class="text-amber-600 font-semibold text-sm">{{ reward.points }}</span>
                  </div>
                </div>
                <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <span 
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                    :class="reward.available ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'"
                  >
                    {{ reward.available ? '可兑换' : '已兑完' }}
                  </span>
                  <button 
                    @click="deleteReward(reward.id)"
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
            v-if="!rewards.length" 
            class="flex flex-col items-center justify-center py-12 px-4"
          >
            <div class="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-amber-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12H15M12 9V15M12 3C19.2 3 21 4.8 21 12C21 19.2 19.2 21 12 21C4.8 21 3 19.2 3 12C3 4.8 4.8 3 12 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-1">还没有奖励</h3>
            <p class="text-sm text-gray-500 text-center max-w-sm">
              点击"添加奖励"按钮开始创建新的奖励吧！
            </p>
          </div>
        </div>
      </section>
    </main>

    <!-- 添加奖励模态框 -->
    <AddRewardModal v-if="showAddRewardModal" @close="showAddRewardModal = false" @add="addReward" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import AddRewardModal from '@/components/AddRewardModal.vue'

const appStore = useAppStore()
const showAddRewardModal = ref(false)

// 计算属性
const points = computed(() => appStore.points)
const availableRewards = computed(() => rewards.value.filter(r => r.available).length)
const redeemedCount = computed(() => 15) // 模拟数据
const totalPointsSpent = computed(() => 280) // 模拟数据
const averagePoints = computed(() => Math.round(rewards.value.reduce((acc, cur) => acc + cur.points, 0) / rewards.value.length || 0))

// 模拟数据
const rewards = ref([
  {
    id: 1,
    title: '额外的游戏时间',
    description: '可以获得30分钟的额外游戏时间',
    points: 20,
    available: true
  },
  {
    id: 2,
    title: '选择今天的晚餐',
    description: '可以选择想吃的晚餐',
    points: 30,
    available: true
  },
  {
    id: 3,
    title: '新玩具',
    description: '可以挑选一个喜欢的玩具',
    points: 100,
    available: false
  }
])

// 方法
const addReward = (reward) => {
  rewards.value.push({
    id: Date.now(),
    ...reward,
    available: true
  })
  showAddRewardModal.value = false
}

const deleteReward = (rewardId) => {
  if (confirm('确定要删除这个奖励吗？')) {
    rewards.value = rewards.value.filter(r => r.id !== rewardId)
  }
}
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
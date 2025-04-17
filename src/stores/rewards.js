import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAppStore } from './app'

export const useRewardsStore = defineStore('rewards', () => {
  // 从本地存储加载奖励
  const storedRewards = localStorage.getItem('starTasks_rewards')
  const rewards = ref(storedRewards ? JSON.parse(storedRewards) : [])
  
  // 从本地存储加载奖励请求
  const storedRequests = localStorage.getItem('starTasks_rewardRequests')
  const rewardRequests = ref(storedRequests ? JSON.parse(storedRequests) : [])
  
  const appStore = useAppStore()

  // 所有奖励
  const allRewards = computed(() => rewards.value)
  
  // 按状态过滤的奖励
  const availableRewards = computed(() => rewards.value.filter(reward => !reward.redeemed))
  const redeemedRewards = computed(() => rewards.value.filter(reward => reward.redeemed))
  
  // 奖励请求
  const pendingRewardRequests = computed(() => rewardRequests.value.filter(request => request.status === 'pending'))

  // 将更改保存到本地存储
  function saveRewards() {
    localStorage.setItem('starTasks_rewards', JSON.stringify(rewards.value))
  }
  
  // 将奖励请求保存到本地存储
  function saveRewardRequests() {
    localStorage.setItem('starTasks_rewardRequests', JSON.stringify(rewardRequests.value))
  }

  // 添加默认奖励（如果没有奖励）
  function addDefaultRewards() {
    if (rewards.value.length === 0) {
      const defaultRewards = [
        {
          id: '1',
          title: '额外30分钟游戏时间',
          description: '可以额外获得30分钟的游戏时间',
          category: '特权奖励',
          points: 15,
          redeemed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: '选择一部电影观看',
          description: '周末可以选择一部电影和家人一起观看',
          category: '体验奖励',
          points: 20,
          redeemed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          title: '小玩具或者文具',
          description: '可以从商店选择一个小玩具或者文具',
          category: '物质奖励',
          points: 30,
          redeemed: false,
          createdAt: new Date().toISOString()
        }
      ]
      
      rewards.value = defaultRewards
      saveRewards()
    }
  }

  // 初始化
  addDefaultRewards()

  // 添加新奖励
  function addReward(reward) {
    const newReward = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      redeemed: false,
      ...reward
    }
    rewards.value.push(newReward)
    saveRewards()
    appStore.notify('奖励已添加', 'success')
    return newReward
  }

  // 请求奖励
  function requestReward(rewardId) {
    const reward = rewards.value.find(r => r.id === rewardId)
    if (!reward) return false
    
    // 检查积分是否足够
    if (appStore.points >= reward.points) {
      // 减少积分并创建奖励请求
      appStore.removePoints(reward.points)
      
      const request = {
        id: Date.now().toString(),
        rewardId: reward.id,
        title: reward.title,
        description: reward.description,
        points: reward.points,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
      
      rewardRequests.value.push(request)
      saveRewardRequests()
      
      return true
    } else {
      appStore.notify('星星不足，无法兑换', 'error')
      return false
    }
  }
  
  // 批准奖励请求
  function approveRewardRequest(requestId) {
    const requestIndex = rewardRequests.value.findIndex(r => r.id === requestId)
    if (requestIndex !== -1) {
      rewardRequests.value[requestIndex].status = 'approved'
      rewardRequests.value[requestIndex].processedAt = new Date().toISOString()
      saveRewardRequests()
      return true
    }
    return false
  }
  
  // 拒绝奖励请求
  function rejectRewardRequest(requestId) {
    const requestIndex = rewardRequests.value.findIndex(r => r.id === requestId)
    if (requestIndex !== -1) {
      const request = rewardRequests.value[requestIndex]
      
      // 退还积分
      appStore.addPoints(request.points)
      
      request.status = 'rejected'
      request.processedAt = new Date().toISOString()
      saveRewardRequests()
      return true
    }
    return false
  }

  // 兑换奖励
  function redeemReward(rewardId) {
    const rewardIndex = rewards.value.findIndex(reward => reward.id === rewardId)
    if (rewardIndex !== -1) {
      const reward = rewards.value[rewardIndex]
      
      // 检查积分是否足够
      if (appStore.points >= reward.points) {
        // 减少积分并标记奖励为已兑换
        appStore.removePoints(reward.points)
        rewards.value[rewardIndex].redeemed = true
        rewards.value[rewardIndex].redeemedAt = new Date().toISOString()
        saveRewards()
        appStore.notify(`已兑换奖励：${reward.title}`, 'success')
        return true
      } else {
        appStore.notify('星星不足，无法兑换', 'error')
        return false
      }
    }
    return false
  }

  // 删除奖励
  function deleteReward(rewardId) {
    const rewardIndex = rewards.value.findIndex(reward => reward.id === rewardId)
    if (rewardIndex !== -1) {
      rewards.value.splice(rewardIndex, 1)
      saveRewards()
      appStore.notify('奖励已删除', 'info')
      return true
    }
    return false
  }

  // 恢复已兑换的奖励
  function restoreReward(rewardId) {
    const rewardIndex = rewards.value.findIndex(reward => reward.id === rewardId)
    if (rewardIndex !== -1 && rewards.value[rewardIndex].redeemed) {
      // 返回积分
      appStore.addPoints(rewards.value[rewardIndex].points)
      // 重置奖励状态
      rewards.value[rewardIndex].redeemed = false
      delete rewards.value[rewardIndex].redeemedAt
      saveRewards()
      appStore.notify('奖励已恢复', 'success')
      return true
    }
    return false
  }

  return {
    rewards,
    allRewards,
    availableRewards,
    redeemedRewards,
    rewardRequests,
    pendingRewardRequests,
    addReward,
    requestReward,
    approveRewardRequest,
    rejectRewardRequest,
    redeemReward,
    deleteReward,
    restoreReward
  }
}) 
<template>
  <div 
    class="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
  >
    <div class="p-4 border-b border-gray-100">
      <div class="flex justify-between items-start">
        <h3 class="font-semibold text-gray-800 text-lg">{{ reward.title }}</h3>
        <span class="flex items-center bg-amber-100 text-amber-700 rounded-full px-2.5 py-1 text-xs font-medium">
          <svg class="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          {{ reward.cost }}
        </span>
      </div>
      <p class="text-sm text-gray-600 mt-2 mb-4">{{ reward.description }}</p>
      <div class="flex justify-between items-center">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
          :class="{
            'bg-purple-100 text-purple-800': reward.category === '特权奖励',
            'bg-blue-100 text-blue-800': reward.category === '体验奖励',
            'bg-teal-100 text-teal-800': reward.category === '物质奖励',
            'bg-gray-100 text-gray-800': !['特权奖励', '体验奖励', '物质奖励'].includes(reward.category)
          }"
        >
          {{ reward.category }}
        </span>
        
        <button 
          @click="$emit('redeem', reward)"
          :disabled="points < reward.cost"
          class="btn py-1.5 px-4 text-sm transition-all duration-200"
          :class="points >= reward.cost 
            ? 'btn-secondary hover:scale-105' 
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'"
        >
          <span v-if="points >= reward.cost">兑换</span>
          <span v-else>积分不足</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  reward: Object,
  points: Number
});

defineEmits(['redeem']);
</script> 
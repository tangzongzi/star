<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- 背景遮罩 -->
    <div class="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" @click="$emit('close')"></div>
    
    <!-- 模态框内容 -->
    <div class="relative w-full max-w-lg mx-4 animate-modal-in">
      <div class="relative bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- 模态框头部 -->
        <div class="px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-white">添加新奖励</h2>
            <button 
              @click="$emit('close')"
              class="p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- 模态框内容 -->
        <div class="p-6">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="space-y-4">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-1" for="title">
                  奖励名称
                </label>
                <input
                  id="title"
                  v-model="form.title"
                  type="text"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-colors"
                  placeholder="例如：额外的游戏时间"
                  required
                />
              </div>
              
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-1" for="description">
                  奖励描述
                </label>
                <textarea
                  id="description"
                  v-model="form.description"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-colors min-h-[120px] resize-none"
                  placeholder="详细描述奖励内容..."
                  required
                ></textarea>
              </div>
              
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-1" for="points">
                  所需星星
                </label>
                <div class="relative">
                  <input
                    id="points"
                    v-model.number="form.points"
                    type="number"
                    min="1"
                    class="w-full pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-colors"
                    required
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg class="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex items-center justify-end space-x-4 pt-4 border-t border-gray-100">
              <button 
                type="button" 
                class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 transition-colors"
                @click="$emit('close')"
              >
                取消
              </button>
              <button 
                type="submit"
                class="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-sm hover:shadow focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                添加奖励
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close', 'add'])

const form = ref({
  title: '',
  description: '',
  points: 1
})

const handleSubmit = () => {
  emit('add', { ...form.value })
}
</script>

<style scoped>
.animate-modal-in {
  animation: modal-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modal-in {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style> 
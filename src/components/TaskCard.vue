<template>
  <div class="bg-white border border-gray-100 hover:border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
    <!-- 任务卡片头部 - 根据任务状态显示不同颜色 -->
    <div 
      :class="[
        'px-4 py-3 border-b', 
        task.status === 'approved' ? 'bg-green-50 border-green-100' : 
        task.status === 'completed' ? 'bg-yellow-50 border-yellow-100' :
        task.status === 'rejected' ? 'bg-red-50 border-red-100' : 
        'bg-blue-50 border-blue-100'
      ]"
    >
      <div class="flex justify-between items-center">
        <h3 class="text-sm md:text-base font-medium truncate" :title="task.title">
          {{ task.title }}
        </h3>
        <div 
          :class="[
            'text-xs font-medium px-2 py-0.5 rounded-full',
            task.status === 'pending' ? 'bg-blue-100 text-blue-800' :
            task.status === 'completed' ? 'bg-yellow-100 text-yellow-800' :
            task.status === 'approved' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          ]"
        >
          {{ 
            task.status === 'pending' ? '待完成' :
            task.status === 'completed' ? '待审核' :
            task.status === 'approved' ? '已完成' :
            '已拒绝'
          }}
        </div>
      </div>
    </div>
    
    <!-- 任务卡片内容 -->
    <div class="p-4">
      <!-- 任务描述 -->
      <p class="text-sm text-gray-600 mb-3" v-if="task.description">{{ task.description }}</p>
      
      <!-- 任务详情 -->
      <div class="flex flex-wrap gap-2 mb-3">
        <!-- 任务积分 -->
        <div class="bg-amber-50 px-2 py-1 rounded-md flex items-center text-xs">
          <svg class="w-3 h-3 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <span class="font-medium">{{ task.points }} 星星</span>
        </div>
        
        <!-- 任务难度 -->
        <div class="bg-blue-50 px-2 py-1 rounded-md flex items-center text-xs">
          <svg class="w-3 h-3 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          <span>难度: {{ 
            task.difficulty === 1 ? '简单' : 
            task.difficulty === 2 ? '适中' : 
            task.difficulty === 3 ? '有挑战' : 
            task.difficulty === 4 ? '困难' : 
            '极难'
          }}</span>
        </div>
        
        <!-- 创建时间 -->
        <div class="bg-gray-50 px-2 py-1 rounded-md flex items-center text-xs">
          <svg class="w-3 h-3 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>{{ formatDate(task.createdAt) }}</span>
        </div>
      </div>
      
      <!-- 操作区域 - 根据模式和状态显示不同按钮 -->
      <div class="mt-4 flex justify-end gap-2" v-if="!isReadonly">
        <!-- 儿童模式 - 待完成任务可以标记完成 -->
        <button 
          v-if="mode === 'child' && task.status === 'pending'" 
          @click="$emit('complete', task)"
          class="btn-primary px-3 py-1.5 text-sm"
        >
          <span class="flex items-center">
            <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            完成任务
          </span>
        </button>
        
        <!-- 家长模式 - 可以验证和拒绝任务 -->
        <template v-if="mode === 'parent' && task.status === 'completed'">
          <button 
            @click="$emit('reject', task)"
            class="btn-outline-danger px-3 py-1.5 text-sm"
          >
            <span class="flex items-center">
              <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              驳回
            </span>
          </button>
          <button 
            @click="$emit('approve', task)"
            class="btn-primary px-3 py-1.5 text-sm"
          >
            <span class="flex items-center">
              <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              确认完成
            </span>
          </button>
        </template>

        <!-- 家长模式 - 已拒绝任务可以恢复 -->
        <button 
          v-if="mode === 'parent' && task.status === 'rejected'" 
          @click="$emit('restore', task)"
          class="btn-outline-primary px-3 py-1.5 text-sm"
        >
          <span class="flex items-center">
            <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            恢复任务
          </span>
        </button>
        
        <!-- 家长模式 - 可以删除待完成任务 -->
        <button 
          v-if="mode === 'parent' && task.status === 'pending'" 
          @click="$emit('delete', task)"
          class="btn-outline-danger px-3 py-1.5 text-sm"
        >
          <span class="flex items-center">
            <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            删除
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true
  },
  mode: {
    type: String,
    default: 'parent',
    validator: (value) => ['parent', 'child'].includes(value)
  },
  isReadonly: {
    type: Boolean,
    default: false
  }
});

// 格式化日期
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};
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
</style> 
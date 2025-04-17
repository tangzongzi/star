<template>
  <div 
    class="glass hover:shadow-glow transition-all p-6 rounded-lg"
    :class="{ 'animate-float': task.isNew }"
  >
    <!-- 任务头部 -->
    <div class="flex justify-between items-start mb-4">
      <div class="flex-1">
        <h3 class="text-lg font-semibold mb-1">{{ task.title }}</h3>
        <p class="text-sm text-muted-foreground">{{ task.description }}</p>
      </div>
      <div class="flex items-center space-x-2">
        <span 
          class="clay px-2.5 py-1 text-sm font-medium"
          :class="statusClass"
        >
          {{ statusText }}
        </span>
        <span class="clay px-2.5 py-1 text-sm font-medium text-primary">
          {{ task.points }} 星
        </span>
      </div>
    </div>

    <!-- 任务信息 -->
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div class="flex items-center space-x-2">
        <span class="text-sm text-muted-foreground">难度：</span>
        <div class="flex">
          <span 
            v-for="n in 5" 
            :key="n"
            class="w-4 h-4"
            :class="n <= task.difficulty ? 'text-primary' : 'text-muted'"
          >
            ★
          </span>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <span class="text-sm text-muted-foreground">截止日期：</span>
        <span class="text-sm">{{ formatDate(task.deadline) }}</span>
      </div>
    </div>

    <!-- 任务操作 -->
    <div class="flex justify-end space-x-3">
      <template v-if="isParentMode">
        <button 
          v-if="task.status === 'completed'"
          @click="$emit('approve', task)"
          class="btn-primary text-xs"
        >
          批准
        </button>
        <button 
          v-if="task.status === 'completed'"
          @click="$emit('reject', task)"
          class="btn-outline text-xs text-destructive hover:bg-destructive/10"
        >
          拒绝
        </button>
        <button 
          v-if="task.status === 'rejected'"
          @click="$emit('restore', task)"
          class="btn-secondary text-xs"
        >
          恢复
        </button>
      </template>
      <template v-else>
        <button 
          v-if="task.status === 'pending'"
          @click="$emit('complete', task)"
          class="btn-primary text-xs"
        >
          完成
        </button>
      </template>
      <button 
        v-if="canDelete"
        @click="$emit('delete', task)"
        class="btn-outline text-xs text-destructive hover:bg-destructive/10"
      >
        删除
      </button>
    </div>

    <!-- 进度指示器 -->
    <div 
      v-if="task.status === 'in_progress'"
      class="mt-4 h-2 bg-secondary rounded-full overflow-hidden"
    >
      <div 
        class="h-full bg-primary transition-all duration-500"
        :style="{ width: `${task.progress || 0}%` }"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '../stores/app'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const appStore = useAppStore()
const isParentMode = computed(() => appStore.currentMode === 'parent')

// 状态相关的计算属性
const statusClass = computed(() => {
  const classes = {
    pending: 'text-muted-foreground',
    completed: 'text-primary',
    approved: 'text-green-600',
    rejected: 'text-destructive',
    expired: 'text-destructive',
    in_progress: 'text-primary'
  }
  return classes[props.task.status] || classes.pending
})

const statusText = computed(() => {
  const texts = {
    pending: '待完成',
    completed: '待审核',
    approved: '已完成',
    rejected: '已拒绝',
    expired: '已过期',
    in_progress: '进行中'
  }
  return texts[props.task.status] || '待完成'
})

const canDelete = computed(() => {
  if (isParentMode.value) return true
  return props.task.status === 'rejected'
})

// 日期格式化
const formatDate = (date) => {
  if (!date) return '无截止日期'
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
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
</style> 
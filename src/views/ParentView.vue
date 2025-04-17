<template>
  <div class="min-h-screen bg-gradient-to-br from-background to-secondary">
    <!-- 顶部导航栏 -->
    <header class="glass fixed top-0 w-full z-50 px-4 py-3">
      <div class="container mx-auto flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <h1 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent animate-gradient">
            星星任务
          </h1>
          <span class="clay px-3 py-1 text-sm">
            积分: {{ points }}
          </span>
        </div>
        <nav class="flex items-center space-x-4">
          <router-link 
            to="/parent/rewards" 
            class="clay hover:clay-pressed transition-all px-4 py-2 text-foreground"
          >
            奖励管理
          </router-link>
        </nav>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="container mx-auto pt-24 px-4">
      <!-- 欢迎卡片 -->
      <div class="glass p-6 rounded-lg mb-8 animate-float">
        <h2 class="text-xl font-semibold mb-2">欢迎，家长</h2>
        <p class="text-muted-foreground">
          通过给孩子设置任务和奖励，培养孩子的责任感和自律能力。已完成的任务会给予星星奖励，
          孩子可以用这些星星兑换奖励。
        </p>
      </div>

      <!-- 任务状态统计 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div v-for="(count, status) in taskCounts" :key="status" 
             class="clay p-4 rounded-lg text-center">
          <h3 class="text-lg font-medium mb-2">{{ status }}</h3>
          <p class="text-2xl font-bold text-primary animate-glow">{{ count }}</p>
        </div>
      </div>

      <!-- 任务列表 -->
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">全部任务</h2>
          <button 
            @click="showAddTask = true"
            class="clay hover:clay-pressed transition-all px-4 py-2 text-primary-foreground bg-primary rounded-lg"
          >
            添加新任务
          </button>
        </div>

        <!-- 任务卡片列表 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="task in tasks" :key="task.id" 
               class="glass hover:shadow-glow transition-all p-4 rounded-lg">
            <div class="flex justify-between items-start mb-3">
              <h3 class="font-medium">{{ task.title }}</h3>
              <span class="clay px-2 py-1 text-sm">{{ task.points }} 星</span>
            </div>
            <p class="text-sm text-muted-foreground mb-4">{{ task.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-sm text-muted-foreground">{{ task.deadline }}</span>
              <button 
                @click="deleteTask(task.id)"
                class="clay hover:clay-pressed transition-all px-3 py-1 text-sm text-destructive"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '../stores/app'
import { useTasksStore } from '../stores/tasks'

const appStore = useAppStore()
const tasksStore = useTasksStore()

const points = computed(() => appStore.points)
const tasks = computed(() => tasksStore.tasks)
const showAddTask = ref(false)

const taskCounts = computed(() => ({
  '待完成': tasks.value.filter(t => !t.completed && !t.expired).length,
  '待审核': tasks.value.filter(t => t.completed && !t.approved).length,
  '已完成': tasks.value.filter(t => t.completed && t.approved).length,
  '已过期': tasks.value.filter(t => t.expired).length,
}))

const deleteTask = (taskId) => {
  tasksStore.deleteTask(taskId)
  appStore.notify({
    type: 'success',
    message: '任务已删除'
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

.clay-pressed {
  box-shadow: inset 8px 8px 16px var(--clay-shadow-dark),
              inset -8px -8px 16px var(--clay-shadow-light);
}
</style> 
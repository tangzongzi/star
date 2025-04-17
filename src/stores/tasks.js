import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from './app'

export const useTasksStore = defineStore('tasks', () => {
  // 从本地存储加载任务
  const storedTasks = localStorage.getItem('starTasks_tasks')
  const tasks = ref(storedTasks ? JSON.parse(storedTasks) : [])
  const appStore = useAppStore()

  // 所有任务
  const allTasks = computed(() => tasks.value)
  
  // 按状态过滤的任务
  const pendingTasks = computed(() => tasks.value.filter(task => task.status === 'pending'))
  const completedTasks = computed(() => tasks.value.filter(task => task.status === 'completed'))
  const approvedTasks = computed(() => tasks.value.filter(task => task.status === 'approved'))
  const rejectedTasks = computed(() => tasks.value.filter(task => task.status === 'rejected'))

  // 按状态获取任务
  function getTasksByStatus(status) {
    return tasks.value.filter(task => task.status === status)
  }

  // 将更改保存到本地存储
  function saveTasks() {
    localStorage.setItem('starTasks_tasks', JSON.stringify(tasks.value))
  }

  // 添加默认任务（如果没有任务）
  function addDefaultTasks() {
    if (tasks.value.length === 0) {
      const defaultTasks = [
        {
          id: '1',
          title: '整理房间',
          description: '把床铺好，收拾玩具和书本',
          category: '家务',
          points: 5,
          status: 'pending',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: '完成家庭作业',
          description: '认真完成今天的全部家庭作业',
          category: '学习',
          points: 10,
          status: 'pending',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          title: '阅读30分钟',
          description: '阅读一本有益的书籍30分钟',
          category: '学习',
          points: 8,
          status: 'pending',
          createdAt: new Date().toISOString()
        }
      ]
      
      tasks.value = defaultTasks
      saveTasks()
    }
  }

  // 初始化
  addDefaultTasks()

  // 添加新任务
  function addTask(task) {
    const newTask = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending',
      ...task
    }
    tasks.value.push(newTask)
    saveTasks()
    appStore.notify('任务已添加', 'success')
    return newTask
  }

  // 更新任务状态
  function updateTaskStatus(taskId, newStatus) {
    const taskIndex = tasks.value.findIndex(task => task.id === taskId)
    if (taskIndex !== -1) {
      tasks.value[taskIndex].status = newStatus
      
      // 如果任务被批准，增加积分
      if (newStatus === 'approved') {
        appStore.addPoints(tasks.value[taskIndex].points)
        appStore.notify(`已获得 ${tasks.value[taskIndex].points} 星星!`, 'success')
      }
      
      saveTasks()
      return true
    }
    return false
  }

  // 删除任务
  function deleteTask(taskId) {
    const taskIndex = tasks.value.findIndex(task => task.id === taskId)
    if (taskIndex !== -1) {
      tasks.value.splice(taskIndex, 1)
      saveTasks()
      appStore.notify('任务已删除', 'info')
      return true
    }
    return false
  }

  return {
    tasks,
    allTasks,
    pendingTasks,
    completedTasks,
    approvedTasks,
    rejectedTasks,
    getTasksByStatus,
    addTask,
    updateTaskStatus,
    deleteTask
  }
}) 
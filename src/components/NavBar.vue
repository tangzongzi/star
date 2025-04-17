<template>
  <nav class="bg-white shadow-sm">
    <div class="mx-auto px-4 max-w-7xl">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <!-- 应用Logo -->
            <span class="text-xl font-bold text-gradient bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">星星任务</span>
          </div>
        </div>
        <div class="flex items-center">
          <!-- 用户信息 & 下拉菜单 -->
          <div class="ml-3 relative">
            <div>
              <button
                type="button"
                class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 items-center"
                id="user-menu-button"
                @click="toggleUserMenu"
              >
                <span class="mr-2 text-gray-700">{{ appStore.username || '用户' }}</span>
                <div class="h-8 w-8 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 flex items-center justify-center text-white">
                  {{ userInitial }}
                </div>
              </button>
            </div>
            
            <!-- 下拉菜单 -->
            <div
              v-if="isUserMenuOpen"
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white/90 backdrop-blur-sm ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
            >
              <div class="py-1">
                <router-link
                  to="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 transition-colors"
                >
                  个人资料
                </router-link>
                <button
                  @click="logout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 transition-colors"
                >
                  退出登录
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/app'

const router = useRouter()
const appStore = useAppStore()

const isUserMenuOpen = ref(false)

// 用户名首字母
const userInitial = computed(() => {
  return appStore.username ? appStore.username.substring(0, 1).toUpperCase() : '?'
})

// 切换用户菜单
function toggleUserMenu() {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

// 关闭用户菜单（点击外部）
function closeUserMenu(event) {
  const menuButton = document.getElementById('user-menu-button')
  if (menuButton && !menuButton.contains(event.target)) {
    isUserMenuOpen.value = false
  }
}

// 退出登录
async function logout() {
  try {
    await appStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('退出登录时出错:', error)
  }
}

// 监听点击事件（关闭菜单）
onMounted(() => {
  document.addEventListener('click', closeUserMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeUserMenu)
})
</script>

<style scoped>
.text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
</style> 
<template>
  <Transition name="notification">
    <div v-if="show" 
      class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 overflow-hidden relative m-2"
      :class="{
        'ring-green-500/30': type === 'success',
        'ring-red-500/30': type === 'error',
        'ring-yellow-500/30': type === 'warn',
        'ring-blue-500/30': type === 'info'
      }"
    >
      <div class="flex-1 p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <!-- Success Icon -->
            <svg v-if="type === 'success'" class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            
            <!-- Error Icon -->
            <svg v-else-if="type === 'error'" class="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            
            <!-- Warning Icon -->
            <svg v-else-if="type === 'warn'" class="h-6 w-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            
            <!-- Info Icon -->
            <svg v-else class="h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-3 w-0 flex-1">
            <p class="text-sm font-medium text-gray-900">{{ message }}</p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button @click="close" class="inline-flex text-gray-400 focus:outline-none hover:text-gray-500">
              <span class="sr-only">关闭</span>
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Progress Bar -->
      <div class="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
        <div 
          class="h-full transition-transform duration-linear transform origin-left"
          :class="{
            'bg-green-500': type === 'success',
            'bg-red-500': type === 'error',
            'bg-yellow-500': type === 'warn',
            'bg-blue-500': type === 'info'
          }"
          :style="{ 
            animation: `shrink ${timeout}ms linear forwards`
          }"
        ></div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warn', 'info'].includes(value)
  },
  timeout: {
    type: Number,
    default: 3000
  }
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};

let timer = null;

onMounted(() => {
  if (props.timeout > 0) {
    timer = setTimeout(() => {
      close();
    }, props.timeout);
  }
});

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
  }
});
</script>

<style scoped>
@keyframes shrink {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style> 
<template>
  <div class="notification-container">
    <NotificationToast
      v-for="notification in notifications"
      :key="notification.id"
      :show="notification.show"
      :message="notification.message"
      :type="notification.type"
      :timeout="notification.timeout"
      @close="closeNotification(notification.id)"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAppStore } from '../stores/app';
import NotificationToast from './NotificationToast.vue';

const appStore = useAppStore();

const notifications = computed(() => {
  return appStore.notifications;
});

const closeNotification = (id) => {
  appStore.closeNotification(id);
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  pointer-events: none;
  max-width: 400px;
}

.notification-container :deep(.notification-toast) {
  pointer-events: auto;
  width: 100%;
}

@media (max-width: 640px) {
  .notification-container {
    top: auto;
    bottom: 20px;
    left: 20px;
    right: 20px;
    align-items: stretch;
  }
}
</style> 
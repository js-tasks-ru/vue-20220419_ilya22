<template>
  <div class="toasts">
    <div v-for="toast in toasts" :class="`toast toast_${toast.type}`">
      <ui-icon class="toast__icon" :icon="$options.ICONS[toast.type]" />
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import UiIcon from './UiIcon';

type ToastType = 'error' | 'success';
type Toast = { type: ToastType; message: string; timeoutId?: unknown };

const ICONS = {
  success: 'check-circle',
  error: 'alert-circle',
} as const;

export default {
  name: 'TheToaster',

  components: { UiIcon },

  ICONS,

  REMOVE_INTERVAL: 5000,

  data() {
    return {
      toasts: new Array<Toast>(),
    };
  },

  methods: {
    error(message: string) {
      const toast: Toast = {
        type: 'error',
        message,
      };
      this.pushToast(toast);
    },

    success(message: string) {
      const toast: Toast = {
        type: 'success',
        message,
      };
      this.pushToast(toast);
    },

    pushToast(toast: Toast) {
      this.toasts.push(toast);
      toast.timeoutId = setTimeout(() => {
        this.toasts.shift();
      }, this.$options.REMOVE_INTERVAL);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>

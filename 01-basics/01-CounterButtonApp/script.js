import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение

const RootComponent = defineComponent({
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    handleClick() {
      this.count++;
    },
  },
});
const app = createApp(RootComponent);
app.mount('#app');

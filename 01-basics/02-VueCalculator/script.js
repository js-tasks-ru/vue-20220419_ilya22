import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение

const RootComponent = defineComponent({
  data() {
    return {
      operators: {
        sum(a, b) {
          return a + b;
        },
        subtract(a, b) {
          return a - b;
        },
        multiply(a, b) {
          return a * b;
        },
        divide(a, b) {
          return a / b;
        },
      },
      operandA: 0,
      operator: null,
      operandB: 0,
    };
  },
  computed: {
    result() {
      const operatorMethod = this.operators[this.operator];
      return operatorMethod ? operatorMethod(this.operandA, this.operandB) : null;
    },
  },
});

const app = createApp(RootComponent);
app.mount('#app');

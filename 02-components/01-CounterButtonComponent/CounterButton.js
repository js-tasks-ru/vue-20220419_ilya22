import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
      required: true,
    },
  },

  emits: ['update:count'],

  methods: {
    onClick() {
      this.$emit('update:count', this.count + 1);
    },
  },

  template: `<button type="button" @click="onClick">{{ count }}</button>`,
});

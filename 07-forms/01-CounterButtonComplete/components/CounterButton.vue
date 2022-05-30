<template>
  <button @click="onClick">{{ internalCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      internalCount: 0,
    };
  },

  emits: ['update:count'],

  watch: {
    count: {
      immediate: true,
      handler(newValue) {
        this.internalCount = newValue
      }
    }
  },

  methods: {
    onClick() {
      this.$emit('update:count', ++this.internalCount);
    },
  },
};
</script>

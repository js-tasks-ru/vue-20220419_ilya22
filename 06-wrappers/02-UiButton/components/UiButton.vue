<template>
  <component :is="tag" class="button" :type="tag === 'button' ? tag : null" :class="buttonClasses" v-bind="$attrs">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'UiButton',

  inheritAttrs: false,
  props: {
    tag: {
      type: [Object, String],
      default: 'button',
    },
    variant: {
      type: String,
      default: 'secondary',
      validate: (value) => ['primary', 'secondary', 'danger'].find(value),
    },
    block: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    buttonClasses() {
      const result = {
        button_block: this.block,
      };
      result[`button_${this.variant}`] = true;
      return result;
    },
  },
};
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  border: 4px solid transparent;
  transition-duration: 0.2s;
  transition-property: background-color, border-color, color;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
}

.button.button_block {
  display: block;
  width: 100%;
}

.button_primary {
  background-color: var(--blue);
  border-color: var(--blue);
  color: var(--white);
}

.button_primary:hover {
  background-color: var(--blue-light);
  border-color: var(--blue-light);
}

.button_secondary {
  background-color: var(--white);
  border-color: var(--blue);
  color: var(--blue);
}

.button_secondary:hover {
  border-color: var(--blue-light);
}

.button_danger {
  background-color: var(--white);
  border-color: var(--red);
  color: var(--red);
}

.button_danger:hover {
  border-color: var(--red-light);
}
</style>

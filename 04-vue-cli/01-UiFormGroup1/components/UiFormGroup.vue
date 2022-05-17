<template>
  <div class="form-group" :class="extraClasses">
    <!-- form-group_inline -->
    <label v-if="label" class="form-group__label">{{ label }}</label>
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'UiFormGroup',
  props: {
    inline: {
      type: Boolean,
      default: false,
    },
    label: String,
  },
  computed: {
    extraClasses() {
      const result = [];
      if (this.inline) {
        result.push('form-group_inline');
      }
      return result;
    },
  },
};
</script>

<style scoped>
.form-group {
  position: relative;
  margin-bottom: 24px;
}

.form-group.form-group_inline {
  display: inline-block;
  margin-bottom: 0;
}

.form-group.form-group_inline + .form-group.form-group_inline {
  margin-left: 16px;
}

.form-group__label {
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  margin-bottom: 10px;
  display: block;
}
</style>

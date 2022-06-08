import { ref, watch } from 'vue';
import debounce from 'lodash/debounce';

/**
 * @template T
 * @param {Ref<T>} source - Исходный ref
 * @param {number} wait - Ожидание в миллисекундах для debounce
 * @returns {Ref<T>} - Новый ref, обновляющийся с debounce при обновлении исходного ref-а
 */
export function debouncedRef(source, wait) {
  const debounced = ref(source.value);
  let timer;
  watch(source, (newValue) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      debounced.value = newValue;
    }, wait);
  });
  return debounced;
}

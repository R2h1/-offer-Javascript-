// @ts-ignore
import { customRef } from 'vue';

export function debounceRef<T>(value: T, delay = 1000) {
  let timer: NodeJS.Timeout | null = null;
  return customRef((track: () => void, trigger: () => void) => {
    return {
      get() {
        track();
        return value;
      },
      set(val: T) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        timer = setTimeout(() => {
          timer = null;
          // 派发更新
          value = val;
          trigger();
        }, delay);
      },
    };
  });
}

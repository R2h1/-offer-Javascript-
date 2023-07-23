import { ref } from 'vue';

/**
 * 支持类型推断的指向组件的 ref
 * @param _comp 组件
 * @returns
 */
export function useCompRef<T extends abstract new (...args: any) => any>(_comp: T) {
  return ref<InstanceType<T>>();
}

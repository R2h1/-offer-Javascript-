import { computed } from 'vue';

export function useVModel(
  props: { [x: string]: any },
  propName: string | number,
  emit: (arg0: string, arg1: any) => void
) {
  return computed({
    get() {
      return new Proxy(props[propName], {
        set(obj, name, val) {
          emit(`update:${propName}`, {
            ...obj,
            [name]: val,
          });
          return true;
        },
      });
    },
    set(val) {
      emit(`update:${propName}`, val);
    },
  });
}

import { isReactive, reactive } from 'vue';

export type FormItemType = 'input' | 'select' | 'checkbox' | 'radio';

export interface FormItem {
  type: FormItemType;
  payload: any;
  next: (current: FormItem, ancestors: FormItem[]) => FormItem | null;
  parent: FormItem | null;
}

/**
 * 创建一个表单项节点
 * @param formItemType 表单项的类型
 * @param payload 表单项的数据
 * @param next 获取与当前表单项和祖先表单项关联的下一个表单项的方法
 * @param parent 当前表单项的上一个表单项节点
 * @returns
 * @example
 *   import { createFormItem } from './FormItem';
 *   const item1 = createFormItem('input',
 *     { label: 'test1', value: '' },
 *     (current) => (current.payload.value === 'test2' ? item2 : item3)
 *   );
 *   const item2 = createFormItem('select',
 *     {
 *       label: 'test2',
 *       options: [
 *         { label: 'test2-1', value: 'test2-1' },
 *         { label: 'test2-2', value: 'test2-2' },
 *         { label: 'test2-3', value: 'test2-3' },
 *       ],
 *       value: 'test2-1'
 *     },
 *     (current) => {
 *       if (current.payload.value === 'test2-2') {
 *         return item3;
 *       }
 *       if (current.payload.value === 'test2-3') {
 *         return item4;
 *       }
 *       return null;
 *     }
 *   );
 *   const item3 = createFormItem('checkbox',
 *     {
 *       label: 'test3',
 *       options: [
 *         { label: 'test3-1', value: 'test3-1' },
 *         { label: 'test3-2', value: 'test3-2' },
 *         { label: 'test3-3', value: 'test3-3' },
 *       ],
 *       value: ['test3-1', 'test3-2']
 *     },
 *     (current) => (current.payload.value.includes('test3-1') ? item4 : null);
 *   );
 *   const item4 = createFormItem('radio',
 *     {
 *       label: 'test4',
 *       options: [
 *         { label: 'test4-1', value: 'test4-1' },
 *         { label: 'test4-2', value: 'test4-2' },
 *         { label: 'test4-3', value: 'test4-3' },
 *       ],
 *       value: 'test4-1'
 *     }
 *   );
 *
 *   export default item1;
 */
export function createFormItem(
  formItemType: FormItem['type'],
  payload: FormItem['type'],
  next: FormItem['next'] = () => null,
  parent: FormItem['parent'] = null
): FormItem {
  const nextFunc: FormItem['next'] = (current, ancestors) => {
    let nextItem = next(current, ancestors);
    if (!nextItem) {
      return null;
    }
    nextItem.parent = current;
    if (!isReactive(nextItem)) {
      nextItem = reactive(nextItem);
    }
    return nextItem;
  };
  const formItem: FormItem = reactive({
    type: formItemType,
    payload,
    next: nextFunc,
    parent
  });
  return formItem;
}

import { useCallback, useState } from 'react';

interface UseControllableValue<T> {
  /** 受控状态的值 */
  value?: T;
  /** 非受控状态的初始值 */
  defaultValue?: T;
  /** 受控状态的 onChange 处理函数 */
  onChange?(value: T): void;
}
function useControllable<T>({
  value,
  defaultValue,
  onChange = () => {},
}: UseControllableValue<T>): [T, (value: T) => void, boolean] {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const handleUncontrolledChange = useCallback(
    (val: T) => {
      setUncontrolledValue(val);
      onChange?.(val);
    },
    [onChange],
  );
  if (value !== undefined) {
    return [value as T, onChange, true];
  }
  return [uncontrolledValue as T, handleUncontrolledChange, false];
}

export default useControllable;

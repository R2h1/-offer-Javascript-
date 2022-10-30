import { useEffect, useRef, useState } from 'react';

export function useDebouncedState<T = any>(defaultValue: T, wait: number, options = { leading: false }) {
  const [value, setValue] = useState(defaultValue);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const cooldownRef = useRef(false); // leading 是否冷却中

  const clear = () => clearTimeout(timeoutRef.current);
  useEffect(() => clear, []);

  const debouncedSetValue = (newValue: T) => {
    clear();
    if (!cooldownRef.current && options.leading) {
      cooldownRef.current = true;
      setValue(newValue);
    } else {
      timeoutRef.current = setTimeout(() => {
        cooldownRef.current = false;
        setValue(newValue);
      }, wait);
    }
  };

  return [value, debouncedSetValue] as const;
}

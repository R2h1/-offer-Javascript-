import { useEffect, useRef, useState } from 'react';

export default function useDebouncedValue<T = any>(value: T, delay: number, options = { leading: false }) {
  const [_value, setValue] = useState(value);
  const mountedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const cooldownRef = useRef(false); // leading 是否冷却中

  const cancel = () => clearTimeout(timeoutRef.current);

  useEffect(() => {
    if (mountedRef.current) {
      if (!cooldownRef.current && options.leading) {
        cooldownRef.current = true;
        setValue(value);
      } else {
        cancel();
        timeoutRef.current = setTimeout(() => {
          cooldownRef.current = false;
          setValue(value);
        }, delay);
      }
    }
  }, [value, options.leading, delay]);

  useEffect(() => {
    mountedRef.current = true;
    return cancel;
  }, []);

  return [_value, cancel] as const;
}

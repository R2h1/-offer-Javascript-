import { useRef, useEffect, useCallback } from 'react';

export default function useTimeoutFn(fn: Function, delay = 0, options = { autoInvoke: false }) {
  const ready = useRef<boolean | null>(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const fnRef = useRef(fn);

  const isReady = useCallback(() => ready.current, []);

  const set = useCallback(
    (...args: any[]) => {
      ready.current = false;
      timeout.current && clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        ready.current = true;
        fnRef.current(...args);
      }, delay);
    },
    [delay]
  );

  const clear = useCallback(() => {
    ready.current = null;
    timeout.current && clearTimeout(timeout.current);
  }, []);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  useEffect(() => {
    if (options.autoInvoke) {
      set();
    }
    return clear;
  }, [delay]);

  return [isReady, clear, set] as const;
}

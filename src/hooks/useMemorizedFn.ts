import React from 'react';
export function useMemoizedFn<T extends Function>(fn: T, dependencies: React.DependencyList) {
  const ref = React.useRef(fn);

  React.useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  // useCallback 返回的函数没变，因此使用引用相等性去避免非必要渲染就没失效
  return React.useCallback((...args: unknown[]) => {
    const fn = ref.current;
    return fn(...args);
  }, []);
}

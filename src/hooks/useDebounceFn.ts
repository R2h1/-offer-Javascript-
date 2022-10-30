import { DependencyList, useEffect } from 'react';
import useTimeoutFn from './useTimeoutFn';

export type UseDebounceReturn = [() => boolean | null, () => void];

export default function useDebounceFn(fn: Function, delay = 0, deps: DependencyList = []): UseDebounceReturn {
  const [isReady, cancel, reset] = useTimeoutFn(fn, delay, { autoInvoke: true });
  useEffect(reset, deps);
  return [isReady, cancel];
}

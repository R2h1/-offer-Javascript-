import React from 'react';
import { useRef } from 'react';
import useLatest from './useLatest';
import useMount from './useMount';

const useUnmount = (fn: () => any): void => {
  const fnRef = useLatest(fn);
  useMount(() => () => fnRef.current());
};

export default useUnmount;

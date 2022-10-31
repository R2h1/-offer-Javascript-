import { useCallback, useMemo } from 'react';
import useControllable from './useControllable';

export interface PaginationParams {
  /** 初始渲染时选择的页面，默认为1 */
  initialPage?: number;
  /** 受控的当前页面号 */
  page?: number;
  /** 总页数 */
  total: number;
  /** 当前 page 左右的兄弟姐妹数量，默认为 1 */
  siblings?: number;
  /** 左/右边缘可见 page 的数量，默认为 1 */
  boundaries?: number;
  /** page 更改后触发的回调 */
  onChange?: (page: number) => void;
}
/** 提供 page 和 onChange，由外部控制状态，否则只能由状态属于内部 */
export function usePagination({
  total, page, initialPage = 1, onChange,
}: PaginationParams) {
  const [activePage, setActivePage] = useControllable({
    value: page,
    onChange,
    defaultValue: initialPage,
  });

  const setPage = useCallback(
    (pageNumber: number) => {
      if (pageNumber <= 0) {
        setActivePage(1);
      } else if (pageNumber > total) {
        setActivePage(total);
      } else {
        setActivePage(pageNumber);
      }
    },
    [total],
  );

  const next = useCallback(() => setPage(activePage + 1), [setPage, activePage]);
  const previous = useCallback(() => setPage(activePage - 1), [setPage, activePage]);
  const first = useCallback(() => setPage(1), [setPage]);
  const last = useCallback(() => setPage(total), [total, setPage]);

  return useMemo(
    () => ({
      active: activePage,
      setPage,
      next,
      previous,
      first,
      last,
    }),
    [activePage, setPage, next, previous, first, last],
  );
}

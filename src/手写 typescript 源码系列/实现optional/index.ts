// 将类型 T 中 K 这部分属性设置为可选的
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * js 利用代理实现单例
 * @param className
 * @returns
 */
function singleton<T extends object>(className: Constructor<T>) {
  let instance: T | null = null;
  return new Proxy(className, {
    construct(target, args) {
      if (!instance) {
        instance = new target(...args);
      }
      return instance;
    },
  });
}

/**
 * typescript 实现单例（不需要使用代理）
 */
class Singleton {
  private static instance: Singleton;
  private constructor() {}

  public static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }

  someMethod() {}
}

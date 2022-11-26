export interface IVersionAPI {
  dependency: (type: string) => string;
  getData: () => Promise<void>;
}

declare global {
  interface Window {
    versions: IVersionAPI;
  }
}

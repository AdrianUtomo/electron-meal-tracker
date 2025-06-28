interface IElectronAPI {
  ipcRenderer: {
    send: (channel: string, ...args: any[]) => void;
    invoke: (channel: string, ...args: any[]) => Promise<any>;
  };
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
} 
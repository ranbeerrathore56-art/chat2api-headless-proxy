import { ProxyServer } from './src/main/proxy/server';

// Create a mock storeManager that doesn't use electron
global.storeManager = {
  getConfig: () => ({
    toolCallingConfig: {}
  }),
  getProviders: () => [],
  addLog: console.log,
  addRequestLog: () => ({}),
  recordRequestInStats: () => {},
  getEffectiveModels: () => [],
  getAccountsByProviderId: () => [],
  updateAccount: () => {}
} as any;

const server = new ProxyServer();
server.start();
console.log("Headless proxy started!");

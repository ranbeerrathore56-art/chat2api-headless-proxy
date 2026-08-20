export const app = {
  getPath: () => process.cwd(),
  isPackaged: false,
  getVersion: () => '1.4.0',
  name: 'chat2api'
};
export const safeStorage = {
  isEncryptionAvailable: () => false,
  encryptString: (str) => Buffer.from(str),
  decryptString: (buf) => buf.toString()
};
export const BrowserWindow = {
  getAllWindows: () => []
};
export const ipcMain = {
  handle: () => {},
  on: () => {}
};
export default { app, safeStorage, BrowserWindow, ipcMain };

export const app = {
  isPackaged: false,
  getAppPath: () => process.cwd(),
  getPath: (name: string) => {
    if (name === 'userData') {
      const p = require('path');
      const fs = require('fs');
      const userDataPath = p.join(process.cwd(), 'user-data');
      if (!fs.existsSync(userDataPath)) fs.mkdirSync(userDataPath, { recursive: true });
      return userDataPath;
    }
    return '';
  }
};
export const ipcMain = { handle: () => {}, on: () => {} };
export const BrowserWindow = { getAllWindows: () => [] };
export const shell = { openExternal: () => {} };
export const dialog = {};
export const nativeTheme = {};
export const safeStorage = {
  isEncryptionAvailable: () => false,
  encryptString: (str: string) => Buffer.from(str),
  decryptString: (buf: Buffer) => buf.toString()
};

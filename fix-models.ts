import { storeManager } from './src/main/store/store';
async function fix() {
  await storeManager.initialize();
  const accs = storeManager.getAccounts();
  const ds = accs.find(a => a.providerId === 'deepseek');
  if (ds) {
    storeManager.updateAccount(ds.id, {
      models: ["deepseek-v4-flash", "deepseek-v4-pro", "deepseek-v4-flash-think", "deepseek-v4-flash-search"]
    });
    console.log("Updated DeepSeek models!");
  }
}
fix().catch(console.error);

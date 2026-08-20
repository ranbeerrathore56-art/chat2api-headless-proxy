import { storeManager } from './src/main/store/store';
async function fix() {
  await storeManager.initialize();
  
  storeManager.updateProvider('deepseek', { enabled: true });
  const accs = storeManager.getAccounts();
  const ds = accs.find(a => a.providerId === 'deepseek');
  if (ds) {
    storeManager.updateAccount(ds.id, {
      enabled: true,
      status: 'valid'
    });
    console.log("Account enabled!");
  }
}
fix().catch(console.error);

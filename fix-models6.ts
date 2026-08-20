import { storeManager } from './src/main/store/store';
async function test() {
  await storeManager.initialize();
  const accs = storeManager.getAccountsByProviderId('deepseek');
  for (const a of accs) {
    storeManager.updateAccount(a.id, {
      status: 'active'
    });
  }
  console.log("Marked active!");
}
test().catch(console.error);

import { storeManager } from './src/main/store/store';
async function test() {
  await storeManager.initialize();
  const accounts = storeManager.getAccountsByProviderId('deepseek');
  console.log("Found DeepSeek Accounts:", accounts);
}
test().catch(console.error);

import { storeManager } from './src/main/store/store';
import { loadBalancer } from './src/main/proxy/loadbalancer';
async function test() {
  await storeManager.initialize();
  const accs = storeManager.getAccountsByProviderId('deepseek');
  console.log("Accounts status:");
  for (const a of accs) {
    console.log(a.name, a.enabled, a.status);
  }
}
test().catch(console.error);

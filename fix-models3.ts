import { storeManager } from './src/main/store/store';
import { loadBalancer } from './src/main/proxy/loadbalancer';
async function test() {
  await storeManager.initialize();
  const accs = storeManager.getAccountsByProviderId('deepseek');
  console.log("Accounts:", accs);
  const models = storeManager.getEffectiveModels('deepseek');
  console.log("Effective models:", models);
  const sel = await loadBalancer.getAccount('deepseek-v4-flash', 'deepseek');
  console.log("Selected:", sel);
}
test().catch(console.error);

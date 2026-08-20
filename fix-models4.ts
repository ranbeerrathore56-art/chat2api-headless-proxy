import { storeManager } from './src/main/store/store';
async function test() {
  await storeManager.initialize();
  const provider = storeManager.getProviderById('deepseek');
  console.log("Provider:", provider);
}
test().catch(console.error);

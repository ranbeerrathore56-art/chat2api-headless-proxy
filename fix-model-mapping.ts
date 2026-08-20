import { storeManager } from './src/main/store/store';
async function fix() {
  await storeManager.initialize();
  const config = storeManager.getConfig();
  console.log("Global config:", config.modelMappings);
}
fix().catch(console.error);

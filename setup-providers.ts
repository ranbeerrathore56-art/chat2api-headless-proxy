import { storeManager } from './src/main/store/store';
import { builtinProviders } from './src/main/providers/builtin';

async function main() {
  await storeManager.initialize();
  
  for (const provider of builtinProviders) {
    const existing = storeManager.getProviderById(provider.id);
    if (!existing) {
      storeManager.addProvider(provider);
      console.log(`Added built-in provider: ${provider.id}`);
    } else {
      storeManager.updateProvider(provider.id, provider);
      console.log(`Updated built-in provider: ${provider.id}`);
    }
  }
}
main().catch(console.error);

import { storeManager } from './src/main/store/store';
import { randomUUID } from 'crypto';

async function main() {
  await storeManager.initialize();
  
  const accountId = randomUUID();
  const token = '{"value":"9dUgwK6cIT+JkQKLbLorKGyI89kGl3dpql1Qz9Gj7E+4amMb+9126XMDx/eWduQa","__version":"0"}';
  
  // Clean existing deepseek accounts to avoid duplicates
  const existing = storeManager.getAccountsByProviderId('deepseek');
  for (const acc of existing) {
    storeManager.deleteAccount(acc.id);
  }
  
  storeManager.addAccount({
    id: accountId,
    name: 'Deepseek Default',
    providerId: 'deepseek',
    enabled: true,
    credentials: {
      token: token
    },
    models: ['deepseek-v4-flash', 'deepseek-v4-pro'],
    status: 'valid'
  });
  
  console.log("DeepSeek account added! ID:", accountId);
}
main().catch(console.error);

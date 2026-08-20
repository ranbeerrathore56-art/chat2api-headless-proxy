import { storeManager } from './src/main/store/store';
async function test() {
  await storeManager.initialize();
  const accs = storeManager.getAccountsByProviderId('deepseek');
  for (const a of accs) {
    storeManager.updateAccount(a.id, {
      credentials: {
        token: '9dUgwK6cIT+JkQKLbLorKGyI89kGl3dpql1Qz9Gj7E+4amMb+9126XMDx/eWduQa'
      }
    });
  }
  console.log("Marked active!");
}
test().catch(console.error);

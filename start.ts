import { ProxyServer } from './src/main/proxy/server';
import { storeManager } from './src/main/store/store';
import { builtinProviders } from './src/main/providers/builtin';
import { randomUUID } from 'crypto';
import * as fs from 'fs';

async function main() {
  await storeManager.initialize();
  
  // Register builtin providers
  for (const provider of builtinProviders) {
    const existing = storeManager.getProviderById(provider.id);
    if (!existing) storeManager.addProvider(provider);
    else storeManager.updateProvider(provider.id, provider);
  }

  // Auto-inject DeepSeek tokens
  if (process.env.DEEPSEEK_TOKENS) {
    console.log("Loading DeepSeek tokens from environment...");
    const tokens = process.env.DEEPSEEK_TOKENS.split(',');
    
    const existing = storeManager.getAccountsByProviderId('deepseek');
    for (const acc of existing) storeManager.deleteAccount(acc.id);

    let count = 1;
    for (const token of tokens) {
      if (!token.trim()) continue;
      
      const cleanToken = token.trim();
      storeManager.addAccount({
        id: randomUUID(),
        name: `DeepSeek Account ${count++}`,
        providerId: 'deepseek',
        enabled: true,
        credentials: { token: cleanToken },
        models: ['deepseek-v4-flash', 'deepseek-v4-pro', 'deepseek-v4-flash-think', 'deepseek-v4-flash-search'],
        status: 'active'
      });
    }
  }

  // Auto-inject Qwen tokens
  if (process.env.QWEN_TOKENS) {
    console.log("Loading Qwen AI tokens from environment...");
    const tokens = process.env.QWEN_TOKENS.split(',');
    
    const existing = storeManager.getAccountsByProviderId('qwen-ai');
    for (const acc of existing) storeManager.deleteAccount(acc.id);

    let count = 1;
    for (const token of tokens) {
      if (!token.trim()) continue;
      
      storeManager.addAccount({
        id: randomUUID(),
        name: `Qwen Account ${count++}`,
        providerId: 'qwen-ai',
        enabled: true,
        credentials: { token: token.trim() },
        models: ['qwen3.7-max', 'qwen3.6-plus', 'qwen3.6-35b-a3b', 'qwen3.6-27b', 'qwen3-coder-plus'],
        status: 'active'
      });
    }
  }

  if (process.env.MIMO_ACCOUNTS) {
    try {
      const accounts = JSON.parse(process.env.MIMO_ACCOUNTS);
      const existing = storeManager.getAccountsByProviderId('mimo');
      for (const acc of existing) storeManager.deleteAccount(acc.id);
      
      let count = 1;
      for (const acc of accounts) {
        storeManager.addAccount({
          id: randomUUID(),
          name: `MiMo Account ${count++}`,
          providerId: 'mimo',
          enabled: true,
          credentials: {
            service_token: acc.service_token,
            user_id: acc.user_id,
            ph_token: acc.ph_token
          },
          models: ['mimo-v2.5-pro', 'mimo-v2.5', 'mimo-v2-flash'],
          status: 'active'
        });
      }
    } catch(e) {
      console.error("Failed to parse MIMO_ACCOUNTS env var", e);
    }
  }

  // Determine port from environment or fallback to 8080
  const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;

  // Start the server
  const server = new ProxyServer();
  server.start(port, '0.0.0.0');
  console.log(`Headless proxy started successfully on 0.0.0.0:${port}!`);
}

main().catch(console.error);

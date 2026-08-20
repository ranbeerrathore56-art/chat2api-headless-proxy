const { spawn } = require('child_process');
console.log("Booting proxy wrapper...");
const server = spawn('bun', ['--preload', './preload-electron.ts', 'start.ts'], {
  stdio: 'inherit'
});

server.on('exit', (code) => {
  console.log(`Proxy exited with code ${code}`);
  process.exit(code || 0);
});

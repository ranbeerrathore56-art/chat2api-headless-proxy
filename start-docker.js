// Intercept all electron require() calls natively
const Module = require('module');
const originalRequire = Module.prototype.require;
Module.prototype.require = function(request) {
  if (request === 'electron') {
    return require('./mock-electron.ts');
  }
  return originalRequire.apply(this, arguments);
};

// Enable WASM support in Node.js
process.env.NODE_OPTIONS = (process.env.NODE_OPTIONS || "") + " --experimental-wasm-modules";

require('ts-node').register({
  transpileOnly: true,
  skipProject: true, // ignore tsconfig.json entirely
  compilerOptions: {
    module: 'commonjs',
    target: 'es2020',
    esModuleInterop: true,
    resolveJsonModule: true
  }
});

require('./start.ts');

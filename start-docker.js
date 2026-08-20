// Enable WASM support in Node.js
process.env.NODE_OPTIONS = (process.env.NODE_OPTIONS || "") + " --experimental-wasm-modules";

require('ts-node').register({
  transpileOnly: true,
  skipProject: true, // ignore tsconfig.json entirely
  compilerOptions: {
    module: 'commonjs',
    target: 'es2020',
    esModuleInterop: true,
    resolveJsonModule: true,
    paths: {
      "electron": [__dirname + "/mock-electron.ts"]
    }
  }
});

// Patch the environment to load the WASM properly if needed
require('./start.ts');

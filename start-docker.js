// Completely override any local tsconfig configurations that conflict
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
require('./start.ts');

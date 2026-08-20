import { plugin } from "bun";

plugin({
  name: "mock-electron",
  setup(build) {
    build.onResolve({ filter: /^electron$/ }, () => {
      return { path: require.resolve("./mock-electron.ts") };
    });
  },
});

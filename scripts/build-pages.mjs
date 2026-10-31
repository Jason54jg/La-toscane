import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const require = createRequire(import.meta.url);
const result = spawnSync(process.execPath, [require.resolve("next/dist/bin/next"), "build"], {
  cwd: fileURLToPath(new URL("../", import.meta.url)),
  env: { ...process.env, STATIC_EXPORT: "true", STANDALONE: "false", NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || "/La-toscane" },
  stdio: "inherit",
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);

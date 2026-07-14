// Re-export SandboxPool + policy helpers for users who need resource caps
export { SandboxPool } from "./sandbox-pool.js";
export {
  SandboxPresets,
  KnownAgentPolicies,
  mergePolicy,
  createSwGate,
  createVfsAcl,
} from "@bolojs/sandbox-policy";
export type { SandboxPolicy } from "@bolojs/sandbox-policy";
export { QuickJSSandbox } from "./quickjs-sandbox.js";
export type { SandboxBackend, SandboxRunResult } from "./vendor/runtime-types.js";

// Vendored from @browser-containers/runtime (packages/runtime/src/sandbox-backend.ts
// in the browser-containers monorepo, not published to npm). TODO: replace with a real
// `@browser-containers/runtime` npm dependency once that package is published, and
// delete this file.
export interface SandboxRunResult {
  result?: string;
  error?: string;
}

export interface SandboxBackend {
  run(code: string): Promise<SandboxRunResult>;
  dispose(): void;
}

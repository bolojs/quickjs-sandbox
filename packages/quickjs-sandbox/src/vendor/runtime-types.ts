// Vendored from @bolojs/runtime (packages/runtime/src/sandbox-backend.ts
// in the bolo monorepo, not published to npm). TODO: replace with a real
// `@bolojs/runtime` npm dependency once that package is published, and
// delete this file.
export interface SandboxRunResult {
  result?: string;
  error?: string;
}

export interface SandboxBackend {
  run(code: string): Promise<SandboxRunResult>;
  dispose(): void;
}

# quickjs-sandbox

QuickJS-based sandboxed code execution, extracted from
[browser-containers](https://github.com/browser-containers/browser-containers).

- `packages/quickjs-sandbox` — memory/CPU-capped sandbox backend with per-path VFS ACLs.
- `packages/sandbox-policy` — the policy library (`SandboxPresets`, `mergePolicy`,
  `createSwGate`, `createVfsAcl`) that `quickjs-sandbox` and browser-containers' own
  agent sandboxing both build on.

## Vendored dependencies

`quickjs-sandbox` originally depended on three other browser-containers monorepo
packages that aren't published to npm: `@browser-containers/runtime` (types only),
`@browser-containers/vfs-bus`, and `@browser-containers/wasm-registry`. Rather than
block the extraction on publishing those, the small pieces actually used are vendored
under `packages/quickjs-sandbox/src/vendor/`:

- `runtime-types.ts` — `SandboxBackend`/`SandboxRunResult` interfaces (verbatim copy,
  9 lines).
- `transform-script.ts` — the single-file TS-to-JS transform, unchanged, backed by the
  real `oxc-transform` npm package.
- `vfs-bus.ts` — a reduced `VfsBus` that only reproduces the memfs-backed `.hot` fs
  surface and `writeFile()` helper this package touches; the real `VfsBus` also handles
  OPFS persistence, eviction, and watchers, none of which this package needs.

**TODO**: once `@browser-containers/vfs-bus` and `@browser-containers/wasm-registry`
are published to npm, replace the vendored files with real dependencies and delete
`src/vendor/`.

## Development

```bash
pnpm install
pnpm build
pnpm test
```

// Vendored from @bolojs/wasm-registry (packages/wasm-registry/src/bundle.ts
// in the bolo monorepo, not published to npm) — only the single-file
// TS-to-JS transform, none of that package's bundling/module-resolution machinery.
// TODO: replace with a real `@bolojs/wasm-registry` npm dependency once
// that package is published, and delete this file.

declare global {
  // eslint-disable-next-line no-var
  var __preferLocalOxc: boolean | undefined;
}

const preferLocalOxc = () =>
  Boolean(globalThis.process?.versions?.node || globalThis.__preferLocalOxc);

// oxc-transform: lazy CDN load with Node.js/local-bundler fallback
let _oxc: Promise<typeof import("oxc-transform")> | undefined;
const getOxc = () => {
  if (!_oxc) {
    _oxc = preferLocalOxc()
      ? import("oxc-transform")
      : // @ts-ignore: runtime CDN URL, not resolvable by TypeScript
        import(/* @vite-ignore */ "https://esm.sh/oxc-transform@latest");
  }
  return _oxc;
};

export interface TransformScriptOptions {
  /** Defaults to `'ts'` — accepts plain JS too, since that's a subset. */
  readonly loader?: "ts" | "tsx" | "js" | "jsx";
}

export interface TransformScriptResult {
  readonly code: string;
  readonly warnings: string[];
}

export const transformScript = async (
  code: string,
  options?: TransformScriptOptions,
): Promise<TransformScriptResult> => {
  const oxc = await getOxc();
  const lang = options?.loader ?? "ts";
  const result = await oxc.transform(`input.${lang}`, code, { sourceType: "module" });
  if (result.errors?.length) {
    throw new Error(result.errors.map((e: any) => e.message).join("\n"));
  }
  return {
    code: result.code,
    warnings: result.errors?.map((e: any) => e.message) ?? [],
  };
};

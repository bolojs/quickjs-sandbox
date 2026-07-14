// Vendored from @browser-containers/vfs-bus (packages/vfs-bus/src/vfs-bus.ts in the
// browser-containers monorepo, not published to npm). The real VfsBus is a much larger
// class (OPFS cold-layer persistence, eviction timers, watchers, middleware); this
// vendored version only reproduces the memfs-backed `.hot` fs surface and the async
// `writeFile()` helper that this package's SandboxPool/tests actually touch, so a real
// VfsBus instance and this one are structurally interchangeable for that surface.
// TODO: replace with a real `@browser-containers/vfs-bus` npm dependency once that
// package is published, and delete this file.
import { createFsFromVolume, Volume } from "memfs";

export class VfsBus {
  readonly vol = new Volume();
  readonly hot = createFsFromVolume(this.vol);

  async writeFile(path: string, content: string | Uint8Array): Promise<void> {
    const dir = path.substring(0, path.lastIndexOf("/"));
    if (dir && !this.hot.existsSync(dir)) {
      this.hot.mkdirSync(dir, { recursive: true });
    }
    this.hot.writeFileSync(path, content);
  }
}

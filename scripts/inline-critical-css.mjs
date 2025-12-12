import { readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import Critters from 'critters';
import { glob } from 'glob';

async function run() {
  const outDir = join(process.cwd(), 'out');
  const files = await glob('**/*.html', { cwd: outDir, absolute: true });
  if (!files.length) {
    console.log('[critters] No HTML files found in out/. Skipping.');
    return;
  }

  const critters = new Critters({
    path: outDir,
    preload: 'swap',
    pruneSource: false,
    reduceInlineStyles: true,
  });

  for (const file of files) {
    try {
      const html = readFileSync(file, 'utf8');
      const inlined = await critters.process(html);
      writeFileSync(file, inlined, 'utf8');
      console.log(`[critters] Inlined CSS for ${relative(outDir, file)}`);
    } catch (e) {
      console.warn('[critters] Failed to inline', file, e);
    }
  }
}

run().catch((e) => {
  console.warn('[critters] Fatal error:', e);
});


import { existsSync, renameSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const adminPath = join(root, 'src', 'app', 'admin');
const disabledPath = join(root, '__admin.disabled');
const legacyDisabledInSrc = join(root, 'src', '__admin.disabled');
const oldDisabledInside = join(root, 'src', 'app', 'admin.disabled');

try {
  if (!existsSync(adminPath) && existsSync(disabledPath)) {
    renameSync(disabledPath, adminPath);
    console.log('[build] Restored admin route after static export.');
  } else if (!existsSync(adminPath) && existsSync(legacyDisabledInSrc)) {
    renameSync(legacyDisabledInSrc, adminPath);
    console.log('[build] Restored admin route from legacy location.');
  } else if (!existsSync(adminPath) && existsSync(oldDisabledInside)) {
    renameSync(oldDisabledInside, adminPath);
    console.log('[build] Restored admin route from app/admin.disabled.');
  }
} catch (e) {
  console.warn('[build] Failed to restore admin route:', e);
}


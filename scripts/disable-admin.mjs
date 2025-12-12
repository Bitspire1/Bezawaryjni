import { existsSync, renameSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const adminPath = join(root, 'src', 'app', 'admin');
const adminPathDisabledInside = join(root, 'src', 'app', 'admin.disabled');
// Move disabled admin completely outside of src to avoid typechecking it during Next build
const disabledPath = join(root, '__admin.disabled');
const legacyDisabledInSrc = join(root, 'src', '__admin.disabled');

try {
    // If legacy disabled folder exists inside src, move it out
    if (existsSync(legacyDisabledInSrc)) {
        if (!existsSync(disabledPath)) {
            renameSync(legacyDisabledInSrc, disabledPath);
            console.log('[build] Moved legacy disabled admin from src/__admin.disabled to project root.');
        }
    }

    if (!existsSync(disabledPath)) {
        if (existsSync(adminPath)) {
            renameSync(adminPath, disabledPath);
            console.log('[build] Temporarily disabled admin route for static export.');
        } else if (existsSync(adminPathDisabledInside)) {
            renameSync(adminPathDisabledInside, disabledPath);
            console.log('[build] Moved existing admin.disabled outside app for static export.');
        }
    }
} catch (e) {
    console.warn('[build] Failed to disable admin route:', e);
}



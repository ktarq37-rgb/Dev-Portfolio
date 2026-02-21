import { readFileSync, writeFileSync } from 'fs';

const pkgPath = '/vercel/share/v0-project/package.json';
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
pkg.dependencies.next = '15.5.7';
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log('Updated next to 15.5.7');

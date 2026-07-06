import fs from 'fs';
import path from 'path';

function scanDir(dir: string, depth = 0) {
  if (depth > 4) return;
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file === 'node_modules' || file === '.git' || file === 'dist' || file === '.npm') continue;
      const fullPath = path.join(dir, file);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          scanDir(fullPath, depth + 1);
        } else if (/\.(png|jpg|jpeg|gif|webp)$/i.test(file)) {
          console.log(`Found: ${fullPath} (${stat.size} bytes)`);
        }
      } catch (e) {}
    }
  } catch (e) {}
}

console.log('Scanning current directory...');
scanDir('.');
console.log('Scanning /tmp...');
scanDir('/tmp');

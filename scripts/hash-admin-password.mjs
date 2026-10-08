import { randomBytes, scryptSync } from 'node:crypto';
import { createInterface } from 'node:readline';
function hash(password) {
  if (password.length < 12 || password.length > 200)
    throw new Error('Password must be 12–200 characters.');
  const salt = randomBytes(16).toString('hex');
  console.log(`${salt}:${scryptSync(password, salt, 64).toString('hex')}`);
}
process.stderr.write(
  'Enter a unique admin password (at least 12 characters): ',
);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
  process.stdin.resume();
  let password = '';
  process.stdin.on('data', (chunk) => {
    for (const char of chunk.toString()) {
      if (char === '\u0003') {
        process.stdin.setRawMode(false);
        process.exit(1);
      }
      if (char === '\r' || char === '\n') {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stderr.write('\n');
        hash(password);
        process.exit(0);
      }
      if (char === '\u007f' || char === '\b') password = password.slice(0, -1);
      else if (char >= ' ' && password.length < 201) password += char;
    }
  });
} else {
  const input = createInterface({ input: process.stdin, terminal: false });
  for await (const password of input) {
    hash(password);
    input.close();
    break;
  }
}

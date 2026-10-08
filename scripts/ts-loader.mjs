import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

function normalizePath(filePath) {
  return filePath.replace(/\\/g, '/');
}

export async function resolve(specifier, context, nextResolve) {
  const root = process.cwd();
  // Preserve dependency package formats (notably pg's CommonJS internals).
  if (context.parentURL?.includes('/node_modules/')) return nextResolve(specifier, context);

  // Resolve @/ path alias
  if (specifier.startsWith('@/')) {
    const sub = specifier.slice(2);
    const target = path.join(root, 'src', sub);
    const candidates = [
      target,
      `${target}.ts`,
      `${target}.tsx`,
      `${target}.js`,
      path.join(target, 'index.ts'),
      path.join(target, 'index.tsx'),
      path.join(target, 'index.js'),
    ];
    for (const candidate of candidates) {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        const fileUrl = new URL(`file:///${normalizePath(candidate)}`).href;
        return { url: fileUrl, format: 'module', shortCircuit: true };
      }
    }
  }

  // Resolve relative imports without extensions
  if (specifier.startsWith('./') || specifier.startsWith('../')) {
    if (context.parentURL && context.parentURL.startsWith('file:')) {
      const parentDir = path.dirname(fileURLToPath(context.parentURL));
      const target = path.resolve(parentDir, specifier);
      const candidates = [
        target,
        `${target}.ts`,
        `${target}.tsx`,
        `${target}.js`,
        path.join(target, 'index.ts'),
        path.join(target, 'index.tsx'),
        path.join(target, 'index.js'),
      ];
      for (const candidate of candidates) {
        if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
          const fileUrl = new URL(`file:///${normalizePath(candidate)}`).href;
          return { url: fileUrl, format: 'module', shortCircuit: true };
        }
      }
    }
  }

  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.startsWith('file:') && (url.endsWith('.ts') || url.endsWith('.tsx'))) {
    const filePath = fileURLToPath(url);
    const source = fs.readFileSync(filePath, 'utf8');
    const transpiled = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
      },
    });
    return {
      format: 'module',
      source: transpiled.outputText,
      shortCircuit: true,
    };
  }
  return nextLoad(url, context);
}

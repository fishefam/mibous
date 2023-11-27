import { exec } from 'child_process'
import esbuild from 'esbuild'
import clean from 'esbuild-plugin-clean'
import postcss from 'esbuild-postcss'
import svelte from 'esbuild-svelte'

const { BROWSER, ENV, WITH_WEBEXT } = process.env

if (WITH_WEBEXT === 'true') exec('npm run webext')

/** @type {esbuild.SameShape<esbuild.BuildOptions, esbuild.BuildOptions>} */
const config = {
  bundle: true,
  entryPoints:
    BROWSER === 'both'
      ? [
          { in: 'index.ts', out: 'chromium/index' },
          { in: 'page/app.ts', out: 'chromium/app' },
          { in: 'manifest.v3.json', out: 'chromium/manifest' },
          { in: 'index.ts', out: 'firefox/index' },
          { in: 'page/app.ts', out: 'firefox/app' },
          { in: 'manifest.v2.json', out: 'firefox/manifest' },
        ]
      : [
          { in: 'index.ts', out: 'index' },
          { in: 'page/app.ts', out: 'app' },
          { in: `manifest.v${BROWSER === 'firefox' ? 2 : 3}.json`, out: 'manifest' },
        ],
  format: 'iife',
  legalComments: 'none',
  loader: { '.json': 'copy' },
  logLevel: 'info',
  minify: true,
  minifyWhitespace: false,
  outdir: 'dist',
  plugins: [postcss(), svelte(), clean({ patterns: ['dist'] })],
  sourcemap: ENV === 'development',
  treeShaking: true,
}

if (ENV === 'development') {
  const context = await esbuild.context(config)
  context.serve({ port: 8000 })
  context.watch()
}

esbuild.build(config)

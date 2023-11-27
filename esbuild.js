import esbuild from 'esbuild'
import clean from 'esbuild-plugin-clean'
import postcss from 'esbuild-postcss'
import svelte from 'esbuild-svelte'

const { BROWSER, ENV } = process.env

const context = await esbuild.context({
  bundle: true,
  entryPoints: [
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
})

context.watch()

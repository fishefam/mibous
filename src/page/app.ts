import './app.css'

import { select } from 'lib/dom'

import App from './App.svelte'

new EventSource('http://localhost:8000/esbuild').addEventListener('change', () => location.reload())
export default new App({ target: select('.app') as HTMLDivElement })

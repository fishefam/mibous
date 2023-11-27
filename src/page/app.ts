import './app.css'

import { select } from 'lib/dom'

import App from './App.svelte'

export default new App({ target: select('.app') as HTMLDivElement })

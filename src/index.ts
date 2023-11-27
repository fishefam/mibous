import { create, select } from 'lib/dom'
import { resolveUrl } from 'lib/util'

window.stop()

console.clear()
const html = select('html')
if (html) {
  html.innerHTML = `
        <head>
            <link rel="stylesheet" href="${resolveUrl('app.css')}">
        </head> 
        <body>
            <div class="app"></div>
            <script data-isolation></script>
        </body> 
    `
  create({ attributes: [['src', resolveUrl('app.js')]], parent: document.head, tag: 'script' })
}

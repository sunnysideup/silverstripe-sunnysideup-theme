// Basic state classes on <body>: loaded / touch / splash finished.
import { body, onReady } from './dom.js'

body.classList.remove('body-unloaded')

onReady(() => {
    body.classList.add('body-loaded')
    body.classList.add(
        window.matchMedia('(hover: none)').matches ? 'touch' : 'no-touch'
    )
    window.setTimeout(() => body.classList.add('splash-completed'), 2000)
})

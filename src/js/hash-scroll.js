// Make sure a #hash in the URL ends up in the right place once the page
// (images, fonts) has settled. Offsets are handled in CSS (scroll-margin-top).
import { onReady } from './dom.js'

const RESERVED = ['reset', 'top', 'toc', 'no-menu']

onReady(() => {
    window.addEventListener(
        'load',
        () => {
            const id = decodeURIComponent(window.location.hash.slice(1))
            if (!id || RESERVED.includes(id)) return
            const target = document.getElementById(id)
            if (target && !target.classList.contains('theme-selector')) {
                target.scrollIntoView()
            }
        },
        { once: true }
    )
})

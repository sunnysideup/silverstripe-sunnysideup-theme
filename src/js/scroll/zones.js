// Scroll position -> CSS, without a single scroll listener.
//
// Two invisible "zones" are added to the page (see .scroll-zone in
// scss/animations/scroll-zones.scss):
//   header zone: top of the page, 70vh tall
//   footer zone: the bottom 180vh of the page
//
// An IntersectionObserver reports how much of each zone is on screen
// (in 5% steps), which is all we need to know. We publish that as:
//   --header-progress   0 (top of page) ... 1 (header zone scrolled away)
//   --footer-progress   0 (footer far away) ... 1 (footer fully revealed)
//   body.past-header    header zone is gone
//   body.footer-visible footer zone is on screen (after the header)
// CSS does the rest (fading, scaling, colours).
import { body, root } from '../dom.js'
import { setRocketActive } from '../theme.js'

const STEPS = 20
const THRESHOLDS = Array.from({ length: STEPS + 1 }, (_, i) => i / STEPS)

let pastHeader = false
let footerRatio = 0

const createZone = (name) => {
    const zone = document.createElement('div')
    zone.className = `scroll-zone scroll-zone--${name}`
    zone.setAttribute('aria-hidden', 'true')
    body.appendChild(zone)
    return zone
}

function render () {
    const footerVisible = pastHeader && footerRatio > 0
    body.classList.toggle('past-header', pastHeader)
    body.classList.toggle('footer-visible', footerVisible)
    // the rocket hero is shown at the top of the page and again at the very bottom
    setRocketActive(!pastHeader || footerVisible)
}

const observe = (zone, onChange) => {
    new IntersectionObserver(
        (entries) => onChange(entries[entries.length - 1]),
        { threshold: THRESHOLDS }
    ).observe(zone)
}

observe(createZone('header'), ({ intersectionRatio }) => {
    root.style.setProperty('--header-progress', (1 - intersectionRatio).toFixed(2))
    pastHeader = intersectionRatio < 0.001
    render()
})

const footerZone = createZone('footer')
observe(footerZone, ({ intersectionRatio }) => {
    // the viewport can only ever cover (viewport / zone) of the zone: scale that to 0..1
    const fullyCovered = Math.min(1, window.innerHeight / footerZone.offsetHeight)
    const progress = Math.min(1, intersectionRatio / fullyCovered)
    root.style.setProperty('--footer-progress', progress.toFixed(2))
    footerRatio = intersectionRatio
    render()
})

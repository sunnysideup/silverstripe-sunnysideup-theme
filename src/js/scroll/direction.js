// Scroll direction + "just scrolled" state, only used by the small-screen menu.
//
//   body.scrolled-up / body.scrolled-down   changes only when direction flips
//   body.just-scrolled                      shortly after scrolling has stopped
//
// The listener is passive, runs once per frame at most, and is only attached
// on small screens (>= 1050px has a fixed side menu and does not need it).
import { body } from '../dom.js'

const SMALL_SCREEN = window.matchMedia('(max-width: 1049px)')
const MIN_DISTANCE = 6 // px, ignore jitter
const STOP_DELAY = 150 // ms without scrolling = stopped
const VISIBLE_FOR = 2200 // ms the "just-scrolled" state stays on

let lastY = window.scrollY
let goingUp = false
let frame = 0
let stopTimer = 0
let hideTimer = 0

function onStop () {
    body.classList.add('just-scrolled')
    window.clearTimeout(hideTimer)
    hideTimer = window.setTimeout(() => body.classList.remove('just-scrolled'), VISIBLE_FOR)
}

function update () {
    frame = 0
    const y = window.scrollY
    if (Math.abs(y - lastY) >= MIN_DISTANCE) {
        const up = y < lastY
        if (up !== goingUp || !body.classList.contains(up ? 'scrolled-up' : 'scrolled-down')) {
            goingUp = up
            body.classList.toggle('scrolled-up', up)
            body.classList.toggle('scrolled-down', !up)
        }
        lastY = y
    }
}

function onScroll () {
    if (!frame) frame = window.requestAnimationFrame(update)
    body.classList.remove('just-scrolled')
    window.clearTimeout(stopTimer)
    window.clearTimeout(hideTimer)
    // "scrollend" fires natively where available, otherwise fall back to a debounce
    if (!('onscrollend' in window)) stopTimer = window.setTimeout(onStop, STOP_DELAY)
}

function sync () {
    const method = SMALL_SCREEN.matches ? 'addEventListener' : 'removeEventListener'
    window[method]('scroll', onScroll, { passive: true })
    if ('onscrollend' in window) window[method]('scrollend', onStop)
    if (!SMALL_SCREEN.matches) body.classList.remove('scrolled-up', 'scrolled-down', 'just-scrolled')
}

SMALL_SCREEN.addEventListener('change', sync)
sync()

// Theme handling: sun / moon (user choice) + rocket (temporary hero mode).
//
//  - the chosen theme lives in  body[data-theme]  and in a cookie
//  - the body class list is the single output; it is only ever written
//    by render() so the scroll code cannot fight with theme switching.
import { myCookie } from './cookie.js'
import { body, hasRocketShow } from './dom.js'

const THEMES = ['theme-sun', 'theme-moon']
const COOKIE = 'preferredTheme'

let theme = body.dataset.theme || 'theme-sun'
let rocketActive = hasRocketShow()

export const getTheme = () => theme

function render () {
    const showRocket = hasRocketShow() && rocketActive
    body.classList.toggle('theme-rocket', showRocket)
    THEMES.forEach((t) => body.classList.toggle(t, !showRocket && t === theme))
}

export function setTheme (next, { remember = false } = {}) {
    if (!THEMES.includes(next)) return
    theme = next
    body.dataset.theme = next
    if (remember) myCookie.setCookie(COOKIE, next, 14)
    render()
}

// called by the scroll code: true while the hero (header / footer) is on screen
export function setRocketActive (active) {
    if (active === rocketActive) return
    rocketActive = active
    render()
}

function initialTheme () {
    const hash = window.location.hash.replace('#', '')
    if (hash === 'reset') myCookie.eraseCookie(COOKIE)
    if (THEMES.includes(hash)) return hash
    const saved = myCookie.getCookie(COOKIE)
    if (THEMES.includes(saved)) return saved
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'theme-moon'
    return theme
}

// one delegated listener for every .theme-selector on the page
document.addEventListener('click', (event) => {
    const selector = event.target.closest('.theme-selector')
    if (!selector) return
    event.preventDefault()
    setTheme(selector.id, { remember: true })
})

setTheme(initialTheme())

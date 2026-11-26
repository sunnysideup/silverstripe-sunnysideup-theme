// Opens / closes the main menu.
import { body } from './dom.js'

const toggle = document.getElementById('menu-toggle')

if (toggle) {
    const className = toggle.dataset.addClass || 'menu-on'
    toggle.addEventListener('click', () => {
        body.classList.toggle(className)
        // the logo reappears after the menu has finished closing
        window.setTimeout(() => body.classList.toggle('show-logo'), 400)
    })
}

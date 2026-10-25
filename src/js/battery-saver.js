// After 60 seconds without any interaction, show the "battery saving" screen.
const overlay = document.getElementById('battery-saver-div')
const IDLE_AFTER = 60000

if (overlay) {
    let timer = 0
    const arm = () => {
        window.clearTimeout(timer)
        timer = window.setTimeout(() => { overlay.style.display = 'flex' }, IDLE_AFTER)
    }
    overlay.addEventListener('click', () => { overlay.style.display = 'none' })
    ;['pointerdown', 'keydown', 'scroll'].forEach((type) =>
        window.addEventListener(type, arm, { passive: true })
    )
    arm()
}

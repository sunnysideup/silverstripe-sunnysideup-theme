// Swipeable carousel for work example screenshots.
// Touch / trackpad swiping is native (CSS scroll-snap). This adds
// prev / next arrows and mouse dragging.
const STEP = () => 1

function setup (track) {
    if (track.querySelectorAll('img').length < 2) return

    const wrap = document.createElement('div')
    wrap.className = 'carousel-wrap'
    track.parentNode.insertBefore(wrap, track)
    wrap.appendChild(track)

    const make = (cls, label, char) => {
        const b = document.createElement('button')
        b.type = 'button'
        b.className = `carousel-arrow ${cls}`
        b.setAttribute('aria-label', label)
        b.textContent = char
        wrap.appendChild(b)
        return b
    }
    const prev = make('prev', 'Previous image', '‹')
    const next = make('next', 'Next image', '›')

    const slide = () => track.clientWidth + parseFloat(getComputedStyle(track).columnGap || 0)
    const go = (dir) => track.scrollBy({ left: dir * slide() * STEP(), behavior: 'smooth' })
    const update = () => {
        prev.disabled = track.scrollLeft < 4
        next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4
    }

    prev.addEventListener('click', () => go(-1))
    next.addEventListener('click', () => go(1))
    track.addEventListener('scroll', () => window.requestAnimationFrame(update), { passive: true })
    window.addEventListener('resize', update)

    // mouse drag
    let startX = 0
    let startLeft = 0
    let dragging = false
    track.addEventListener('pointerdown', (e) => {
        if (e.pointerType !== 'mouse') return
        dragging = true
        startX = e.clientX
        startLeft = track.scrollLeft
        track.classList.add('is-dragging')
        track.setPointerCapture(e.pointerId)
    })
    track.addEventListener('pointermove', (e) => {
        if (dragging) track.scrollLeft = startLeft - (e.clientX - startX)
    })
    const end = () => {
        if (!dragging) return
        dragging = false
        track.classList.remove('is-dragging')
        const index = Math.round(track.scrollLeft / slide())
        track.scrollTo({ left: index * slide(), behavior: 'smooth' })
    }
    track.addEventListener('pointerup', end)
    track.addEventListener('pointercancel', end)
    update()
}

document.querySelectorAll('.sunnysideup__app__elements__workexample .work-example-images').forEach(setup)

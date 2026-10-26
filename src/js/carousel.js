// Work example screenshots: window frame, swipeable carousel with arrows,
// and a "Shown here" caption in the info panel that follows the current slide.
// Touch / trackpad swiping is native (CSS scroll-snap); arrows + mouse drag added here.

function setup (track) {
    const block = track.closest('.sunnysideup__app__elements__workexample')
    const panel = block && block.querySelector('.work-example-cards')
    const slides = Array.from(track.querySelectorAll('img'))
    if (!slides.length) return

    const wrap = document.createElement('div')
    wrap.className = 'carousel-wrap'
    track.parentNode.insertBefore(wrap, track)
    wrap.appendChild(track)

    const buttons = document.createElement('div')
    buttons.className = 'window-buttons'
    buttons.setAttribute('aria-hidden', 'true')
    buttons.innerHTML = '<span class="minimise"></span><span class="maximise"></span><span class="close"></span>'
    wrap.appendChild(buttons)

    // captions: the <p class="caption"> following each image (or its link)
    const captionFor = (img) => {
        // images.js wraps every img in .image-container, so climb to the direct child of the track
        let holder = img
        while (holder.parentElement && holder.parentElement !== track) holder = holder.parentElement
        const p = holder.nextElementSibling
        return p && p.classList.contains('caption') ? p.textContent.replace('👆', '').trim() : ''
    }
    const captions = slides.map(captionFor)
    let captionText = null
    if (panel && captions.some(Boolean)) {
        const card = document.createElement('div')
        card.className = 'card'
        card.innerHTML = '<h4>Shown here</h4><p></p>'
        panel.appendChild(card)
        captionText = card.querySelector('p')
    }

    const slideWidth = () => track.clientWidth + parseFloat(getComputedStyle(track).columnGap || 0)
    const current = () => Math.min(slides.length - 1, Math.max(0, Math.round(track.scrollLeft / slideWidth())))

    let prev, next
    const update = () => {
        if (prev) {
            prev.disabled = track.scrollLeft < 4
            next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4
        }
        if (captionText) captionText.textContent = captions[current()] || ''
    }

    if (slides.length > 1) {
        const make = (cls, label, char) => {
            const b = document.createElement('button')
            b.type = 'button'
            b.className = `carousel-arrow ${cls}`
            b.setAttribute('aria-label', label)
            b.textContent = char
            wrap.appendChild(b)
            return b
        }
        prev = make('prev', 'Previous image', '‹')
        next = make('next', 'Next image', '›')
        const go = (dir) => track.scrollBy({ left: dir * slideWidth(), behavior: 'smooth' })
        prev.addEventListener('click', () => go(-1))
        next.addEventListener('click', () => go(1))

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
            track.scrollTo({ left: current() * slideWidth(), behavior: 'smooth' })
        }
        track.addEventListener('pointerup', end)
        track.addEventListener('pointercancel', end)
    }

    track.addEventListener('scroll', () => window.requestAnimationFrame(update), { passive: true })
    window.addEventListener('resize', update)
    update()
}

document.querySelectorAll('.sunnysideup__app__elements__workexample .work-example-images').forEach(setup)

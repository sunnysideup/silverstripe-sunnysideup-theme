// Hero background (image or Vimeo video) behind the rocket-mode page.
import { body, hasRocketShow } from './dom.js'

const overlay = (name) =>
    `linear-gradient(var(${name}, transparent), var(${name}, transparent))`

const SHADOWS = {
    dark: 'linear-gradient(210deg, #00000077 12%, transparent 88%)',
    light: 'linear-gradient(210deg, #FFFFFF77 12%, transparent 88%)',
    fullblue: overlay('--overlay-color-blue'),
    fullyellow: overlay('--overlay-color-yellow'),
    fullgreen: overlay('--overlay-color-green'),
    fullpurple: overlay('--overlay-color-purple')
}

const markLoaded = () => body.classList.add('has-bg-image-loaded')

function videoBackground (videoId, shadow) {
    const src = `https://player.vimeo.com/video/${videoId}?autoplay=1&autopause=0&muted=1&background=1`
    const iframe = document.createElement('iframe')
    iframe.src = src
    iframe.allow = 'autoplay; fullscreen'
    iframe.allowFullscreen = true
    iframe.setAttribute('frameborder', '0')
    if (shadow) iframe.style.background = shadow
    markLoaded()
    return iframe
}

function init () {
    if (!hasRocketShow()) return
    const { videoId, bgImage, bgImageX = '50%', bgImageY = '50%', shadowOverLogo } = body.dataset
    if (!videoId && !bgImage) return

    const shadow = SHADOWS[shadowOverLogo] || ''
    const wrapper = document.createElement('div')
    wrapper.id = 'BackgroundImage'
    wrapper.classList.add('fade-on-no-rocket')

    if (videoId && window.matchMedia('(orientation: landscape)').matches) {
        wrapper.appendChild(videoBackground(videoId, shadow))
    } else if (bgImage) {
        wrapper.style.backgroundImage = shadow ? `${shadow}, url(${bgImage})` : `url(${bgImage})`
        wrapper.style.backgroundPosition = `${bgImageX} ${bgImageY}`
        const img = new Image()
        img.onload = img.onerror = markLoaded // fail open
        img.src = bgImage
    }
    body.prepend(wrapper)
}

init()

// tiny shared helpers - keep this file dependency free
export const body = document.body
export const root = document.documentElement

export const onReady = (fn) => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn, { once: true })
    } else {
        fn()
    }
}

// run non-essential work when the browser has nothing better to do
export const onIdle = (fn) => {
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(fn, { timeout: 2000 })
    } else {
        window.setTimeout(fn, 200)
    }
}

export const hasRocketShow = () => !body.classList.contains('no-rocket-show')

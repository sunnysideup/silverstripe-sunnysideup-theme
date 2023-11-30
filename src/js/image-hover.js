const imagehover = {
    resetTimeout: null,

    init: function () {
        document.querySelectorAll('.image-container').forEach(el => {
            el.addEventListener('mousemove', e => {
                if (this.isTouchDevice()) {
                    clearTimeout(this.resetTimeout)
                }

                const { width, height, left, top } =
                    e.target.getBoundingClientRect()
                const x = e.pageX - left - window.scrollX
                const y = e.pageY - top - window.scrollY

                e.target.style.setProperty('--mouse-x', (x / width) * 50 - 25)
                e.target.style.setProperty('--mouse-y', 25 - (y / height) * 50)

                if (this.isTouchDevice()) {
                    this.resetTimeout = setTimeout(() => {
                        e.target.style.removeProperty('--mouse-x')
                        e.target.style.removeProperty('--mouse-y')
                    }, 1000)
                }
            })
        })
    },
    isTouchDeviceVar: null,

    isTouchDevice: function () {
        if (this.isTouchDeviceVar === null) {
            this.isTouchDeviceVar =
                'ontouchstart' in document.documentElement ||
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                navigator.msMaxTouchPoints > 0
        }
        return this.isTouchDeviceVar
    }
}

document.addEventListener('DOMContentLoaded', function () {
    imagehover.init()
})

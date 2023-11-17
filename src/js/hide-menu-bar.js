const scrollManager = {
    minScrollForAction: 2,

    minScrollDown: 100,

    lastScroll: 0,

    didScroll: 0,

    bodyObject: null,

    timeOutFx: null,

    justScrolledFx: null,

    scrolledUpClass: 'scrolled-up',

    scrolledDownClass: 'scrolled-down',

    init: function () {
        scrollManager.bodyObject = document.querySelector('body')
        this.scrollListener()
        this.scrollUpOrDown()
        this.lastScroll = window.scrollY
        window.setTimeout(function () {
            window.scrollTo(
                window.pageXOffset,
                window.scrollY - this.minScrollForAction - 1
            )
        }, 50)
    },

    scrollListener: function () {
        let isTopTheme = null
        window.addEventListener('scroll', function () {
            window.clearTimeout(scrollManager.timeOutFx)
            window.clearTimeout(scrollManager.justScrolledFx)
            const theme = scrollManager.bodyObject.getAttribute('data-theme')
            if (window.scrollY < 20) {
                if (isTopTheme !== true) {
                    scrollManager.bodyObject.classList.remove('past-header')
                    scrollManager.bodyObject.style.transitionDuration = '0.7s'
                    scrollManager.bodyObject.classList.remove(theme)
                    scrollManager.bodyObject.classList.add('theme-rocket')
                    scrollManager.bodyObject.style.transitionSpeed = '0.3s'
                    isTopTheme = true
                }
            } else {
                if (isTopTheme !== false) {
                    scrollManager.bodyObject.classList.add('past-header')
                    const oldTransitionSpeed =
                        scrollManager.bodyObject.style.transitionDuration
                    scrollManager.bodyObject.style.transitionDuration = '1s'
                    scrollManager.bodyObject.classList.add(theme)
                    scrollManager.bodyObject.classList.remove('theme-rocket')
                    scrollManager.bodyObject.style.transitionSpeed =
                        oldTransitionSpeed
                    isTopTheme = false
                }
            }
            scrollManager.didScroll = true
            scrollManager.scrollUpOrDown()
        })
    },

    scrollUpOrDown: function () {
        scrollManager.timeOutFx = window.setTimeout(function () {
            // console.log('running')
            if (scrollManager.didScroll) {
                // reset so that we know each call is a real call.
                scrollManager.didScroll = false
                const newScroll = window.scrollY
                // console.log('last scroll: ' + scrollManager.lastScroll)
                // console.log('new scroll: ' + newScroll)
                if (
                    Math.abs(scrollManager.lastScroll - newScroll) <=
                    scrollManager.minScrollForAction
                ) {
                    // console.log('too little')
                    return
                }
                if (
                    newScroll >
                    scrollManager.lastScroll + scrollManager.minScrollDown
                ) {
                    // console.log('down')
                    // Scroll Down
                    scrollManager.bodyObject.classList.remove(
                        scrollManager.scrolledUpClass
                    )
                    scrollManager.bodyObject.classList.add(
                        scrollManager.scrolledDownClass
                    )
                } else if (newScroll < scrollManager.lastScroll) {
                    // console.log('up')
                    // Scroll Up
                    scrollManager.bodyObject.classList.add(
                        scrollManager.scrolledUpClass
                    )
                    scrollManager.bodyObject.classList.remove(
                        scrollManager.scrolledDownClass
                    )
                    scrollManager.bodyObject.classList.add('just-scrolled')
                    this.justScrolledFx = window.setTimeout(function () {
                        scrollManager.bodyObject.classList.remove(
                            'just-scrolled'
                        )
                    }, 3000)
                } else {
                    // console.log('do nothing')
                }
                scrollManager.lastScroll = newScroll
            }
        }, 200)
    }
}

scrollManager.init()

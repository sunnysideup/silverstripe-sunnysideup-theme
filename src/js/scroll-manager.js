const scrollManager = {
    microSecondsBeforeJustScrollledRemoved: 5000,

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
        this.lastScroll = this.currentScroll()
        window.setTimeout(function () {
            window.scrollTo(
                window.scrollX,
                this.currentScroll() - this.minScrollForAction - 1
            )
        }, 50)
        this.footerHeight = document.querySelector('footer')
        this.normalTransitionDuration =
            scrollManager.bodyObject.style.transitionDuration
    },

    footerHeight: 0,

    normalTransitionDuration: 0,

    themeTransitionDuration: '1.5s',

    newScroll: 0,

    getTheme: function () {
        return new String(scrollManager.bodyObject.getAttribute('data-theme'))
    },

    currentScroll: function () {
        return parseInt(window.scrollY || document.documentElement.scrollTop)
    },

    scrollListener: function () {
        let isRocketTheme = null
        window.addEventListener('scroll', function () {
            window.clearTimeout(scrollManager.timeOutFx)
            window.clearTimeout(scrollManager.justScrolledFx)
            const theme = getTheme()
            this.newScroll = this.currentScroll()
            const windowHeight = window.innerHeight
            const totalHeight = document.documentElement.scrollHeight

            // Check if current scroll position is at the bottom minus the footer's height
            const bottomTest =
                scrollPosition + windowHeight >= totalHeight - footerHeight
            const topTest = scrollPosition < 20
            if (topTest || bottomTest) {
                if (isRocketTheme !== true) {
                    scrollManager.bodyObject.style.transitionDuration =
                        this.themeTransitionDuration
                    scrollManager.bodyObject.classList.remove('past-header')
                    scrollManager.bodyObject.classList.remove(theme)
                    scrollManager.bodyObject.classList.add('theme-rocket')
                    scrollManager.bodyObject.style.transitionSpeed =
                        this.normalTransitionDuration
                    isRocketTheme = true
                }
            } else {
                if (isRocketTheme !== false) {
                    scrollManager.bodyObject.style.transitionDuration =
                        this.themeTransitionDuration
                    scrollManager.bodyObject.classList.add('past-header')
                    scrollManager.bodyObject.classList.add(theme)
                    scrollManager.bodyObject.classList.remove('theme-rocket')
                    scrollManager.bodyObject.style.transitionSpeed =
                        this.normalTransitionDuration
                    isRocketTheme = false
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
                scrollManager.newScroll = window.scrollY
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
                    }, scrollManager.microSecondsBeforeJustScrollledRemoved)
                } else {
                    // console.log('do nothing')
                }
                scrollManager.lastScroll = newScroll
            }
        }, 100)
    }
}

scrollManager.init()

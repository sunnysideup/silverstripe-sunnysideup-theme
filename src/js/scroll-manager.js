const scrollManager = {
    microSecondsBeforeJustScrollledRemoved: 5000,

    minScrollForAction: 2,

    minScrollDownToBeProperScroll: 100,

    normalTransitionDuration: 0,

    themeTransitionDuration: '1.5s',

    // calculated variables
    footerHeight: 0,

    newScroll: 0,

    minimumScrollForThemeSwitch: 20,

    lastScroll: 0,

    didScroll: 0,

    bodyObject: null,

    timeOutFx: null,

    justScrolledFx: null,

    scrolledUpClass: 'scrolled-up',

    scrolledDownClass: 'scrolled-down',

    init: function () {
        scrollManager.bodyObject = document.querySelector('body')
        scrollManager.scrollListener()
        scrollManager.scrollUpOrDown()
        scrollManager.lastScroll = scrollManager.currentScroll()
        window.setTimeout(function () {
            window.scrollTo(
                window.scrollX,
                scrollManager.currentScroll() -
                    scrollManager.minScrollForAction -
                    1
            )
        }, 50)
        scrollManager.footerHeight =
            document.querySelector('footer').offsetHeight / 2
        scrollManager.normalTransitionDuration =
            scrollManager.bodyObject.style.transitionDuration
    },

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
            const theme = scrollManager.getTheme()
            scrollManager.newScroll = scrollManager.currentScroll()
            const windowHeight = window.innerHeight
            const totalHeight = document.documentElement.scrollHeight

            // Check if current scroll position is at the bottom minus the footer's height
            const bottomTest =
                scrollManager.newScroll + windowHeight >=
                totalHeight - scrollManager.footerHeight
            console.log(
                bottomTest,
                scrollManager.newScroll,
                windowHeight,
                totalHeight,
                scrollManager.footerHeight
            )
            const topTest =
                scrollManager.newScroll <
                scrollManager.minimumScrollForThemeSwitch
            if (topTest || bottomTest) {
                if (isRocketTheme !== true) {
                    scrollManager.bodyObject.style.transitionDuration =
                        scrollManager.themeTransitionDuration
                    scrollManager.bodyObject.classList.remove('past-header')
                    scrollManager.bodyObject.classList.remove(theme)
                    scrollManager.bodyObject.classList.add('theme-rocket')
                    scrollManager.bodyObject.style.transitionSpeed =
                        scrollManager.normalTransitionDuration
                    isRocketTheme = true
                }
            } else {
                if (isRocketTheme !== false) {
                    scrollManager.bodyObject.style.transitionDuration =
                        scrollManager.themeTransitionDuration
                    scrollManager.bodyObject.classList.add('past-header')
                    scrollManager.bodyObject.classList.add(theme)
                    scrollManager.bodyObject.classList.remove('theme-rocket')
                    scrollManager.bodyObject.style.transitionSpeed =
                        scrollManager.normalTransitionDuration
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
                    Math.abs(
                        scrollManager.lastScroll - scrollManager.newScroll
                    ) <= scrollManager.minScrollForAction
                ) {
                    // console.log('too little')
                    return
                }
                if (
                    newScroll >
                    scrollManager.lastScroll +
                        scrollManager.minScrollDownToBeProperScroll
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
                    scrollManager.justScrolledFx = window.setTimeout(
                        function () {
                            scrollManager.bodyObject.classList.remove(
                                'just-scrolled'
                            )
                        },
                        scrollManager.microSecondsBeforeJustScrollledRemoved
                    )
                } else {
                    // console.log('do nothing')
                }
                scrollManager.lastScroll = newScroll
            }
        }, 100)
    }
}

scrollManager.init()

import { bodyClass } from './body-class'

const scrollManager = {
    microSecondsBeforeJustScrollledRemoved: 2000,

    minimumScrollForReleasingQuote: 400,

    minScrollForAction: 2,

    normalTransitionDuration: 0,

    themeTransitionDuration: '1.5s',

    // calculated variables

    newScroll: 0,

    lastScroll: 0,

    didScroll: 0,

    bodyObject: null,

    finishedScrollFx: null,

    justScrolledFx: null,

    scrolledUpClass: 'scrolled-up',

    scrolledDownClass: 'scrolled-down',

    quoteBlock: null,

    footerBlock: null,

    theme: '',

    init: function () {
        // get const vars
        scrollManager
            .getBodyObject()
            .classList.add('just-scrolled', 'scrolled-up')
        scrollManager.normalTransitionDuration =
            scrollManager.getBodyObject().style.transitionDuration

        scrollManager.quoteBlock = document.querySelector('.main-quote')
        scrollManager.footerBlock = document.getElementById('footer')

        // get less constant vars
        scrollManager.reinit()

        // set scroll functions
        scrollManager.scrollListener()

        // on resize, do it again.
        window.addEventListener('resize', scrollManager.reinit())
    },

    getBodyObject: function () {
        return bodyClass.getBodyObject()
    },

    getTheme: function () {
        return bodyClass.getTheme()
    },

    reinit: function () {
        scrollManager.lastScroll = scrollManager.currentScroll()

        scrollManager.contentTop = document
            .getElementById('content-below-quote')
            .getBoundingClientRect().top
        scrollManager.quoteTop =
            scrollManager.quoteBlock.getBoundingClientRect().top
    },

    currentScroll: function () {
        return parseInt(window.scrollY || document.documentElement.scrollTop)
    },

    scrollListener: function () {
        this.observeElementVisibility(
            'footer',
            scrollManager.setFooterVisible,
            { threshold: 0.01 }
        )

        let isRocketTheme = null
        window.addEventListener('scroll', function () {
            window.clearTimeout(scrollManager.finishedScrollFx)
            window.clearTimeout(scrollManager.justScrolledFx)

            scrollManager.newScroll = scrollManager.currentScroll()

            scrollManager.quoteParalaxAndPastHeader()

            const hasRocketThemeTest = scrollManager
                .getBodyObject()
                .classList.contains('no-rocket-show')
                ? false
                : true

            const bottomTest = scrollManager
                .getBodyObject()
                .classList.contains('footer-visible')
            const topTest = scrollManager
                .getBodyObject()
                .classList.contains('past-header')
                ? false
                : true
            scrollManager.quoteBlock.style.opacity = 1
            if (hasRocketThemeTest) {
                if (topTest || bottomTest) {
                    // we are in the top or bottom, only run if it is false!
                    if (isRocketTheme !== true) {
                        scrollManager.getBodyObject().style.transitionDuration =
                            scrollManager.themeTransitionDuration
                        scrollManager
                            .getBodyObject()
                            .classList.remove(scrollManager.getTheme())
                        scrollManager
                            .getBodyObject()
                            .classList.add('theme-rocket')
                        scrollManager.getBodyObject().style.transitionSpeed =
                            scrollManager.normalTransitionDuration
                    }
                    isRocketTheme = true
                } else {
                    // we are in the middle, must set to false now...
                    if (isRocketTheme !== false) {
                        scrollManager.getBodyObject().style.transitionDuration =
                            scrollManager.themeTransitionDuration
                        scrollManager
                            .getBodyObject()
                            .classList.add(scrollManager.getTheme())
                        scrollManager
                            .getBodyObject()
                            .classList.remove('theme-rocket')
                        scrollManager.getBodyObject().style.transitionSpeed =
                            scrollManager.normalTransitionDuration
                    }
                    isRocketTheme = false
                }
            } else {
                console.log('no rocket theme!')
            }

            scrollManager.didScroll = true
            scrollManager.setFinishedScrollFx()
        })
    },

    setFinishedScrollFx: function () {
        scrollManager.finishedScrollFx = window.setTimeout(function () {
            if (scrollManager.didScroll) {
                // reset so that we know each call is a real call.
                scrollManager.didScroll = false
                scrollManager.newScroll = scrollManager.currentScroll()

                const enoughScroll =
                    Math.abs(
                        scrollManager.lastScroll - scrollManager.newScroll
                    ) >= scrollManager.minScrollForAction
                if (enoughScroll) {
                    scrollManager.getBodyObject().classList.add('just-scrolled')
                    scrollManager.justScrolledFx = window.setTimeout(
                        function () {
                            scrollManager
                                .getBodyObject()
                                .classList.remove('just-scrolled')
                        },
                        scrollManager.microSecondsBeforeJustScrollledRemoved
                    )
                    const scrolledDown =
                        scrollManager.newScroll > scrollManager.lastScroll
                    if (scrolledDown) {
                        scrollManager
                            .getBodyObject()
                            .classList.remove(scrollManager.scrolledUpClass)
                        scrollManager
                            .getBodyObject()
                            .classList.add(scrollManager.scrolledDownClass)
                    } else {
                        scrollManager
                            .getBodyObject()
                            .classList.add(scrollManager.scrolledUpClass)
                        scrollManager
                            .getBodyObject()
                            .classList.remove(scrollManager.scrolledDownClass)
                    }
                }
                scrollManager.lastScroll = scrollManager.newScroll
            }
        }, 100)
    },

    quoteParalaxAndPastHeader: function () {
        if (
            scrollManager.quoteBlock &&
            window.innerHeight > scrollManager.minimumScrollForReleasingQuote
        ) {
            scrollManager.quoteHeight = scrollManager.quoteBlock.offsetHeight
            const reducer = scrollManager.quoteHeight + scrollManager.quoteTop
            let maxScroll = 0
            if (reducer > 0) {
                maxScroll = scrollManager.contentTop - reducer
            } else {
                maxScroll = scrollManager.contentTop / 2
            }
            if (maxScroll < 0) {
                this.reinit()
                const maxScroll =
                    scrollManager.contentTop -
                    (scrollManager.quoteHeight + scrollManager.quoteTop)
            }
            if (scrollManager.newScroll < maxScroll) {
                const additionalMargin = scrollManager.newScroll
                scrollManager.quoteBlock.style.marginTop = `${additionalMargin}px` // Use backticks here
                scrollManager.getBodyObject().classList.remove('past-header')
            } else {
                const additionalMargin = Math.max(maxScroll, 0)
                scrollManager.quoteBlock.style.marginTop = `${additionalMargin}px` // Use backticks here
                scrollManager.getBodyObject().classList.add('past-header')
            }
        } else {
            scrollManager.quoteBlock.style.marginTop = 0
            if (scrollManager.newScroll > 100) {
                scrollManager.getBodyObject().classList.add('past-header')
            } else {
                scrollManager.getBodyObject().classList.remove('past-header')
            }
        }
    },

    observeElementVisibility: function (elementId, callback, options) {
        const element = document.getElementById(elementId)
        if (!element) {
            console.log('Element not found')
            return
        }

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Call the callback function with true if the element is visible,
                // and false if it's not
                callback(entry.isIntersecting)
            })
        })

        observer.observe(element, options)
    },

    setFooterVisible: function (visible) {
        if (visible) {
            scrollManager.getBodyObject().classList.add('footer-visible')
        } else {
            scrollManager.getBodyObject().classList.remove('footer-visible')
        }
    }
}

scrollManager.init()

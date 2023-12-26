const scrollManager = {
    microSecondsBeforeJustScrollledRemoved: 2000,

    minScrollForAction: 2,

    minScrollDownToBeProperScroll: 100,

    normalTransitionDuration: 0,

    themeTransitionDuration: '1.5s',

    // calculated variables

    newScroll: 0,

    minimumScrollForThemeSwitch: 20,

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
        scrollManager.bodyObject = document.querySelector('body')
        scrollManager.bodyObject.classList.add('just-scrolled', 'scrolled-up')
        scrollManager.normalTransitionDuration =
            scrollManager.bodyObject.style.transitionDuration

        scrollManager.quoteBlock = document.querySelector('.main-quote')
        scrollManager.footerBlock = document.getElementById('footer')

        scrollManager.theme = new String(
            scrollManager.bodyObject.getAttribute('data-theme')
        )
        // get less constant vars
        scrollManager.reinit()

        // set scroll functions
        scrollManager.scrollListener()

        // on resize, do it again.
        window.addEventListener('resize', scrollManager.reinit())
    },

    reinit: function () {
        scrollManager.lastScroll = scrollManager.currentScroll()

        scrollManager.contentTop =
            document
                .getElementById('content-below-quote')
                .getBoundingClientRect().top -
            document.documentElement.getBoundingClientRect().top
        scrollManager.quoteTop =
            scrollManager.quoteBlock.getBoundingClientRect().top -
            document.documentElement.getBoundingClientRect().top
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

            const bottomTest =
                scrollManager.bodyObject.classList.contains('footer-visible')
            const topTest = scrollManager.bodyObject.classList.contains(
                'past-header'
            )
                ? false
                : true
            if (topTest || bottomTest) {
                // we are in the top or bottom, only run if it is false!
                if (
                    isRocketTheme === false ||
                    scrollManager.bodyObject.classList.contains(
                        'theme-rocket'
                    ) === false
                ) {
                    scrollManager.bodyObject.style.transitionDuration =
                        scrollManager.themeTransitionDuration
                    scrollManager.bodyObject.classList.remove(
                        scrollManager.theme
                    )
                    scrollManager.bodyObject.classList.add('theme-rocket')
                    scrollManager.bodyObject.style.transitionSpeed =
                        scrollManager.normalTransitionDuration
                    isRocketTheme = true
                }
                if (bottomTest) {
                    const quoteBounds =
                        scrollManager.quoteBlock.getBoundingClientRect()
                    const footerBounds =
                        scrollManager.footerBlock.getBoundingClientRect()

                    if (quoteBounds.bottom > footerBounds.top) {
                        scrollManager.quoteBlock.style.opacity = 0
                    } else {
                        scrollManager.quoteBlock.style.opacity = 1
                    }
                } else {
                    scrollManager.quoteBlock.style.opacity = 1
                }
            } else {
                scrollManager.quoteBlock.style.opacity = 1
                // we are in the middle, must set to false now...
                if (isRocketTheme !== false) {
                    scrollManager.bodyObject.style.transitionDuration =
                        scrollManager.themeTransitionDuration
                    scrollManager.bodyObject.classList.add(scrollManager.theme)
                    scrollManager.bodyObject.classList.remove('theme-rocket')
                    scrollManager.bodyObject.style.transitionSpeed =
                        scrollManager.normalTransitionDuration
                }
                isRocketTheme = false
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
                    scrollManager.bodyObject.classList.add('just-scrolled')
                    scrollManager.justScrolledFx = window.setTimeout(
                        function () {
                            scrollManager.bodyObject.classList.remove(
                                'just-scrolled'
                            )
                        },
                        scrollManager.microSecondsBeforeJustScrollledRemoved
                    )
                    const scrolledDown =
                        scrollManager.newScroll > scrollManager.lastScroll
                    if (scrolledDown) {
                        scrollManager.bodyObject.classList.remove(
                            scrollManager.scrolledUpClass
                        )
                        scrollManager.bodyObject.classList.add(
                            scrollManager.scrolledDownClass
                        )
                    } else {
                        scrollManager.bodyObject.classList.add(
                            scrollManager.scrolledUpClass
                        )
                        scrollManager.bodyObject.classList.remove(
                            scrollManager.scrolledDownClass
                        )
                    }
                }
                scrollManager.lastScroll = scrollManager.newScroll
            }
        }, 100)
    },

    quoteParalaxAndPastHeader: function () {
        scrollManager.quoteHeight = scrollManager.quoteBlock.offsetHeight
        const maxScroll =
            scrollManager.contentTop -
            (scrollManager.quoteHeight + scrollManager.quoteTop) -
            50

        if (scrollManager.quoteBlock && window.innerHeight > 400) {
            if (scrollManager.newScroll < maxScroll) {
                const additionalMargin = scrollManager.newScroll
                scrollManager.quoteBlock.style.marginTop = `${additionalMargin}px` // Use backticks here
                scrollManager.bodyObject.classList.remove('past-header')
            } else {
                scrollManager.quoteBlock.style.marginTop = `${maxScroll}px` // Use backticks here
                scrollManager.bodyObject.classList.add('past-header')
            }
        } else {
            scrollManager.quoteBlock.style.marginTop = '0px'
            if (scrollManager.newScroll > 0) {
                scrollManager.bodyObject.classList.add('past-header')
            } else {
                scrollManager.bodyObject.classList.remove('past-header')
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
            scrollManager.bodyObject.classList.add('footer-visible')
        } else {
            scrollManager.bodyObject.classList.remove('footer-visible')
        }
    }
}

scrollManager.init()

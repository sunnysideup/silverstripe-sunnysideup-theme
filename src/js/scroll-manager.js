import { bodyClass } from './body-class'

const scrollManager = {
    screenHeight: window.innerHeight,
    lastScroll: 0,
    body: null,
    quote: null,
    footer: null,
    headerRange: 70, // in vh
    footerRange: 160, // in vh
    headerPct: 0,
    footerPct: 100,
    justScrolledDuration: 1200, // ms — change freely
    justScrolledTimer: null,
    scrollStopTimer: null,
    scrollStopDelay: 120, // ms after last scroll event

    init () {
        this.body = bodyClass.getBodyObject()
        this.quote = document.querySelector('.main-quote')
        this.footer = document.getElementById('footer')

        this.remeasure()
        this.bindScroll()

        window.addEventListener('resize', () => this.remeasure())

        // NEW: Trigger the initial scroll calculation
        requestAnimationFrame(() => this.onScroll())
    },

    remeasure () {
        this.screenHeight = window.innerHeight
        this.lastScroll = this.getScroll()
    },

    getScroll () {
        return window.scrollY || document.documentElement.scrollTop
    },

    bindScroll () {
        let ticking = false

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.onScroll()
                    ticking = false
                })
                ticking = true
            }
        })
    },

    onScroll () {
        const scroll = this.getScroll()
        const maxScroll =
            document.documentElement.scrollHeight - this.screenHeight

        this.updateHeaderClasses(scroll)
        this.updateFooterClasses(scroll, maxScroll)
        this.updateRocketTheme()
        this.updateScrollDirection(scroll)
        this.handleJustScrolled()

        this.lastScroll = scroll
    },

    // ---------------------------------------------------------------------
    // HEADER / FOOTER STATE (0–100)
    // ---------------------------------------------------------------------
    updateHeaderClasses (currentScroll) {
        const headerPixels = this.screenHeight * (this.headerRange / 100)
        const ratio = this.clamp(currentScroll / headerPixels, 0, 1)
        const pct = Math.round(ratio * 100)

        this.headerPct = pct
        this.replaceStepClasses('header', pct)

        if (pct >= 100) {
            this.body.classList.add('past-header')
        } else {
            this.body.classList.remove('past-header')
        }
    },
    updateFooterClasses (currentScroll, maxScroll) {
        const bottomDistance = maxScroll - currentScroll

        const headerPixels = this.screenHeight * (this.headerRange / 100)

        // If we're still in the header zone, hide footer classes
        if (currentScroll < headerPixels) {
            this.footerPct = 100
            this.removeStepClasses('footer')
            this.body.classList.remove('footer-visible')
            return
        }

        const footerPixels = this.screenHeight * (this.footerRange / 100)
        const ratio = this.clamp(bottomDistance / footerPixels, 0, 1)
        const pct = Math.round(ratio * 100)

        this.footerPct = pct
        this.replaceStepClasses('footer', pct)

        if (pct < 100) {
            this.body.classList.add('footer-visible')
        } else {
            this.body.classList.remove('footer-visible')
        }
    },

    replaceStepClasses (prefix, pct) {
        for (let i = 0; i <= 100; i += 10) {
            this.body.classList.remove(`${prefix}-${i}`)
        }
        const rounded = Math.round(pct / 10) * 10
        this.body.classList.add(`${prefix}-${rounded}`)
    },
    removeStepClasses (prefix) {
        for (let i = 0; i <= 100; i += 10) {
            this.body.classList.remove(`${prefix}-${i}`)
        }
    },
    // ---------------------------------------------------------------------
    // ROCKET THEME
    // ---------------------------------------------------------------------
    updateRocketTheme () {
        const hasRocket = !this.body.classList.contains('no-rocket-show')
        if (!hasRocket) return

        const inHeaderZone = this.headerPct < 100
        const inFooterZone = this.footerPct < 100

        if (inHeaderZone || inFooterZone) {
            this.body.classList.add('theme-rocket')
            this.body.classList.remove(bodyClass.getTheme())
        } else {
            this.body.classList.remove('theme-rocket')
            this.body.classList.add(bodyClass.getTheme())
        }
    },

    // ---------------------------------------------------------------------
    // SCROLL DIRECTION
    // ---------------------------------------------------------------------
    updateScrollDirection (scroll) {
        if (scroll > this.lastScroll) {
            this.body.classList.remove('scrolled-up')
            this.body.classList.add('scrolled-down')
        } else {
            this.body.classList.add('scrolled-up')
            this.body.classList.remove('scrolled-down')
        }
    },

    // ---------------------------------------------------------------------
    // JUST SCROLLED
    // ---------------------------------------------------------------------
    handleJustScrolled () {
        // Clear previous stop detection
        if (this.scrollStopTimer) {
            clearTimeout(this.scrollStopTimer)
        }

        this.scrollStopTimer = setTimeout(() => {
            // Scroll has ended → add just-scrolled
            this.body.classList.add('just-scrolled')

            // Clear previous visibility timer
            if (this.justScrolledTimer) {
                clearTimeout(this.justScrolledTimer)
            }

            this.justScrolledTimer = setTimeout(() => {
                this.body.classList.remove('just-scrolled')
            }, this.justScrolledDuration)
        }, this.scrollStopDelay)
    },
    // ---------------------------------------------------------------------
    // UTIL
    // ---------------------------------------------------------------------
    clamp (v, min, max) {
        return Math.max(min, Math.min(max, v))
    }
}

scrollManager.init()

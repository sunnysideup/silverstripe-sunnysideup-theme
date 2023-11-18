import { myCookie } from './cookie.js'

const bodyClass = {
    bodyObject: null,

    init: function () {
        bodyClass.bodyObject = document.querySelector('body')
        bodyClass.addOrToggleBodyClass('#menu-toggle', false)
        // console.log(bodyClass.isHomePage())
        // console.log(bodyClass.hasFragment())
        // if (
        //     bodyClass.isHomePage() === true &&
        //     bodyClass.hasFragment() === false
        // ) {
        //     // console.log('opening menu')
        //     document.querySelector('#menu-toggle').click()
        // }
        // if you click on theme-selector, you select the theme
        bodyClass.addOrToggleBodyClass('.theme-selector', true)
        // if you click on set-them, you select the theme
        bodyClass.addOrToggleBodyClass('.set-theme', true)
        bodyClass.retrieveCookieOrHash()
        // expose scrolled behaviour
        window.setTimeout(function () {
            window.scrollTo(window.scrollX, window.scrollY + 2)
            window.scrollTo(window.scrollX, window.scrollY - 2)
            const hash = bodyClass.getHashFromURL()
            if (hash && document.getElementById(hash)) {
                document.querySelector('#' + hash).scrollIntoView({
                    behavior: 'smooth', // smooth scroll
                    block: 'start' // the upper border of the element will be aligned at the top of the visible part of the window of the scrollable area.
                })
            }
        }, 300)
        this.addBasicBodyClassListeners()
    },

    addBasicBodyClassListeners: function () {
        document.addEventListener('DOMContentLoaded', function (event) {
            bodyClass.bodyObject.classList.add('body-loaded')
            bodyClass.bodyObject.classList.remove('body-unloaded')
            if ('ontouchstart' in document.documentElement) {
                bodyClass.bodyObject.classList.add('touch')
            } else {
                bodyClass.bodyObject.classList.add('no-touch')
            }
            bodyClass.addRocketMode()
        })
        window.addEventListener('beforeunload', function () {
            // bodyClass.bodyObject.classList.add('body-unloaded')
        })
    },

    retrieveCookieOrHash: function () {
        let hash = bodyClass.getHashFromURL()
        let preferredTheme = ''
        if (hash === 'reset') {
            myCookie.eraseCookie('preferredTheme')
            // console.log(reset);
        } else if (hash) {
            this.runClickForElement(hash)
        } else {
            preferredTheme = myCookie.getCookie('preferredTheme')
            if (preferredTheme) {
                bodyClass.bodyObject.setAttribute('data-theme', preferredTheme)
            } else if (bodyClass.userPrefersDarkTheme()) {
                bodyClass.bodyObject.setAttribute('data-theme', 'theme-moon')
            }
        }
    },

    userPrefersDarkTheme: function () {
        return (
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        )
    },

    runClickForElement: function (hash) {
        hash = hash.trim()
        if (hash.length) {
            const obj = document.getElementById(hash)
            if (obj && obj.classList.contains('theme-selector')) {
                this.removeBodyClassesBasedOnAttribute(obj)
                bodyClass.bodyObject.classList.add(hash)
                return true
            }
        }
        return false
    },

    addOrToggleBodyClass: function (objSelector, isTheme) {
        document
            .querySelectorAll(objSelector)
            .forEach(function (oneEachObject) {
                oneEachObject.addEventListener('click', function (event) {
                    bodyClass.actionBodyClassChange(
                        oneEachObject,
                        event,
                        isTheme
                    )
                    return false
                })
            })
    },

    actionBodyClassChange: function (oneEachObject, event, isTheme, scrollTo) {
        event.preventDefault()

        bodyClass.removeBodyClassesBasedOnAttribute(oneEachObject)

        let toggleClass = ''
        let id = ''
        if (oneEachObject.hasAttribute('data-add-class')) {
            toggleClass = oneEachObject.getAttribute('data-add-class')
        } else {
            toggleClass = oneEachObject.getAttribute('id')
            id = toggleClass
        }
        if (oneEachObject.hasAttribute('data-toggle-rather-than-add')) {
            bodyClass.bodyObject.classList.toggle(toggleClass)
        } else {
            bodyClass.bodyObject.classList.add(toggleClass)
        }

        if (isTheme) {
            myCookie.setCookie('preferredTheme', toggleClass, 14)
            bodyClass.bodyObject.setAttribute('data-theme', toggleClass)
        }
        if (id && scrollTo) {
            let hash = bodyClass.getHashFromString(id)
            if (hash.length) {
                hash = hash.replace('#', '')
                window.location.hash = '#' + hash
            }
        }
    },

    removeBodyClassesBasedOnAttribute: function ($object) {
        if ($object.hasAttribute('data-remove-class')) {
            const string = $object.getAttribute('data-remove-class')
            const classes = bodyClass.getClassesFromList(string)
            for (let i = 0, len = classes.length; i < len; i++) {
                const value = classes[i]
                bodyClass.bodyObject.classList.remove(value)
            }
        }
    },

    getClassesFromList: function (string) {
        const array = string.split(',')
        const newArray = []
        for (let i = 0, len = array.length; i < len; i++) {
            const value = array[i].trim()
            if (value) {
                newArray.push(value)
            }
        }
        return newArray
    },

    getHashFromURL: function () {
        const string = window.location.hash
        return bodyClass.getHashFromString(string)
    },

    getHashFromString: function (string) {
        string = String(string)
        return bodyClass.retrieveHasSignFromString(string)
    },

    retrieveHasSignFromString: function (string) {
        return string.replace('#', '')
    },

    addRocketMode: function () {
        const div = document.createElement('div')
        const shadow = bodyClass.bodyObject.getAttribute(
            'data-shadow-over-logo'
        )
        let shadowColour = ''
        if (shadow === 'dark') {
            shadowColour =
                'linear-gradient(258deg, #00000030 30%, transparent 60%), '
        } else if (shadow === 'light') {
            shadowColour =
                'linear-gradient(258deg, #FFFFFF30 30%, transparent 60%), '
        }
        div.style.backgroundImage =
            shadowColour +
            'url(' +
            bodyClass.bodyObject.getAttribute('data-bg-image') +
            ')'
        div.id = 'BackgroundImage'
        const temp = bodyClass.bodyObject.firstChild
        bodyClass.bodyObject.insertBefore(div, temp)
    },

    isHomePage: function () {
        return window.location.pathname === '/'
    },
    hasFragment: function () {
        return window.location.hash !== ''
    }
}

bodyClass.init()

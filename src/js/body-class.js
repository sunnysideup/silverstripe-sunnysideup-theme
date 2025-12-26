import { myCookie } from './cookie.js'

export const bodyClass = {
    bodyObject: null,

    theme: '',

    init: function () {
        bodyClass.bodyObject = document.querySelector('body')
        bodyClass.addOrToggleBodyClass('#menu-toggle', false)

        // if you click on theme-selector, you select the theme
        bodyClass.addOrToggleBodyClass('.theme-selector', true)
        this.theme =
            // if you click on set-them, you select the theme
            bodyClass.retrieveCookieOrHash()
        // expose scrolled behaviour
        this.scrollStart()
        this.addBasicBodyClassListeners()
    },

    getBodyObject: function () {
        return bodyClass.bodyObject
    },

    getTheme: function () {
        return new String(bodyClass.bodyObject.getAttribute('data-theme'))
    },

    showMenuAsDefault: function () {
        if (
            bodyClass.isHomePage() === true &&
            bodyClass.hasFragment() === false
        ) {
            document.querySelector('#menu-toggle').click()
        }
    },

    addBasicBodyClassListeners: function () {
        bodyClass.addRocketModeVideoOrImage()
        document.addEventListener('DOMContentLoaded', function (event) {
            bodyClass.bodyObject.classList.add('body-loaded')
            if ('ontouchstart' in document.documentElement) {
                bodyClass.bodyObject.classList.add('touch')
            } else {
                bodyClass.bodyObject.classList.add('no-touch')
            }
        })
        bodyClass.bodyObject.classList.remove('body-unloaded')
        // window.addEventListener('beforeunload', function () {
        //     bodyClass.bodyObject.classList.add('body-unloaded')
        // })
        window.addEventListener('popstate', function () {
            bodyClass.bodyObject.classList.remove('popstate')
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
        }
        if (hash !== 'theme-moon' && hash !== 'theme-sun') {
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
                    if (objSelector === '#menu-toggle') {
                        // close menu when toggling
                        window.setTimeout(function () {
                            bodyClass.bodyObject.classList.toggle('show-logo')
                        }, 300)
                    }
                    return false
                })
            })
    },

    scrollStart: function () {
        window.setTimeout(function () {
            const hash = bodyClass.getHashFromURL()
            if (hash && document.getElementById(hash)) {
                document.querySelector('#' + hash).scrollIntoView({
                    behavior: 'smooth', // smooth scroll
                    block: 'start' // the upper border of the element will be aligned at the top of the visible part of the window of the scrollable area.
                })
            }
        }, 300)
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
            bodyClass.theme = toggleClass
        }
        if (id && scrollTo) {
            let hash = bodyClass.getHashFromString(id)
            if (hash.length) {
                hash = hash.replace('#', '')
                window.location.hash = '#' + hash
            }
        }
    },

    removeBodyClassesBasedOnAttribute: function (object) {
        if (object.hasAttribute('data-remove-class')) {
            const string = object.getAttribute('data-remove-class')
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
        return bodyClass.removeHashFromString(string)
    },

    removeHashFromString: function (string) {
        return string.replace('#', '')
    },

    addRocketModeVideoOrImage: function () {
        if (bodyClass.hasRocketShow() === true) {
            const videoId = bodyClass.bodyObject.getAttribute('data-video-id')
            const imageURL = bodyClass.bodyObject.getAttribute('data-bg-image')
            const imageX =
                bodyClass.bodyObject.getAttribute('data-bg-image-x') ?? '50%'
            const imageY =
                bodyClass.bodyObject.getAttribute('data-bg-image-y') ?? '50%'
            // console.log(videoId)
            if (videoId || imageURL) {
                let style = ''
                const div = document.createElement('div')
                div.id = 'BackgroundImage'
                const shadow = bodyClass.bodyObject.getAttribute(
                    'data-shadow-over-logo'
                )
                let shadowColour = ''
                if (shadow === 'dark') {
                    shadowColour =
                        'linear-gradient(210deg, #00000077 12%, transparent 88%)'
                } else if (shadow === 'light') {
                    shadowColour =
                        'linear-gradient(210deg, #FFFFFF77 12%, transparent 88%)'
                }
                if (videoId) {
                    const videoUrl =
                        'https://player.vimeo.com/video/' +
                        videoId +
                        '?autoplay=1&autopause=0&muted=1&background=1'
                    if (shadowColour) {
                        style = 'background: ' + shadowColour
                    }
                    div.innerHTML =
                        '<iframe src="' +
                        videoUrl +
                        '" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="' +
                        style +
                        '"></iframe>'
                    const temp = bodyClass.bodyObject.firstChild
                    bodyClass.bodyObject.insertBefore(div, temp)
                    const video = document.createElement('video')
                    document.body.classList.add('has-bg-image-loaded')
                } else {
                    style = 'url(' + imageURL + ')'
                    if (shadowColour) {
                        style = shadowColour + ',' + style
                    }
                    div.style.backgroundImage = style
                    div.style.backgroundPosition = imageX + ' ' + imageY

                    const img = new Image()
                    img.onload = function () {
                        document.body.classList.add('has-bg-image-loaded')
                    }
                    img.onerror = function () {
                        document.body.classList.add('has-bg-image-loaded') // fail open
                    }
                    img.src = imageURL
                }
                div.classList.add('fade-on-no-rocket')
                const temp = bodyClass.bodyObject.firstChild
                bodyClass.bodyObject.insertBefore(div, temp)
            }
        } else {
            // console.log('no rocket show')
        }
    },

    isHomePage: function () {
        return window.location.pathname === '/'
    },

    hasFragment: function () {
        return window.location.hash !== ''
    },

    hasRocketShow: function () {
        return bodyClass.bodyObject.classList.contains('no-rocket-show')
            ? false
            : true
    }
}

bodyClass.init()

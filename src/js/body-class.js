import { myCookie } from './cookie.js'

const bodyClass = {

  bodyObject: null,

  init: function () {
    bodyClass.bodyObject = document.querySelector('body')
    bodyClass.addOrToggleBodyClass('#menu-toggle', false)
    bodyClass.addOrToggleBodyClass('.theme-selector', true)
    bodyClass.addOrToggleBodyClass('.set-theme', true)
    bodyClass.retrieveCookieOrHash()
    // expose scrolled behaviour
    window.setTimeout(
      function () {
        window.scrollTo(window.pageXOffset, window.pageYOffset + 2)
        window.scrollTo(window.pageXOffset, window.pageYOffset - 2)
      },
      300
    )
    this.addBasicBodyClassListeners()
  },

  addBasicBodyClassListeners: function () {
    document.addEventListener(
      'DOMContentLoaded',
      function (event) {
        bodyClass.bodyObject.classList.add('body-loaded')
        if ('ontouchstart' in document.documentElement) {
          bodyClass.bodyObject.classList.add('touch')
        } else {
          bodyClass.bodyObject.classList.add('no-touch')
        }
        bodyClass.addRocketMode()
      }
    )
    window.addEventListener(
      'beforeunload',
      function () {
        bodyClass.bodyObject.classList.add('body-unloaded')
      }
    )
  },

  retrieveCookieOrHash: function () {
    let hash = bodyClass.getHashFromURL()
    let classes = ''
    if (hash === 'reset') {
      myCookie.eraseCookie('bodyClassClasses')
      hash = ''
      // console.log(reset);
    } else if (hash) {
      this.runClickForElement(hash)
    } else {
      classes = myCookie.getCookie('bodyClassClasses')
      classes = String(classes)
      if (classes.length > 0) {
        const classArray = classes.split(' ')
        for (let i = 0; i < classArray.length; i++) {
          this.runClickForElement(classArray[i])
        }
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.runClickForElement('theme-moon')
      }
    }
  },

  runClickForElement: function (hash) {
    if (hash === 'body-loaded') {
      return
    }
    if (hash === 'touch') {
      return
    }
    hash = hash.trim()
    if (hash.length) {
      const obj = document.getElementById(hash)
      if (obj) {
        this.removeBodyClassesBasedOnAttribute(obj)
        bodyClass.bodyObject.classList.add(hash)
      }
    }
  },

  addOrToggleBodyClass: function (objSelector, keep) {
    document.querySelectorAll(objSelector).forEach(
      function ($eachObject) {
        $eachObject.addEventListener(
          'click',
          function (event) {
            bodyClass.actionBodyClassChange($eachObject, event, keep)
            return false
          }
        )
      }
    )
  },

  actionBodyClassChange: function ($eachObject, event, keep) {
    event.preventDefault()

    bodyClass.removeBodyClassesBasedOnAttribute($eachObject)

    let toggleClass = ''
    let id = ''
    if ($eachObject.hasAttribute('data-add-class')) {
      toggleClass = $eachObject.getAttribute('data-add-class')
    } else {
      toggleClass = $eachObject.getAttribute('id')
      id = toggleClass
    }
    if ($eachObject.hasAttribute('data-toggle')) {
      bodyClass.bodyObject.classList.toggle(toggleClass)
    } else {
      bodyClass.bodyObject.classList.add(toggleClass)
    }
    if (toggleClass === 'theme-rocket') {
      // window.alert('Welcome to our experimental fly-around-the-world rocket(🚀) theme. ')
    }

    if (keep) {
      myCookie.setCookie(
        'bodyClassClasses',
        bodyClass.bodyObject.className,
        14
      )

      if (id) {
        let hash = bodyClass.getHashFromString(id)
        if (hash.length) {
          hash = hash.replace('#', '')
          window.location.hash = '#' + hash
        }
      }
    }
  },

  removeBodyClassesBasedOnAttribute: function ($object) {
    if ($object.hasAttribute('data-remove-class')) {
      const string = $object.getAttribute('data-remove-class')
      const classes = bodyClass.getClassesFromList(string)
      for (let i = 0, len = classes.length; i < len; i++) {
        const value = classes[i]
        // console.log('remove '+value);
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
    div.style.backgroundImage = 'url(' + bodyClass.bodyObject.getAttribute('data-bg-image') + ')'
    div.id = 'BackgroundImage'
    const temp = bodyClass.bodyObject.firstChild
    bodyClass.bodyObject.insertBefore(div, temp)
  }

}

bodyClass.init()

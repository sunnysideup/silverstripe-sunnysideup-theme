const scrollManager = {

  minScrollForAction: 2,

  minScrollDown: 100,

  lastScroll: 0,

  didScrill: 0,

  bodyObject: null,

  timeOutFx: null,

  justScrolledFxtFx: null,

  scrolledUpClass: 'scrolled-up',

  scrolledDownClass: 'scrolled-down',

  init: function () {
    scrollManager.bodyObject = document.querySelector('body')
    this.scrollListener()
    this.scrollUpOrDown()
    this.lastScroll = window.scrollY
  },

  scrollListener: function () {
    window.addEventListener(
      'scroll',
      function () {
        window.clearTimeout(scrollManager.timeOutFx)
        window.clearTimeout(this.justScrolledFx)
        if (window.scrollY === 0) {
          scrollManager.bodyObject.classList.remove('past-header')
        } else {
          scrollManager.bodyObject.classList.add('past-header')
        }
        scrollManager.didScroll = true
        scrollManager.scrollUpOrDown()
      }
    )
  },

  scrollUpOrDown: function () {
    this.timeOutFx = window.setTimeout(
      function () {
        // console.log('running')
        if (scrollManager.didScroll) {
          scrollManager.didScroll = false
          const newScroll = window.scrollY
          // console.log('last scroll: ' + scrollManager.lastScroll)
          // console.log('new scroll: ' + newScroll)
          if (Math.abs(scrollManager.lastScroll - newScroll) <= scrollManager.minScrollForAction) {
            // console.log('too little')
            return
          }
          if (newScroll > (scrollManager.lastScroll + scrollManager.minScrollDown)) {
            // console.log('down')
            // Scroll Down
            scrollManager.bodyObject.classList.remove(scrollManager.scrolledUpClass)
            scrollManager.bodyObject.classList.add(scrollManager.scrolledDownClass)
          } else if (newScroll < scrollManager.lastScroll) {
            // console.log('up')
            // Scroll Up
            scrollManager.bodyObject.classList.add(scrollManager.scrolledUpClass)
            scrollManager.bodyObject.classList.remove(scrollManager.scrolledDownClass)
            scrollManager.bodyObject.classList.add('just-scrolled')
            this.justScrolledFx = window.setTimeout(
              function () {
                scrollManager.bodyObject.classList.remove('just-scrolled')
              },
              3000
            )
          } else {
            // console.log('do nothing')
          }
          scrollManager.lastScroll = newScroll
        }
      },
      200
    )
  }

}

scrollManager.init()

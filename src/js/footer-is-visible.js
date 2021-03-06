
const footerIsVisible = {

  init: function () {
    // this is the target which is observed
    const target = document.querySelector('#footer')

    // configure the intersection observer instance
    var intersectionObserverOptions = {
      root: null,
      rootMargin: '150px',
      threshold: 1.0
    }

    var observer = new window.IntersectionObserver(onIntersection, intersectionObserverOptions)

    // provide the observer with a target
    observer.observe(target)

    function onIntersection (entries) {
      entries.forEach(
        entry => {
          // console.clear()
          // console.log(entry.intersectionRatio)
          document.querySelector('body').classList.toggle(
            'footer-visible',
            entry.intersectionRatio >= 1
          )
          // Are we in viewport?
          // if (entry.intersectionRatio > 1) {
          // Stop watching
          // observer.unobserve(entry.target);
          // }
        }
      )
    }
  }
}

footerIsVisible.init()

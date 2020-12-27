
const toc = () => {
  // create the container div
  const body = document.querySelector('body')
  // get all divs
  const headings = document.querySelectorAll('.typography h1, .typography h2')
  // get the body element
  // apply class to container div
  if (headings.length > 2) {
    body.classList.add('has-toc')
    body.classList.add('toc-off')
    for (let i = 0; i < headings.length; i++) {
      const el = headings[i]
      el.id = 'toc-' + i
      el.addEventListener(
        'click',
        function (e) {
          body.classList.toggle('toc-on')
          const hash = this.id
          if (hash) {
            // window.location.hash = hash
            document.querySelector('#' + hash).scrollIntoView()
            const scrolledY = window.scrollY
            if (scrolledY) {
              window.scroll(0, scrolledY - 75)
            }
          }
          return false
        },
        false
      )
    }
  } else {
    // body.classList.add('no-toc')
  }
}

toc()

// <svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'><path d='M0 0h24v24H0z' fill='none'/><path d='M7.41 18.59L8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z' fill='white'/></svg>

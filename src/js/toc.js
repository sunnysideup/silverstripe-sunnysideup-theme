
const toc = () => {
  // create the container div
  const body = document.querySelector('body')
  // get all divs
  const headings = document.querySelectorAll('.typography h1, .typography h2')
  // get the body element
  // apply class to container div
  if (headings.length > 4) {
    body.classList.add('has-toc')
    body.classList.add('toc-off')
    for (let i = 0; i < headings.length; i++) {
      const el = headings[i]
      el.id = 'toc-' + i
      el.addEventListener(
        'click',
        function (e) {
          body.classList.toggle('toc-on')
          if (body.classList.contains('toc-on') === false) {
            window.location.hash = this.id
          }
        },
        false
      )
    }
  } else {
    // body.classList.add('no-toc')
  }
}

toc()

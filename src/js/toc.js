const body = document.querySelector('body')

const toc = () => {
  // create the container div
  // get all divs
  const headings = document.querySelectorAll('#content-below-quote h1, #content-below-quote h2')
  // get the body element
  // apply class to container div
  if (headings.length > 3) {
    body.classList.add('has-toc')
    body.classList.add('toc-off')
    let count = 0
    for (let i = 0; i < headings.length; i++) {
      count = (i + 1)
      const el = headings[i]
      el.id = 'toc-' + count
      el.classList.add('icon-' + count)
      const span = document.createElement('span')
      const spanEnd = document.createElement('span')
      // span.addEventListener('click', handleClick.bind(null, el))
      span.innerHTML = '<i class="open">+</i><i class="closed">–</i>'
      spanEnd.innerHTML = '<i class="active">▂</i>'
      el.insertBefore(span, el.firstChild)
      el.appendChild(spanEnd)
      el.addEventListener(
        'click',
        function (e) {
          body.classList.toggle('toc-on')
          body.classList.toggle('toc-off')
          const hash = this.id
          const headings = document.querySelectorAll('#content-below-quote .toc-active')
          for (let i = 0; i < headings.length; i++) {
            const el = headings[i]
            el.classList.remove('toc-active')
          }
          el.classList.add('toc-active')
          window.location.hash = hash
          window.setTimeout(
            function () {
              document.querySelector('#' + hash).scrollIntoView({
                behavior: 'smooth', // smooth scroll
                block: 'start' // the upper border of the element will be aligned at the top of the visible part of the window of the scrollable area.
              })
            },
            100
          )
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

if (window.location.hash === '#toc' && body.classList.contains('toc-off') && body.classList.contains('has-toc')) {
  body.classList.toggle('toc-on')
  body.classList.toggle('toc-off')
}

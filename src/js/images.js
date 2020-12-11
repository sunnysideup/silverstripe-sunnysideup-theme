
const imageWrapper = () => {
  function wrap (el, wrapper) {
    el.parentNode.insertBefore(wrapper, el)
    wrapper.appendChild(el)
  }
  // create the container div

  // get all divs
  const images = document.querySelectorAll('.typography img')
  console.log(images)
  // get the body element
  // apply class to container div

  // find out all those divs having class C
  for (let i = 0; i < images.length; i++) {
    const dv = document.createElement('div')
    dv.setAttribute('class', 'image-container')
    const img = images[i]
    wrap(img, dv)
  }
}

imageWrapper()

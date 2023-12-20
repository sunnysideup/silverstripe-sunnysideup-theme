window.addEventListener('beforeprint', event => {
    const el = document.querySelector('#content-below-quote')
    el.scrollIntoView({ behavior: 'smooth' })
})

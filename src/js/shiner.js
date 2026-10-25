// The "shine" link in the hero quote scrolls to the content below it.
// The offset comes from CSS: #content-below-quote { scroll-margin-top }.
document.addEventListener('click', (event) => {
    if (!event.target.closest('.shiner')) return
    const target = document.getElementById('content-below-quote')
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
})

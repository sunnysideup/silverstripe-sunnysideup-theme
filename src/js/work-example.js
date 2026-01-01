document.addEventListener('click', e => {
    const item = e.target.closest('.work-example-image')
    if (!item) return

    item.classList.toggle('is-active')
})

// tap / click on a work example image to show its caption
document.addEventListener('click', (event) => {
    event.target.closest('.work-example-image')?.classList.toggle('is-active')
})

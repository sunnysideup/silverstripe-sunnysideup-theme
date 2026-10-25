// make sure the content (not the hero) is what gets printed
window.addEventListener('beforeprint', () => {
    document.getElementById('content-below-quote')?.scrollIntoView()
})

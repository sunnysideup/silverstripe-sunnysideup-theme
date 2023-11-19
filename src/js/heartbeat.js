const heartbeat = {
    init: function () {
        document.querySelectorAll('.image-container').forEach(el => {
            el.addEventListener('mousemove', e => {
                const { width, height, left, top } =
                    e.target.getBoundingClientRect()
                const x = e.pageX - left - window.scrollX
                const y = e.pageY - top - window.scrollY
                e.target.style.setProperty('--mouse-x', (x / width) * 50 - 25)
                e.target.style.setProperty('--mouse-y', 25 - (y / height) * 50)
            })
        })
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Your code goes here
    heartbeat.init()
})

const debounce = (callback, timeout, _this) => {
    let timer
    return e => {
        const _that = this
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            callback.call(_this || _that, e)
        }, timeout)
    }
}

const userAction = debounce(function () {
    const fullScreenDiv = document.getElementById('battery-saver-div')

    // Show the div when the document is loaded
    fullScreenDiv.style.display = 'flex'

    // Add click event listener
    fullScreenDiv.addEventListener('click', function () {
        fullScreenDiv.style.display = 'none'
    })
}, 60000)

document.addEventListener('click', userAction, false)
document.addEventListener('scroll', userAction, false)

userAction()

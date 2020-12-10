const showRocketMode = {
  init: function () {
    const toggleClassOnHover = (e) => {
      document.querySelector('body')
        .classList
        .toggle('mouse-over-logo', e.type === 'mouseenter')
    }
    const logo = document.getElementById('logo')
    logo.addEventListener('mouseenter', toggleClassOnHover)
    logo.addEventListener('mouseleave', toggleClassOnHover)
  }
}

showRocketMode.init()

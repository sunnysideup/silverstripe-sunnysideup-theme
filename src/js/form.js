var formfields = document.querySelectorAll(
  'input, select, textarea'
)
for (var J = formfields.length - 1; J >= 0; --J) {
  formfields[J].addEventListener('change', adjustStyling, false)
  formfields[J].addEventListener('keyup', adjustStyling, false)
  formfields[J].addEventListener('focus', adjustStyling, false)
  formfields[J].addEventListener('blur', adjustStyling, false)
  formfields[J].addEventListener('mousedown', adjustStyling, false)

  var evt = document.createEvent('HTMLEvents')
  evt.initEvent('change', false, true)
  formfields[J].dispatchEvent(evt)
}

function adjustStyling (zEvent) {
  var inpVal = zEvent.target.value
  if (inpVal && inpVal.replace(/^\s+|\s+$/g, '')) {
    zEvent.target.classList.remove('no-value')
  } else {
    zEvent.target.classList.add('no-value')
  }
}

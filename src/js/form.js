// Marks empty form fields with .no-value (used for floating label styling).
const FIELDS = 'input, select, textarea'

const mark = (field) => field.classList.toggle('no-value', !field.value.trim())

// one delegated listener instead of five per field
;['input', 'change', 'focusin', 'focusout'].forEach((type) => {
    document.addEventListener(type, (event) => {
        if (event.target.matches?.(FIELDS)) mark(event.target)
    })
})

document.querySelectorAll(FIELDS).forEach(mark)

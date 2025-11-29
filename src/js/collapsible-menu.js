const CollapsibleLists = (() => {
    function apply () {
        document.querySelectorAll('ul.collapsibleList').forEach(list => {
            applyTo(list)
            updateHasOpen(list)
        })
    }

    function applyTo (list) {
        list.querySelectorAll('li').forEach(li => {
            const childUl = li.querySelector(':scope > ul')
            if (!childUl) return

            // ADD TOGGLE ARROW
            const span = document.createElement('span')
            span.className = 'open-close'
            span.innerHTML = '<i class="open">↘</i><i class="closed">↖</i>'
            span.addEventListener('click', () => toggle(li))

            li.insertBefore(span, childUl)

            // collapsed by default
            li.classList.add('collapsibleListClosed')
            childUl.style.display = 'none'

            // open defaults
            if (
                li.classList.contains('current') ||
                li.classList.contains('section')
            ) {
                open(li)
            }
        })
    }

    function toggle (li) {
        if (li.classList.contains('collapsibleListOpen')) {
            close(li)
        } else {
            open(li)
        }
    }

    function open (li) {
        li.classList.remove('collapsibleListClosed')
        li.classList.add('collapsibleListOpen')

        const directUl = li.querySelector(':scope > ul')
        if (directUl) directUl.style.display = 'block'

        // keep deeper levels collapsed
        if (directUl) {
            directUl.querySelectorAll(':scope ul').forEach(nestedUl => {
                const nestedLi = nestedUl.parentElement
                nestedLi.classList.remove('collapsibleListOpen')
                nestedLi.classList.add('collapsibleListClosed')
                nestedUl.style.display = 'none'
            })
        }

        // NEW: close siblings on the same level
        const parentList = li.parentElement
        parentList
            .querySelectorAll(':scope > li.collapsibleListOpen')
            .forEach(sibling => {
                if (sibling !== li) {
                    close(sibling)
                }
            })

        markSiblingState(li)
        updateHasOpen(li.closest('.collapsibleList'))
    }

    function close (li) {
        li.classList.remove('collapsibleListOpen')
        li.classList.add('collapsibleListClosed')

        const childUl = li.querySelector(':scope > ul')
        if (childUl) childUl.style.display = 'none'

        markSiblingState(li)
        updateHasOpen(li.closest('.collapsibleList'))
    }

    function markSiblingState (li) {
        const parentList = li.parentElement
        if (!parentList.classList.contains('collapsibleList')) return

        const siblings = parentList.querySelectorAll(':scope > li')
        const isOpen = li.classList.contains('collapsibleListOpen')

        siblings.forEach(sib => sib.classList.remove('collapsibleListNotOpen'))

        if (isOpen) {
            siblings.forEach(sib => {
                if (sib !== li) sib.classList.add('collapsibleListNotOpen')
            })
        }
    }

    function updateHasOpen (list) {
        if (!list) return
        const has = list.querySelector('.collapsibleListOpen')
        list.classList.toggle('collapsibleListHasOpen', !!has)
    }

    return { apply }
})()

CollapsibleLists.apply()

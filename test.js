let input = document.getElementById('input-temp');
let clear = document.getElementById('clear-temp');
let submit = document.getElementById('submit-temp');
let target = document.getElementById('target');
let container = document.getElementById('container');
let list_tags = document.getElementById('list-tags');

let createInput = (val='', deletable=false) => {
    let ele = input.cloneNode(true).content.children[0];
    let inp = ele.children[0];
    inp.setAttribute('value', val)

    function confirm() {
        ele.remove()
        target.appendChild(createInput(val, true))
        let new_input = createInput()
        target.appendChild(new_input)
        new_input.click()
    }

    // Keyup Events
    inp.addEventListener('keyup', e => {
        // Event for enter
        if (e.key === 'Enter') {
            if (deletable === false && val !== '') {      
                confirm()
            }
        }
    })

    // Keydown Events
    inp.addEventListener('keydown', e => {
        // Prevent enter from making new line
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    })

    // On Click
    ele.addEventListener('click', e => {
        // Make Editable
        inp.setAttribute('contentEditable', true)
        inp.focus()

        if (val === '') {
            inp.innerHTML = '';
            inp.style.color = '#333333';
        }
    })

    // Detect Offclick
    document.addEventListener('click', e => {
        if (target.contains(e.target)) return
        inp.setAttribute('contentEditable', false)
        if (val === '') {
            inp.innerHTML = 'tags';
            inp.style.color = ''
            if (deletable === true) return ele.remove()
        }
    })

    // On change
    inp.addEventListener('keyup', e => {
        if (val === '' & inp.innerHTML === 'tag') {
            inp.innerHTML = '';
            inp.style.color = '#333333';
        }
        val = inp.innerHTML;
        inp.setAttribute('value', val)
    })

    // If this tag is deletable 
    if (deletable === true) {
        inp.innerHTML = val;
        inp.style.color = '#333333';

        let deleter = clear.cloneNode(true).content.children[0];
        deleter.addEventListener('click', e => {
            ele.remove()
        })
        ele.classList.add('del')
        ele.appendChild(deleter)
    } 
    
    else {
        let submitter = submit.cloneNode(true).content.children[0]
        submitter.addEventListener('click', e => {
            confirm()
        })
        ele.appendChild(submitter)
    }

    return ele
}

window.addEventListener('load', e => {
    target.appendChild(createInput())
})

list_tags.addEventListener('click', e => {
    let list = []
    Array.from(document.getElementsByClassName('del')).forEach(ele => {
        let val = ele.children[0].getAttribute('value');
        list.push(val)
    })
    window.alert(`Tags : ${list}`)
})
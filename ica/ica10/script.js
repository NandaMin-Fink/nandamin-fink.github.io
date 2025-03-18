let box = document.getElementById('box')
box.addEventListener('click', changeFontSize) 

let h1 = document.querySelector('h1')
h1.addEventListener('click', animate)

function changeFontSize(){
    const largePadding = "3em"
    const smallPadding = "1em"
    if (box.style.padding == largePadding)
        box.style.padding = smallPadding
    else {
        box.style.padding = largePadding
    }
}

function animate(){
    h1.style.animation = "swing 7s ease"
}
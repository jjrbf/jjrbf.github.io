const nav = document.querySelector('.main-nav')

window.addEventListener('scroll', hideNav)

function hideNav() {
    if(window.scrollY > nav.offsetHeight + 10) {
        nav.classList.add('hidden')
    } else {
        nav.classList.remove('hidden')
    }
}
function startListener() {
    document.getElementById('englishToggle').addEventListener('mousedown', mousedownEnglishButton)
    document.getElementById('germanToggle').addEventListener('mousedown', mousedownGermanButton)
    document.getElementById('englishToggle').addEventListener('click', toggleToEnglish)
    document.getElementById('germanToggle').addEventListener('click', toggleToGerman)
    document.getElementById('burgerNavbar').addEventListener('click', openBurgerNavbar)
}

function toggleToGerman() {
    let germanButton = document.getElementById('germanToggle')
    let englishButton = document.getElementById('englishToggle')
    englishButton.src = "./assets/img/header/englishInActive.png"
    germanButton.src = "./assets/img/header/germanActive.png"
}

function toggleToEnglish() {
    let germanButton = document.getElementById('germanToggle')
    let englishButton = document.getElementById('englishToggle')
    englishButton.src = "./assets/img/header/language single componentEN_Active.png"
    germanButton.src = "./assets/img/header/language single componentDE_Inactive.png"
}

function mousedownEnglishButton() {
    let englishButton = document.getElementById('englishToggle')

    englishButton.src = "./assets/img/header/Property 1=on press.png"
}

function mousedownGermanButton() {
    let germanButton = document.getElementById('germanToggle')

    germanButton.src = "./assets/img/header/Property 1=on press.png"
}

function openBurgerNavbar(event) {
    let burgerNavbar = document.getElementById('burgerNavbar')
    let html = document.getElementById('html')
    addEventlistenerToChildrenOfElement('navMenu', 'li')
    if (event.currentTarget.classList[1] == 'open') {
        closeMobileNavbar()
    } else {
        burgerNavbar.classList.add('open')
        checkWindowInnerWidth()
        html.style = "overflow: hidden"
    }

}

function closeMobileNavbar() {
    let navbar = document.getElementById('nav')
    let burgerNavbar = document.getElementById('burgerNavbar')
    let html = document.getElementById('html')
    burgerNavbar.classList.remove('open')
    navbar.style = "left: 1100px"
    html.style = "overflow: scroll"
}

function checkWindowInnerWidth() {
    let navbar = document.getElementById('nav')
    let burgerNavbar = document.getElementById('burgerNavbar')
    if (burgerNavbar.classList[1] == 'open') {
        if (window.innerWidth > 560) {
            navbar.style = "left: -60px"
        } else {
            navbar.style = "left: -40px"
        }
    }
    window.addEventListener('resize', checkWindowInnerWidth)
}

function addEventlistenerToChildrenOfElement(id, children) {
    let element = document.getElementById(id)
    element.querySelectorAll(children).forEach(child => {
        child.addEventListener('click', closeMobileNavbar);
    });
}

startListener()
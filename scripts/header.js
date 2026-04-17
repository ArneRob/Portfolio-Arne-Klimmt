function startListener() {
    document.getElementById('englishToggle').addEventListener('mousedown', mousedownEnglishButton)
    document.getElementById('germanToggle').addEventListener('mousedown', mousedownGermanButton)
    document.getElementById('englishToggle').addEventListener('mouseup', mouseupEnglishButton)
    document.getElementById('germanToggle').addEventListener('mouseup', mouseupGermanButton)
    document.getElementById('englishToggle').addEventListener('click', checkCurrentLang)
    document.getElementById('germanToggle').addEventListener('click', checkCurrentLang)
    document.getElementById('burgerNavbar').addEventListener('click', openBurgerNavbar)
}

function toggleLanguageButtons(lang) {
    let germanButton = document.getElementById('germanToggle')
    let englishButton = document.getElementById('englishToggle')
    toggleLocalStorageLanguage(lang)
    englishButton.classList.toggle('langToggleOn')
    englishButton.classList.toggle('langToggleOff')
    germanButton.classList.toggle('langToggleOn')
    germanButton.classList.toggle('langToggleOff')
    passCurrentLang()
    if (document.getElementById('privacyPolicyText')) { translatePivacyPolicy() }
    if (document.getElementById('legalNoticeText')) { translateLegalNotice() }
}
function toggleLocalStorageLanguage(lang) {
    if (lang == 'DE' || !localStorage.getItem('language')) {
        localStorage.setItem('language', 'DE')
    } else if (lang == 'EN') {
        localStorage.setItem('language', 'EN')
    }
}

function checkCurrentLang(event) {
    if (localStorage.getItem('language') == event.currentTarget.innerText) { return }
    toggleLanguageButtons(event.currentTarget.innerText)
}

function mousedownEnglishButton() {
    let englishButton = document.getElementById('englishToggle')

    englishButton.classList.add('langToggleClicked')
}

function mouseupEnglishButton() {
    let englishButton = document.getElementById('englishToggle')

    englishButton.classList.remove('langToggleClicked')
}

function mousedownGermanButton() {
    let germanButton = document.getElementById('germanToggle')

    germanButton.classList.add('langToggleClicked')
}

function mouseupGermanButton() {
    let germanButton = document.getElementById('germanToggle')

    germanButton.classList.remove('langToggleClicked')
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
/** Registers all event listeners for language toggle buttons and the burger navbar */
function startListener() {
    document.getElementById('englishToggle').addEventListener('mousedown', mousedownEnglishButton)
    document.getElementById('germanToggle').addEventListener('mousedown', mousedownGermanButton)
    document.getElementById('englishToggle').addEventListener('mouseup', mouseupEnglishButton)
    document.getElementById('germanToggle').addEventListener('mouseup', mouseupGermanButton)
    document.getElementById('englishToggle').addEventListener('click', checkCurrentLang)
    document.getElementById('germanToggle').addEventListener('click', checkCurrentLang)
    document.getElementById('burgerNavbar').addEventListener('click', openBurgerNavbar)
    addEventlistenerToChildrenOfElement('navMenu', 'li')
    window.addEventListener('resize', checkWindowInnerWidth)
}

/**
 * Switches the active language button visuals, updates localStorage, applies translations,
 * and re-renders legal content pages if present
 * @param {'DE' | 'EN'} lang
 */
function toggleLanguageButtons(lang) {
    let germanButton = document.getElementById('germanToggle')
    let englishButton = document.getElementById('englishToggle')
    toggleLocalStorageLanguage(lang)
    englishButton.classList.toggle('langToggleOn')
    englishButton.classList.toggle('langToggleOff')
    germanButton.classList.toggle('langToggleOn')
    germanButton.classList.toggle('langToggleOff')
    passCurrentLang()
    if (document.getElementById('privacyPolicyText')) { translatePrivacyPolicy() }
    if (document.getElementById('legalNoticeText')) { translateLegalNotice() }
}
/**
 * Persists the selected language in localStorage; defaults to 'DE' when no value is stored
 * @param {'DE' | 'EN'} lang
 */
function toggleLocalStorageLanguage(lang) {
    if (lang == 'DE' || !localStorage.getItem('language')) {
        localStorage.setItem('language', 'DE')
    } else if (lang == 'EN') {
        localStorage.setItem('language', 'EN')
    }
}

/**
 * Switches the language only when the clicked button differs from the currently active language
 * @param {MouseEvent} event
 */
function checkCurrentLang(event) {
    if (localStorage.getItem('language') == event.currentTarget.innerText) { return }
    toggleLanguageButtons(event.currentTarget.innerText)
}

/** Adds the pressed visual state to the English language toggle button */
function mousedownEnglishButton() {
    let englishButton = document.getElementById('englishToggle')

    englishButton.classList.add('langToggleClicked')
}

/** Removes the pressed visual state from the English language toggle button */
function mouseupEnglishButton() {
    let englishButton = document.getElementById('englishToggle')

    englishButton.classList.remove('langToggleClicked')
}

/** Adds the pressed visual state to the German language toggle button */
function mousedownGermanButton() {
    let germanButton = document.getElementById('germanToggle')

    germanButton.classList.add('langToggleClicked')
}

/** Removes the pressed visual state from the German language toggle button */
function mouseupGermanButton() {
    let germanButton = document.getElementById('germanToggle')

    germanButton.classList.remove('langToggleClicked')
}

/**
 * Toggles the mobile navigation open or closed and locks/unlocks page scroll accordingly
 * @param {MouseEvent} event
 */
function openBurgerNavbar(event) {
    let burgerNavbar = document.getElementById('burgerNavbar')
    let html = document.getElementById('html')
    if (event.currentTarget.classList[1] == 'open') {
        closeMobileNavbar()
    } else {
        burgerNavbar.classList.add('open')
        checkWindowInnerWidth()
        html.style = "overflow: hidden"
    }

}

/** Slides the mobile navbar off-screen, removes the open state, and re-enables page scroll */
function closeMobileNavbar() {
    let navbar = document.getElementById('nav')
    let burgerNavbar = document.getElementById('burgerNavbar')
    let html = document.getElementById('html')
    burgerNavbar.classList.remove('open')
    navbar.style = "left: 1100px"
    html.style = "overflow: scroll"
}

/** Repositions the open navbar based on the current viewport width */
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
}

/**
 * Attaches a click listener that closes the mobile navbar to every matching child element
 * @param {string} id - ID of the parent element
 * @param {string} children - CSS selector for the child elements to target
 */
function addEventlistenerToChildrenOfElement(id, children) {
    let element = document.getElementById(id)
    element.querySelectorAll(children).forEach(child => {
        child.addEventListener('click', closeMobileNavbar);
    });
}

startListener()
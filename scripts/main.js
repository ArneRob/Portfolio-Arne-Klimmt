/** Registers all event listeners for the contact form */
function startContactFormListener() {
    document.querySelector('.contactForm').addEventListener('submit', (e) => e.preventDefault())
    document.getElementById('contactSubmitBtn').addEventListener('click', sendMail)
    document.getElementById('privacyCheck').addEventListener('click', toggleFormButton)
    document.getElementById('formNameInput').addEventListener('blur', handleValidationEvent)
    document.getElementById('formEmailInput').addEventListener('blur', handleValidationEvent)
    document.getElementById('formTextInput').addEventListener('blur', handleValidationEvent)
    document.getElementById('privacyCheck').addEventListener('click', handleValidationEvent)

}

/** Validates all form fields and sends the form data if valid */
function sendMail() {
    if (!validateAllFormFields()) return
    let jsonFormInput = getFormData()
    sendFormDataToServer(jsonFormInput)
}

/**
 * Reads the form input values and returns them as a JSON object
 * @returns {{ email: string, name: string, message: string }}
 */
function getFormData() {
    let contactForm = document.getElementById('contactForm')
    let json = {
        'email': `${contactForm[1].value}`,
        'name': `${contactForm[0].value}`,
        'message': `${contactForm[2].value}`,
    }
    return json
}

/**
 * Sends the form data to the server via POST and clears the form on success
 * @param {{ email: string, name: string, message: string }} data
 */
async function sendFormDataToServer(data) {
    try {
        const response = await fetch('mail.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        const lang = localStorage.getItem('language') || 'EN'
        if (result.success) {
            emptyFormField()
            showToast(translations[lang]['toast.sent'], 'success')
        } else {
            showToast(translations[lang]['toast.error'], 'error')
        }
    } catch (error) {
        const lang = localStorage.getItem('language') || 'EN'
        showToast(translations[lang]['toast.error'], 'error')
    }
}

/** Toggles the privacy checkbox visual state */
function togglePrivacyCheckbox() {
    document.getElementById('privacyCheck').classList.toggle('contactCheckboxImgChecked')
    document.getElementById('privacyCheck').classList.toggle('checked')
}

/** Adds the active state class to the submit button */
function addClassContactSubmitBtn() {
    document.getElementById('contactSubmitBtn').classList.add('contactSubmitBtnPermittedToSend')
}

/** Removes the active state class from the submit button */
function removeClassContactSubmitBtn() {
    document.getElementById('contactSubmitBtn').classList.remove('contactSubmitBtnPermittedToSend')
}

/** Clears all form input fields and resets the checkbox and submit button to their default state */
function emptyFormField() {
    let idArray = ["formNameInput", "formEmailInput", "formTextInput"]
    idArray.forEach(element => {
        document.getElementById(element).value = ""
    })
    const checkbox = document.getElementById('privacyCheck')
    checkbox.classList.remove('contactCheckboxImgChecked', 'checked')
    document.getElementById('contactSubmitBtn').classList.remove('contactSubmitBtnPermittedToSend')
}

/**
 * Validates all form fields and returns whether all are valid
 * @returns {boolean}
 */
function validateAllFormFields() {
    let idArray = ["formNameInput", "formEmailInput", "formTextInput", "privacyCheck"]
    let isValid = true
    for (let element of idArray) {
        let domElem = document.getElementById(`${element}`)
        if (!validateInput(domElem, element)) isValid = false
    }
    return isValid
}

/** Checks all form fields silently and updates the submit button state accordingly */
function checkFormfields() {
    if (!validateSilentAllFormFields()) {
        removeClassContactSubmitBtn()
        return
    } else {
        addClassContactSubmitBtn()
    }
}

/**
 * Returns true if all form fields have the checked class
 * @returns {boolean}
 */
function validateSilentAllFormFields() {
    const ids = ['formNameInput', 'formEmailInput', 'formTextInput', 'privacyCheck']
    return ids.every(id => document.getElementById(id).classList.contains('checked'))
}

/**
 * Validates a single form field on blur event
 * @param {FocusEvent} event
 */
function handleValidationEvent(event) {
    let element = document.getElementById(`${event.currentTarget.id}`)
    let elementId = event.currentTarget.id
    validateInput(element, elementId)
    checkFormfields()
}

/**
 * Validates a form element and shows or removes its error message
 * @param {HTMLElement} element
 * @param {string} elementId
 * @returns {boolean}
 */
function validateInput(element, elementId) {
    if (elementId == "formEmailInput") {
        return processEmailError(element, elementId)
    } else if (elementId == "privacyCheck") {
        return processCheckBoxError(element, elementId)
    } else if (element.value) {
        addCheckedToEl(elementId)
        removeInputErrorText(elementId)
        return true
    } else {
        removeCheckedFromEl(elementId)
        addInputErrorText(elementId, element)
        return false
    }
}

/** Toggles the privacy checkbox and updates the submit button state */
function toggleFormButton() {
    togglePrivacyCheckbox()
    checkFormfields()
}

/**
 * Validates the privacy checkbox and shows or removes its error message
 * @param {HTMLElement} element
 * @param {string} elementId
 * @returns {boolean}
 */
function processCheckBoxError(element, elementId) {
    if (element.classList.contains("checked")) {
        removeInputErrorText(elementId)
        return true
    } else {
        addInputErrorText(elementId, element)
        return false
    }
}

/**
 * Adds the checked class to a form field
 * @param {string} elementId
 */
function addCheckedToEl(elementId) {
    document.getElementById(elementId).classList.add('checked')
}

/**
 * Removes the checked class from a form field
 * @param {string} elementId
 */
function removeCheckedFromEl(elementId) {
    document.getElementById(elementId).classList.remove('checked')
}

/**
 * Validates the email field and shows or removes its error message
 * @param {HTMLElement} element
 * @param {string} elementId
 * @returns {boolean}
 */
function processEmailError(element, elementId) {
    if (element.value) {
        if (validateEmail(element.value)) {
            addCheckedToEl(elementId)
            removeInputErrorText(elementId)
            return true
        } else {
            removeCheckedFromEl(elementId)
            addInputErrorText(elementId, element)
            return false
        }
    } else {
        removeCheckedFromEl(elementId)
        addInputErrorText(elementId, element)
        return false
    }
}

/**
 * Removes the error message for a form field
 * @param {string} elementId
 */
function removeInputErrorText(elementId) {
    let errorDivId = `error${elementId}`
    let errorElement = document.getElementById(`${errorDivId}`)
    errorElement.style = ""
    errorElement.textContent = ''
}

/**
 * Adds an error message below a form field
 * @param {string} elementId
 * @param {HTMLElement} element
 */
function addInputErrorText(elementId, element) {
    let errorDivId = `error${elementId}`
    let errorElement = document.getElementById(`${errorDivId}`)
    errorElement.style = "color:red"
    if (localStorage.getItem('language') == "DE") {
        errorElement.textContent = returnErrorText(elementId, element)
    } else {
        errorElement.textContent = returnErrorTextEN(elementId, element)
    }
}

/**
 * Returns the appropriate error message for a form field
 * @param {string} elementId
 * @param {HTMLElement} element
 * @returns {string}
 */
function returnErrorText(elementId, element) {
    if (elementId == "formNameInput") {
        return "Bitte Namen eintragen"
    } else if (elementId == "formEmailInput" && !element.value) {
        return "Bitte Email eintragen"
    } else if (elementId == "formEmailInput" && element.value) {
        return "Bitte valide Email eintragen"
    } else if (elementId == "formTextInput") {
        return "Das Textfeld ist leer"
    } else if (elementId == "privacyCheck") {
        return "Bitte akzeptiere die Datenschutzerklärung"
    }
}

/**
 * Returns the appropriate English error message for a form field
 * @param {string} elementId
 * @param {HTMLElement} element
 * @returns {string}
 */
function returnErrorTextEN(elementId, element) {
    if (elementId == "formNameInput") {
        return "Please enter your name"
    } else if (elementId == "formEmailInput" && !element.value) {
        return "Please enter your email"
    } else if (elementId == "formEmailInput" && element.value) {
        return "Please enter a valid email"
    } else if (elementId == "formTextInput") {
        return "The message field is empty"
    } else if (elementId == "privacyCheck") {
        return "Please accept the privacy policy"
    }
}
/**
 * Checks if an email address matches a valid format
 * @param {string} email
 * @returns {RegExpMatchArray | null}
 */
const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

/**
 * Shows a toast notification and hides it after 3 seconds
 * @param {string} message
 * @param {'success' | 'error'} type
 */
function showToast(message, type) {
    const toast = document.getElementById('toast')
    toast.textContent = message
    toast.className = `toast ${type} show`
    setTimeout(() => toast.className = 'toast', 3000)
}

/** Initializes click-based overlay behavior for portfolio cards on mobile screens */
function initMobilePortfolioCards() {
    const mobileMediaQuery = window.matchMedia('(max-width: 1100px)')
    const cards = document.querySelectorAll('.portfolioCard')

    function handleCardClick(event) {
        const card = event.currentTarget
        const isOpen = card.classList.contains('overlayActive')
        cards.forEach(card => card.classList.remove('overlayActive'))
        if (!isOpen) card.classList.add('overlayActive')
    }

    function activate() {
        cards.forEach(card => card.addEventListener('click', handleCardClick))
    }

    function deactivate() {
        cards.forEach(card => {
            card.removeEventListener('click', handleCardClick)
            card.classList.remove('overlayActive')
        })
    }

    mobileMediaQuery.addEventListener('change', mediaQueryEvent => {
        if (mediaQueryEvent.matches) {
            activate()
        } else {
            deactivate()
        }
    })
    if (mobileMediaQuery.matches) activate()
}

startContactFormListener()
initMobilePortfolioCards()

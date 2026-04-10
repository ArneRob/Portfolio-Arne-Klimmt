function startContactFormListener() {
    document.querySelector('.contactForm').addEventListener('submit', (e) => e.preventDefault())
    document.getElementById('contactSubmitBtn').addEventListener('click', sendMail)
    document.getElementById('privacyCheck').addEventListener('click', toggleFormButtons)
    document.getElementById('formNameInput').addEventListener('blur', handleValidationEvent)
    document.getElementById('formEmailInput').addEventListener('blur', handleValidationEvent)
    document.getElementById('formTextInput').addEventListener('blur', handleValidationEvent)
}
function sendMail(event) {
    // let jsonFormInput = getFormData()
    validateAllFormFields(event)
    // sendFormDataToServer(jsonFormInput)
}
function getFormData() {
    let contactForm = document.getElementById('contactForm')
    let json = {
        'email': `${contactForm[1].value}`,
        'name': `${contactForm[0].value}`,
        'message': `${contactForm[2].value}`,
    }
    return json
}

async function sendFormDataToServer(data) {
    try {
        const response = await fetch('mail.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        if (result.success) {
            console.log('Mail sent successfully')
        } else {
            console.error('Mail error:', result.error)
        }
    } catch (error) {
        console.error(error)
    }
}

function togglePrivacyCheckbox() {
    document.getElementById('privacyCheck').classList.toggle('contactCheckboxImgChecked')
    document.getElementById('privacyCheck').classList.toggle('checked')
}

function toggleContactSubmitBtn() {
    document.getElementById('contactSubmitBtn').classList.toggle('contactSubmitBtnPermittedToSend')
}

function validateAllFormFields() {
    let idArray = ["formNameInput", "formEmailInput", "formTextInput", "privacyCheck"]
    idArray.forEach(element => {
        let domElem = document.getElementById(`${element}`)
        validateInput(domElem, element)
    });
}

function handleValidationEvent(event) {
    let element = document.getElementById(`${event.currentTarget.id}`)
    let elementId = event.currentTarget.id
    validateInput(element, elementId)
}

function validateInput(element, elementId) {
    if (elementId == "formEmailInput") {
        processEmailError(element, elementId)
    } else if (elementId == "privacyCheck") {
        processCheckBoxError(element, elementId)
    } else if (element.value) {
        removeInputErrorText(elementId)
    } else {
        addInputErrorText(elementId, element)
    }
}

function toggleFormButtons() {
    togglePrivacyCheckbox()
    toggleContactSubmitBtn()
}

function processCheckBoxError(element, elementId) {
    if (element.classList[2] == "checked") {
        removeInputErrorText(elementId)
        return true
    } else {
        addInputErrorText(elementId, element)
    }
}

function processEmailError(element, elementId) {
    if (element.value) {
        if (validateEmail(element.value)) {
            removeInputErrorText(elementId)
        } else {
            addInputErrorText(elementId, element)
        }
    } else {
        addInputErrorText(elementId, element)
    }
}

function removeInputErrorText(elementId) {
    let errorDivId = `error${elementId}`
    let errorElement = document.getElementById(`${errorDivId}`)
    errorElement.style = ""
    errorElement.textContent = ''
}
function addInputErrorText(elementId, element) {
    errorDivId = `error${elementId}`
    let errorElement = document.getElementById(`${errorDivId}`)
    errorElement.style = "color:red"
    errorElement.textContent = returnErrorText(elementId, element)
}
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

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function validate(email) {
    if (validateEmail(email)) {
        return true;
    } else {
        return false
    }
}

startContactFormListener()
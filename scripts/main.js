function startContactFormListener() {
    document.querySelector('.contactForm').addEventListener('submit', (e) => e.preventDefault())
    document.getElementById('privacyCheck').addEventListener('click', togglePrivacyCheckbox)
    document.getElementById('formNameInput').addEventListener('blur', checkWhichInput)
    document.getElementById('formEmailInput').addEventListener('blur', checkWhichInput)
    document.getElementById('formTextInput').addEventListener('blur', checkWhichInput)
}
function sendMail() {
    let jsonFormInput = getFormData()
    sendFormDataToServer(jsonFormInput)
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

function checkWhichInput(event) {
    element = document.getElementById(`${event.currentTarget.id}`)
    elementId = event.currentTarget.id
    if (elementId == "formNameInput") {
        validateInput(element, elementId)
    } else if (elementId == "formEmailInput") {
        validateInput(element, elementId)

    } else if (elementId == "formTextInput") {
        validateInput(element, elementId)
    }
    event.currentTarget.id
}

function validateInput(element, elementId) {
    if (elementId == "formEmailInput") {
        if (element.value) {
            validate(element.value)
        } else {
            addInputErrorText(elementId)
        }
    } else if (element.value) {
        removeInputErrorText(elementId)
        console.log('ok')
    } else {
        addInputErrorText(elementId)
    }
}
function removeInputErrorText(elementId) {
    errorDivId = `error${elementId}`
    errorElement = document.getElementById(`${errorDivId}`)
    errorElement.style = ""
    errorElement.innerHTML = ''
}
function addInputErrorText(elementId) {
    errorDivId = `error${elementId}`
    errorElement = document.getElementById(`${errorDivId}`)
    errorElement.style = "color:red"
    errorElement.innerHTML = 'nischt jeschriebn'
}

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function validate(email) {
    if (validateEmail(email)) {
        console.log('true')
        return true;
    } else {
        console.log('false');
    }
}

startContactFormListener()
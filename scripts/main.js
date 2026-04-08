function startListener() {
    document.querySelector('.contactForm').addEventListener('submit', (e) => e.preventDefault())
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

startListener()
function startListener() {
    document.getElementById('englishToggle').addEventListener('mousedown', mousedownEnglishButton)
    document.getElementById('germanToggle').addEventListener('mousedown', mousedownGermanButton)
    document.getElementById('englishToggle').addEventListener('click', toggleToEnglish)
    document.getElementById('germanToggle').addEventListener('click', toggleToGerman)
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
    googleTranslateElementInit()
}

function mousedownEnglishButton() {
    let englishButton = document.getElementById('englishToggle')

    englishButton.src = "./assets/img/header/Property 1=on press.png"
}

function mousedownGermanButton() {
    let germanButton = document.getElementById('germanToggle')

    germanButton.src = "./assets/img/header/Property 1=on press.png"
}

startListener()
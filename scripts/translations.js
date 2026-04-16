const translations = {
    EN: {
        "nav.about": "About me",
        "nav.skills": "Skills",
        "hero.letsTalk": "Lets talk!",
        "hero.scrollDown": "Scroll down!",
    },
    DE: {
        "nav.about": "Über mich",
        "nav.skills": "Fähigkeiten",
        "hero.letsTalk": "Lass uns reden!",
        "hero.scrollDown": "Scroll runter!",
    }
}

function passCurrentLang() {
    let lang = localStorage.getItem("language");
    if (!lang) { return }
    applyLanguage(lang)
}

function applyLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n
        if (translations[lang][key]) el.textContent = translations[lang][key]
    })
}

localStorage.setItem("language", "EN");
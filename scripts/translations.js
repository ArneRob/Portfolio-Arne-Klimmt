const translations = {
    EN: {
        "hero.letsTalk": "Lets talk!",
    },
    DE: {
        "hero.letsTalk": "Lass uns reden!",
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
const translations = {
    EN: {
        "nav.about": "About me",
        "hero.letsTalk": "Lets talk!",
        "hero.scrollDown": "Scroll down!",
        "about.heading": "About Me",
        "about.intro": "Hey, I'm Arne! I'm passionate about coding because I love seeing an idea turn into something that actually works. It motivates me to solve problems on my own and to think more and more like a real software developer.",
        "about.connect": "Let's connect and create something amazing together!",
        "about.location": "Im Living in Halle (Saale), im open to different ways of working, like remotly.",
        "about.project": "In my current position, I have developed a grain storage system software for my company. Although it is not fully finished yet, it already represents a very solid and well-designed project. It helps make storing items easier and allows users to quickly see where everything is located. Instead of using annoying paper notes, it provides a simple and user-friendly interface where users can enter data quickly and easily. You can find the demo in the Portfolio-Section.",
        "about.growth": "I get better with every project I create, and it's really fun to see how much I've grown. I'm now at a point where I feel like I can create anything I want — I just need the time. :)",
        "skills.lookingFor": "Looking for ",
        "skills.anotherSkill": "another skill?",
        "skills.contactSub": "Feel free to contact me, I can bring your idea to life!",
        "skills.getInTouch": "Get in touch",
        "skills.description": "In addition to my frontend skills, I also set up my own vServer, dealing with all the challenges that come with it, such as security and other aspects. This gave me insight into what a backend developer does. I really liked it and I can imagine doing more of it in the future.",
        "skills.continuallyLearning": "Continually learning",
        "portfolio.heading": "Portfolio",
        "portfolio.sub": "Explore a selection of my work here - Interact with projects to see my skills in action.",
        "contact.heading": "Contact",
        "contact.title": "Got a problem to solve?",
        "contact.description": "I have invested a lot of money in this training, and even more time and effort in the preparation. One year of preparation plus another 1.5 years of training at the Developer Akademie alongside my main job — I push through, stay focused on my goals, and discipline myself to achieve them.",
        "contact.needDev": "Need a Frontend developer? ",
        "contact.contactMe": "Contact me!",
        "contact.placeholderName": "Your name",
        "contact.placeholderEmail": "Your email",
        "contact.placeholderMessage": "Your message",
        "contact.privacyPre": " I've read the ",
        "contact.privacyLink": "privacy policy",
        "contact.privacyPost": " and agree to the processing of my data as outlined.",
        "contact.sendBtn": "Send message :)",
        "footer.privacy": "Privacy policy",
        "footer.imprint": "Legal notice",
    },
    DE: {
        "nav.about": "Über mich",
        "hero.letsTalk": "Lass uns reden!",
        "hero.scrollDown": "Scroll runter!",
        "about.heading": "Über mich",
        "about.intro": "Hey, ich bin Arne! Ich begeistere mich fürs Programmieren, weil ich es liebe zu sehen, wie eine Idee zu etwas wird, das tatsächlich funktioniert. Es motiviert mich, Probleme eigenständig zu lösen und immer mehr wie ein echter Softwareentwickler zu denken.",
        "about.connect": "Lass uns vernetzen und gemeinsam etwas Großartiges erschaffen!",
        "about.location": "Ich lebe in Halle (Saale) und bin offen für verschiedene Arbeitsweisen, zum Beispiel remote.",
        "about.project": "In meiner aktuellen Position habe ich eine Getreiderlager-Software für mein Unternehmen entwickelt. Obwohl sie noch nicht vollständig fertig ist, stellt sie bereits ein sehr solides und gut gestaltetes Projekt dar. Sie erleichtert die Einlagerung und ermöglicht es, schnell zu sehen, wo sich alles befindet. Anstelle von lästigen Zetteln bietet sie eine einfache und benutzerfreundliche Oberfläche zur schnellen Dateneingabe. Die Demo findest du im Portfolio-Bereich.",
        "about.growth": "Mit jedem Projekt, das ich erstelle, werde ich besser und es macht wirklich Spaß zu sehen, wie weit ich gekommen bin. Ich bin jetzt an einem Punkt, an dem ich das Gefühl habe, alles erschaffen zu können, was ich möchte — ich brauche nur die Zeit. :)",
        "skills.lookingFor": "Auf der Suche nach ",
        "skills.anotherSkill": "weiteren Fähigkeit?",
        "skills.contactSub": "Kontaktiere mich gerne, ich kann deine Idee zum Leben erwecken!",
        "skills.getInTouch": "Kontakt aufnehmen",
        "skills.description": "Neben meinen Frontend-Kenntnissen habe ich auch meinen eigenen vServer eingerichtet und mich mit allen damit verbundenen Herausforderungen wie Sicherheit und anderen Aspekten befasst. Das hat mir einen Einblick gegeben, was ein Backend-Entwickler macht. Es hat mir wirklich gut gefallen und ich kann mir vorstellen, in Zukunft mehr davon zu machen.",
        "skills.continuallyLearning": "Stetig am Lernen",
        "portfolio.heading": "Portfolio",
        "portfolio.sub": "Hier findest du eine Auswahl meiner Arbeiten – Interagiere mit den Projekten, um meine Fähigkeiten in Aktion zu sehen.",
        "contact.heading": "Kontakt",
        "contact.title": "Ein Problem zu lösen?",
        "contact.description": "Ich habe viel Geld in diese Ausbildung investiert, und noch mehr Zeit und Mühe in die Vorbereitung. Ein Jahr Vorbereitung plus weitere 1,5 Jahre Ausbildung an der Developer Akademie und das neben meinem Hauptjob ich bleibe dran, behalte meine Ziele im Blick und diszipliniere mich, um sie zu erreichen.",
        "contact.needDev": "Einen Frontend-Entwickler gesucht? ",
        "contact.contactMe": "Kontaktiere mich!",
        "contact.placeholderName": "Dein Name",
        "contact.placeholderEmail": "Deine E-Mail",
        "contact.placeholderMessage": "Deine Nachricht",
        "contact.privacyPre": " Ich habe die ",
        "contact.privacyLink": "Datenschutzerklärung",
        "contact.privacyPost": " gelesen und stimme der Verarbeitung meiner Daten wie beschrieben zu.",
        "contact.sendBtn": "Nachricht senden :)",
        "footer.privacy": "Datenschutzerklärung",
        "footer.imprint": "Impressum",
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
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder
        if (translations[lang][key]) el.placeholder = translations[lang][key]
    })
}



function setLanguage() {
    if (localStorage.getItem('language') == "EN") {
        localStorage.setItem("language", "EN");
    } else {
        toggleToGerman()
    }
}

function translatePivacyPolicy() {
    let privacyPolicyText = document.getElementById('privacyPolicyText')

    if (localStorage.getItem('language') == 'DE') {
        privacyPolicyText.innerHTML = returnPrivacyPolicyTextDE()
    } else {
        privacyPolicyText.innerHTML = returnPrivacyPolicyTextEN()
    }
}

function translateLegalNotice() {
    let legalNoticeText = document.getElementById('legalNoticeText')

    if (localStorage.getItem('language') == 'DE') {
        legalNoticeText.innerHTML = returnLegalNoticeTextDE()
    } else {
        legalNoticeText.innerHTML = returnLegalNoticeTextEN()
    }
}

setLanguage()
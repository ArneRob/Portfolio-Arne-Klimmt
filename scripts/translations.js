const translations = {
    EN: {
        "nav.about": "About me",
        "nav.skills": "Skills",
        "hero.letsTalk": "Lets talk!",
        "hero.scrollDown": "Scroll down!",
        "about.heading": "About Me",
        "about.intro": "Hey, I'm Arne! I'm passionate about coding because I love seeing an idea turn into something that actually works. It motivates me to solve problems on my own and to think more and more like a real software developer.",
        "about.connect": "Let's connect and create something amazing together!",
        "about.location": "Im Living in Halle (Saale), im open to different ways of working, like remotly.",
        "about.project": "In my current position, I have developed a grain storage system software for my company. Although it is not fully finished yet, it already represents a very solid and well-designed project. It helps make storing items easier and allows users to quickly see where everything is located. Instead of using annoying paper notes, it provides a simple and user-friendly interface where users can enter data quickly and easily. You can find the demo in the Portfolio-Section.",
        "about.growth": "I get better with every project I create, and it's really fun to see how much I've grown. I'm now at a point where I feel like I can create anything I want — I just need the time. :)",
    },
    DE: {
        "nav.about": "Über mich",
        "nav.skills": "Fähigkeiten",
        "hero.letsTalk": "Lass uns reden!",
        "hero.scrollDown": "Scroll runter!",
        "about.heading": "Über mich",
        "about.intro": "Hey, ich bin Arne! Ich begeistere mich fürs Programmieren, weil ich es liebe zu sehen, wie eine Idee zu etwas wird, das tatsächlich funktioniert. Es motiviert mich, Probleme eigenständig zu lösen und immer mehr wie ein echter Softwareentwickler zu denken.",
        "about.connect": "Lass uns vernetzen und gemeinsam etwas Großartiges erschaffen!",
        "about.location": "Ich lebe in Halle (Saale) und bin offen für verschiedene Arbeitsweisen, zum Beispiel remote.",
        "about.project": "In meiner aktuellen Position habe ich eine Getreiderlager-Software für mein Unternehmen entwickelt. Obwohl sie noch nicht vollständig fertig ist, stellt sie bereits ein sehr solides und gut gestaltetes Projekt dar. Sie erleichtert die Einlagerung und ermöglicht es, schnell zu sehen, wo sich alles befindet. Anstelle von lästigen Zetteln bietet sie eine einfache und benutzerfreundliche Oberfläche zur schnellen Dateneingabe. Die Demo findest du im Portfolio-Bereich.",
        "about.growth": "Mit jedem Projekt, das ich erstelle, werde ich besser und es macht wirklich Spaß zu sehen, wie weit ich gekommen bin. Ich bin jetzt an einem Punkt, an dem ich das Gefühl habe, alles erschaffen zu können, was ich möchte — ich brauche nur die Zeit. :)",
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
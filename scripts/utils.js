function startGenerellEventlistener() {
    document.querySelectorAll('.mailIcon').forEach(el => el.addEventListener('click', openEmail))
}

function openEmail() {
    window.location.href = 'mailto:arne-klimmt@gmx.de?subject=Einladung zum Gespräch';
}

startGenerellEventlistener()
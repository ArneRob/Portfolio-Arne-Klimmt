function startGenerellEventlistener() {
    document.querySelectorAll('.mailIcon').forEach(el => el.addEventListener('click', openEmail))
}

function openEmail() {
    window.location.href = 'mailto:arne-klimmt@gmx.de?subject=Einladung zum Gespräch';
}

if (window.sessionStorage.getItem('animated') === null) { 
    document.getElementById('nameLogoEnd').classList.add('animateLogo');
    window.sessionStorage.setItem('animated' ,1);
} 

startGenerellEventlistener()
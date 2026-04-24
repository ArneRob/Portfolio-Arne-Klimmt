/** Registers global event listeners shared across all pages */
function startGenerellEventlistener() {
    document.querySelectorAll('.mailIcon').forEach(el => el.addEventListener('click', openEmail))
}

/** Opens the default mail client with a pre-filled subject line addressed to the site owner */
function openEmail() {
    window.location.href = 'mailto:arne-klimmt@gmx.de?subject=Einladung zum Gespräch';
}

// Run the logo intro animation only once per browser session
if (window.sessionStorage.getItem('animated') === null) {
    document.getElementById('nameLogoEnd').classList.add('animateLogo');
    window.sessionStorage.setItem('animated' ,1);
} 

startGenerellEventlistener()
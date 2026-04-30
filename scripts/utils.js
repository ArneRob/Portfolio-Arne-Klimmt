
// Run the logo intro animation only once per browser session
if (window.sessionStorage.getItem('animated') === null) {
    document.getElementById('nameLogoEnd').classList.add('animateLogo');
    window.sessionStorage.setItem('animated', 1);
}
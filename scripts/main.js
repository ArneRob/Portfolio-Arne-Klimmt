function startListener() {
    document.querySelector('.contactForm').addEventListener('submit', (e) => e.preventDefault())
}

startListener()
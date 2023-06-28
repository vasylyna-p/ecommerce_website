// Show mobile menu

const mobileBar = document.getElementById('bar');
const navbar = document.getElementById('navbar');
const closeButton = document.getElementById('close');

mobileBar.addEventListener('click', () => {
    navbar.classList.add('active');
})

closeButton.addEventListener('click', () => {
    navbar.classList.remove('active');
})
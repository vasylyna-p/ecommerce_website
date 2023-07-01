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

// Changing product image in single product page

let mainImage = document.getElementById('main-image');
const smallImage = document.getElementsByClassName('small-image');

[...smallImage].forEach(image => {
image.addEventListener('click', () => {
    mainImage.src = image.src;
})
})
let menuBtn = document.getElementById('menu-btn');
let navBar = document.querySelector('.navbar');
let navClose = document.getElementById('nav-close');

menuBtn.onclick = () => {
    navBar.classList.toggle('active');
}

navClose.onclick = () => {
    navBar.classList.remove('active');
}

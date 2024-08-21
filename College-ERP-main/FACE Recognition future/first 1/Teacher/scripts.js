document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === '' || password === '') {
                e.preventDefault();
                alert('Please fill out all fields');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (username === '' || email === '' || password === '') {
                e.preventDefault();
                alert('Please fill out all fields');
            }
        });
    }
});

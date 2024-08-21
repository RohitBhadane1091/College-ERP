document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            window.location.href = 'student-dashboard.html'; // Redirect to dashboard
        } else {
            alert('Login failed: Invalid credentials');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login');
    }
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            alert('User registered successfully');
            window.location.href = 'student-login.html'; // Redirect to login page
        } else {
            alert('Registration failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration');
    }
});

async function register() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            console.log('Registration successful');
            // Redirect or update UI as needed
        } else {
            console.error('Registration failed:', response.statusText);
            // Handle registration failure (show error message, etc.)
        }
    } catch (error) {
        console.error('Registration error:', error.message);
        // Handle network or other errors
    }
}

async function login() {
    const email = document.getElementById('username').value;  // Assuming login with email
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            console.log('Login successful');
            // Redirect or update UI as needed
        } else {
            console.error('Login failed:', response.statusText);
            // Handle login failure (show error message, etc.)
        }
    } catch (error) {
        console.error('Login error:', error.message);
        // Handle network or other errors
    }
}

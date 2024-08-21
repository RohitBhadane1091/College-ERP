// Function to check if the user is logged in
function checkLogin() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'student-login.html';
    }
}

// Logout function
document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'student-login.html';
});

// Run login check on the student dashboard
if (window.location.pathname === '/student-dashboard.html') {
    checkLogin();
}

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

document.getElementById('attendanceForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const date = document.getElementById('attendanceDate').value;
    const status = document.getElementById('attendanceStatus').value;
    const username = 'testuser'; // Replace with dynamic username

    try {
        const response = await fetch('http://localhost:5000/attendance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, date, status })
        });

        if (response.ok) {
            alert('Attendance recorded');
            loadAttendanceRecords(username);
        } else {
            alert('Failed to record attendance');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while recording attendance');
    }
});

async function loadAttendanceRecords(username) {
    try {
        const response = await fetch(`http://localhost:5000/attendance?username=${username}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const records = await response.json();
            const recordsDiv = document.getElementById('attendanceRecords');
            recordsDiv.innerHTML = '<h3>Attendance Records</h3>';
            records.forEach(record => {
                const recordElement = document.createElement('div');
                recordElement.textContent = `Date: ${record.date}, Status: ${record.status}`;
                recordsDiv.appendChild(recordElement);
            });
        } else {
            alert('Failed to load attendance records');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while loading attendance records');
    }
}

// Load attendance records on page load
if (window.location.pathname === '/student-dashboard.html') {
    const username = 'testuser'; // Replace with dynamic username
    loadAttendanceRecords(username);
}

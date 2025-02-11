document.getElementById('logInForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const email = document.getElementById('logInEmail').value;
    const password = document.getElementById('logInPassword').value;

    // const storedEmail = localStorage.getItem('userEmail');
    // const storedPassword = localStorage.getItem('userPassword');

    // if (email === storedEmail && password === storedPassword) {
    //     localStorage.setItem('isLoggedIn', 'true');
    //     window.location.href = 'account.html'; // Redirect to the account page
    // } else {
    //     document.getElementById("alarmMessage").innerHTML = "Incorrect email or password.";
    // }

    if(!email || !password)
    {
        document.getElementById("alarmMessage").innerHTML = "All fields are required";
    }

    const userData = {
        email: email,
        password: password,
    };

    try {
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const data = await response.json();
            showMessage("Log In successful! Welcome, " + data.username + "!", "success");
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user_id', data.userid);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', data.username);
        } else {
            const error = await response.json();
            showMessage("Log In failed: " + error.message, "error");
        }
    } catch (error) {
        showMessage("An error occurred: " + error.message, "error");
    }
});

function showMessage(message, type) {
    const alarmMessage = document.getElementById("alarmMessage");
    if (type === "error") {
        alarmMessage.style.color = 'rgb(237,73,86)';
    } else if (type === "success") {
        window.location.href = 'account.html';
        alarmMessage.style.color = '#13795b';
    }
    alarmMessage.innerHTML = message;
}

if (localStorage.getItem('isLoggedIn') === 'true') {
    
    // accountLink.style.display = 'block'; // Show the "Account" link
    // logoutButton.style.display = 'block'; // Show the "Logout" button
}
const accountLink = document.getElementById('account');
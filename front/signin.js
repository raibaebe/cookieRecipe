

document.getElementById('signInForm').addEventListener('submit', async function (event) {
    
    event.preventDefault();
    const username = document.getElementById('signInName').value;
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;
    if (email === "" || password === "" || username === "") {
        if(email === "") document.getElementById("alarmMessage").innerHTML = "email is rquired.";
        else if(password === "") document.getElementById("alarmMessage").innerHTML = "password is rquired.";
        else document.getElementById("alarmMessage").innerHTML = "username is rquired.";
        document.getElementById("alarmMessage").style.color = 'rgb(237,73,86)';
        return;
    }
    if (!validateEmail(email)) {
        document.getElementById("alarmMessage").innerHTML = ("Please enter a valid email address.");
        document.getElementById("alarmMessage").style.color = 'rgb(237,73,86)';
        return;
    }
    if (password.length < 6) {
        document.getElementById("alarmMessage").innerHTML = "Password must be at least 6 characters long.";
        document.getElementById("alarmMessage").style.color = 'rgb(237,73,86)';
        return;
    }
    
    const userData = {
        username: username,
        email: email,
        password: password,
    };

    try {
        const response = await fetch('/auth/register', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

"Print ${JSON.stringify(recipe.title)}"

        if (response.ok) {
            const data = await response.json();
            showMessage("Sign In successful! Welcome, " + data.username + "!", "success");
        } else {
            const error = await response.json();
            showMessage("Sign In failed: " + error.message, "error");
        }
    } catch (error) {
        showMessage("An error occurred: " + error.message, "error");
    }
});

    
    // if (email && password) {
    //     localStorage.setItem('userEmail', email);
    //     localStorage.setItem('userPassword', password);

    //     document.getElementById("alarmMessage").style.color = '#13795b';
    //     document.getElementById("alarmMessage").innerHTML = "Sign In successful! Go to the Login page!";
    // }
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function showMessage(message, type) {
        const alarmMessage = document.getElementById("alarmMessage");
        if (type === "error") {
            alarmMessage.style.color = 'rgb(237,73,86)';
        } else if (type === "success") {
            alarmMessage.style.color = '#13795b';
        }
        alarmMessage.innerHTML = message;
    }
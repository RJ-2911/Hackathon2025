document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const signupBtn = document.getElementById("signupBtn");

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const signupUsernameInput = document.getElementById("signup-username");
    const signupPasswordInput = document.getElementById("signup-password");
    const signupConfirmPasswordInput = document.getElementById("signup-confirm-password");

    const errorMsg = document.getElementById("error-msg");
    const signupMsg = document.getElementById("signup-msg");
    const userSpan = document.getElementById("user");

    // Function to check login status
    function checkLoginStatus() {
        const user = localStorage.getItem("loggedUser");
        if (user) {
            if (userSpan) {
                userSpan.textContent = user;
            }
        } else {
            if (window.location.pathname.includes("homepage2.html")) {
                window.location.href = "login.html"; // Redirect to login if not logged in
            }
        }
    }

    // Handle Signup
    
        signupBtn.addEventListener("click", () => {
            console.log("GAY");
            const username = signupUsernameInput.value.trim();
            const password = signupPasswordInput.value.trim();
            const confirmPassword = signupConfirmPasswordInput.value.trim();
            let passlength = password.length;

            if (username === "" || password === "" || confirmPassword === "") {
                signupMsg.textContent = "Fields cannot be empty!";
                signupMsg.style.color = "red";
                return;
            }

            if ( passlength < 8 || passlength > 16) {
                signupMsg.textContent = "Password must be between 8-16 charachters";
                signupMsg.style.color = "red";
                return;
            }

            if (password !== confirmPassword) {
                signupMsg.textContent = "Passwords don't match!";
                signupMsg.style.color = "red";
                return;
            }

            // Get existing users from localStorage
            let users = JSON.parse(localStorage.getItem("users")) || {};

            // Check if user already exists
            if (users[username]) {
                signupMsg.textContent = "Username already taken!";
                signupMsg.style.color = "red";
                return;
            }

            // Store new user credentials
            users[username] = password;
            localStorage.setItem("users", JSON.stringify(users));

            signupMsg.textContent = "Signup successful! Redirecting to login...";
            signupMsg.style.color = "green";
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        });


    // Handle login
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            let users = JSON.parse(localStorage.getItem("users")) || {};

            if (users[username] && users[username] === password) {
                localStorage.setItem("loggedUser", username);
                window.location.href = "homepage2.html";
            } else {
                errorMsg.textContent = "Invalid Username or Password!";
                errorMsg.style.color = "red";
            }
        });
    }

    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("loggedUser");
            window.location.href = "login.html"; // Redirect to login
        });
    }

    // Check login status on each page load
    checkLoginStatus();
});

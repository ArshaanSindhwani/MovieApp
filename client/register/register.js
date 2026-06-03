console.log('register.js is connected');


const registerForm = document.getElementById('register-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const usernameInput = document.getElementById('username');
const loginBtn = document.getElementById('login-btn');
const message = document.getElementById('message');

const userData = {
    email: '',
    password: '',
    username: ''
};

registerForm.addEventListener('submit', handleRegister);
loginBtn.addEventListener('click', goToLoginPage);

function handleRegister(event) {
    event.preventDefault();

    userData.email = emailInput.value.trim();
    userData.password = passwordInput.value.trim();
    userData.username = usernameInput.value.trim();

    if (!userData.email) {
        showMessage('Please enter your email.');
        emailInput.focus();
        return;
    }
    if (!userData.password) {
        showMessage('Please enter your password.');
        passwordInput.focus();
        return;
    }
    if (!userData.username) {
        showMessage('Please enter your username.');
        usernameInput.focus();
        return;
    }

    console.log('Register details:', userData);
    showMessage('Register details captured successfully.');
    registerForm.reset();
}

function showMessage(text) {
    message.textContent = text;
}

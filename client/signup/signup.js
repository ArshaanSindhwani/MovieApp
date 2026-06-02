const signupForm = document.getElementById('signup-form');
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

signupForm.addEventListener('submit', handleSignup);
loginBtn.addEventListener('click', goToLoginPage);

function handleSignup(event) {
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

    console.log('Signup details:', userData);
    showMessage('Sign up details captured successfully.');
    signupForm.reset();
}

function showMessage(text) {
    message.textContent = text;
}

function goToLoginPage() {
    window.location.href = '../index.html';
}

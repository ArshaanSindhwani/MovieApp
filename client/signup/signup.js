const signupForm = document.getElementById('signup-form');
const loginBtn = document.getElementById('login-btn');
const message = document.getElementById('message');

signupForm.addEventListener('submit', handleSignup);
loginBtn.addEventListener('click', goToLoginPage);

function handleSignup(event) {
    event.preventDefault();
    showMessage('Sign up button clicked.');
}

function showMessage(text) {
    message.textContent = text;
}

function gotToLoginPage() {
    window.location.href = '../index.html';
}

console.log("register.js is connected");

const registerForm = document.getElementById("register-form");
const passwordInput = document.getElementById("password");
const usernameInput = document.getElementById("username");
const loginBtn = document.getElementById("login-btn");
const message = document.getElementById("message");

registerForm.addEventListener("submit", handleRegister);
loginBtn.addEventListener("click", goToLoginPage);

async function handleRegister(event) {
  event.preventDefault();

  const password = passwordInput.value.trim();
  const username = usernameInput.value.trim();

  if (!username) {
    showMessage("Please enter your username.");
    usernameInput.focus();
    return;
  }

  if (!password) {
    showMessage("Please enter your password.");
    passwordInput.focus();
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      showMessage(data.error);
      return;
    }

    console.log("Register response:", data);
    showMessage("Account created successfully.");
    registerForm.reset();
    // applyTranslations()
  } catch (error) {
    console.log(error);
    showMessage("Could not connect to server.");
  }
}

function showMessage(text) {
  message.textContent = text;
}

function goToLoginPage() {
  window.location.href = "../login/login.html";
}

// NOTE:
// Verify the API URL in response variable matches the target environment (local, staging, production).
// Users log in using an email address, however the backend currently expects this value in a field named `username`. 
// Confirm we are happy with this

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("email"),  // Notice it will reference username in backend, but accepts email in frontend
            password: form.get("password")
        })
    }

    const response = await fetch("http://localhost:3000/users/login", options); // Link to be editied to match backend
    const data = await response.json();

    if (response.status == 200) {
        localStorage.setItem("token", data.token);
        window.location.assign("../homepage/home.html"); 
      } else {
        alert(data.error);
      }
})
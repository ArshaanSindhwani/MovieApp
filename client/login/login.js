// TODO:
// Verify the API URL matches the target environment (local, staging, production).
// Ensure `email` is used consistently throughout the application
// (frontend forms, API requests, backend routes, database schema and queries).
// If the backend/database uses `username` instead, update all layers to use a
// single naming convention.

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
            email: form.get("email"),
            password: form.get("password")
        })
    }

    const response = await fetch("http://localhost:3000/users/login", options);
    const data = await response.json();

    if (response.status == 200) {
        localStorage.setItem("token", data.token);
        window.location.assign("../homepage/home.html"); 
      } else {
        alert(data.error);
      }
})
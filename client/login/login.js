const langSelect = document.getElementById("lang-select")
langSelect.value = localStorage.getItem("lang") || "en"

langSelect.addEventListener("change", () => {
    localStorage.setItem("lang", langSelect.value);
    applyTranslations();
});


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
            username: form.get("username"),
            password: form.get("password")
        })
    }

    const response = await fetch("http://localhost:3000/auth/login", options);
    const data = await response.json();

    if (response.status == 200) {
        localStorage.setItem("token", data.token); // Delete if backend hasm't been coded for token
        window.location.assign("../homepage/home.html");  // Ensure file path is correct for homepage
      } else {
        alert(data.error);
      }
})
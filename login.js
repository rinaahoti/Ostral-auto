// js/login.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorMsg = document.getElementById("loginError");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const user = form.username.value.trim();
    const pass = form.password.value.trim();

    if (user === "admin" && pass === "12345") {
      localStorage.setItem("loggedIn", "true");
      window.location.href = "dashboard.html";
    } else {
      errorMsg.textContent = "Incorrect username or password.";
    }
  });
});

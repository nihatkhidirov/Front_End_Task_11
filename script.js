document.addEventListener("DOMContentLoaded", function () {
  let user = {
    username: "user123",
    password: "pass123",
    isLogin: false,
  };

  if (!localStorage.getItem("dbUser")) {
    localStorage.setItem("dbUser", JSON.stringify(user));
  } else {
    user = JSON.parse(localStorage.getItem("dbUser"));
  }

  if (user.isLogin) {
    showWelcomeMessage();
  } else {
    showLoginForm();
  }
});

function showLoginForm() {
  document.getElementById("login-form").classList.remove("hidden");
  document.getElementById("welcome-message").classList.add("hidden");
}

function showWelcomeMessage() {
  document.getElementById("login-form").classList.add("hidden");
  document.getElementById("welcome-message").classList.remove("hidden");
}

function login() {
  const usernameInput = document.getElementById("username").value;
  const passwordInput = document.getElementById("password").value;
  const rememberMe = document.getElementById("remember-me").checked;

  const user = JSON.parse(localStorage.getItem("dbUser"));

  if (usernameInput === user.username && passwordInput === user.password) {
    user.isLogin = true;
    localStorage.setItem("dbUser", JSON.stringify(user));

    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }

    showWelcomeMessage();
  } else {
    document.getElementById("error-message").classList.remove("hidden");
  }
}

function logout() {
  const user = JSON.parse(localStorage.getItem("dbUser"));
  user.isLogin = false;
  localStorage.setItem("dbUser", JSON.stringify(user));
  localStorage.removeItem("rememberMe");
  showLoginForm();
}

window.addEventListener("load", function () {
  if (localStorage.getItem("rememberMe") === "true") {
    const user = JSON.parse(localStorage.getItem("dbUser"));
    user.isLogin = true;
    localStorage.setItem("dbUser", JSON.stringify(user));
    showWelcomeMessage();
  }
});

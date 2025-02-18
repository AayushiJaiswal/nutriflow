const API_URL = "http://localhost:5000";  // Make sure this matches your backend URL

// Show Register Form
function showRegisterForm() {
  document.getElementById("register-form").style.display = "block";
  document.getElementById("login-form").style.display = "none";
}

// Show Login Form
function showLoginForm() {
  document.getElementById("register-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

// Register User
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      phone,
      password
    });

    // Success Alert using SweetAlert2
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: response.data.msg,
    });

    showLoginForm();  // Automatically switch to login form after successful registration
  } catch (error) {
    // Error Alert using SweetAlert2
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.response.data.msg || "Something went wrong!",
    });
  }
});

// Login User
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });

    // Success Alert using SweetAlert2
    Swal.fire({
      icon: 'success',
      title: 'Logged In!',
      text: "Login successful!",
    });

    // Save the token (you can save it in localStorage or cookies)
    localStorage.setItem("authToken", response.data.token);

    // Redirect to dashboard or another page after successful login
    window.location.href = "/dashboard.html";  // Replace with the actual URL
  } catch (error) {
    // Error Alert using SweetAlert2
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.response.data.msg || "Invalid credentials!",
    });
  }
});

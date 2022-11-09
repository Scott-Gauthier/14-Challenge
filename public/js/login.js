const loginFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from the login form
  const email = document.getElementById('usernameInput').value.trim();
  const password = document.getElementById('passwordInput').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      document.getElementById("error_message").textContent = `Status ${response.status}: ${data.message}`;
    }
  }
};
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#passwordInput');

togglePassword.addEventListener('click', () => {

  const type = password.getAttribute('type') === 'password' ?
    'text' : 'password';
  const icon = togglePassword.getAttribute('class') === 'fa fa-eye-slash' ?
    'fa fa-eye' : 'fa fa-eye-slash';
  password.setAttribute('type', type);
  togglePassword.setAttribute('class', icon);
});

document.querySelector('#login').addEventListener('submit', loginFormHandler);
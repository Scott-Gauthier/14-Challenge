const loginFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from the login form
  const email = document.getElementById('usernameInput').value.trim();
  const password = document.getElementById('passwordInput').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/user/new', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json();
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      document.getElementById("error_message").textContent = `Status ${response.status}: ${data.message}`;
    }
  }
};

document.querySelector('#signup').addEventListener('submit', loginFormHandler);

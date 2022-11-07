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
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert('Incorrect email or password, please try again!');
    }
  }
};

document.querySelector('#login').addEventListener('submit', loginFormHandler);
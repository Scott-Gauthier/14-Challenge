const editFormHandler = async (event) => {
    event.preventDefault();
    // Collect values from the login form
    const title = document.getElementById('titleInput').value.trim();
    const content = document.getElementById('contentInput').value.trim();
    console.log(title, content);

    if (title && content) {
      // Send a POST request to the API endpoint
      const response = await fetch('/update', {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json();
      document.location.replace('/dashboard');
    }
  };

  const deleteFormHandler = async (event) => {
    event.preventDefault();

      // Send a POST request to the API endpoint
      const response = await fetch('/edit/id', {
        method: 'DELETE',
        //body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      })
      document.location.replace('/dashboard');
    }

  
  document.getElementById('update').addEventListener('click', editFormHandler);
  document.getElementById('delete').addEventListener('click', deleteFormHandler);
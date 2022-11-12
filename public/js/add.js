const createButtonHandler = async (event) => {
    event.preventDefault();
    // Collect values from the login form
    const title = document.getElementById('titleInput').value.trim();
    const content = document.getElementById('contentInput').value.trim();
    if (!title && !content) {
        document.getElementById("error_message").textContent = `Post is missing everything.`;
    }
    else if (!title) {
        document.getElementById("error_message").textContent = `Please add a title.`;
    } else if (!content) {
        document.getElementById("error_message").textContent = `Please add content to the post.`;
    } else if (title && content) {
        // Send a POST request to the API endpoint
        const response = await fetch('/create', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        })
        console.log(response);
        if (response.status == 400) {
            document.getElementById("error_message").textContent = `Post title must be unique.`

        } else {
            console.log(`Made it here....`)
            document.location.replace('/dashboard')
        }
    };
};
document.getElementById('create').addEventListener('submit', createButtonHandler);
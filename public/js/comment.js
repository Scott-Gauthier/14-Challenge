const createButtonHandler = async (event) => {
    event.preventDefault();
    console.log('hit!');
    // Collect values from the login form
    const comment = document.getElementById('commentInput').value.trim();
    console.log();
    if (!comment) {
        document.getElementById("error_message").textContent = `Please add a comment.`;
    } else {
        // Send a POST request to the API endpoint
        const response = await fetch('/comment_create', {
            method: 'POST',
            body: JSON.stringify({ comment, id: window.location.pathname.split("/").pop(), }),
            headers: { 'Content-Type': 'application/json' },
        })
        console.log(response);
        document.location.reload();
    };
};
document.getElementById('comment').addEventListener('submit', createButtonHandler);
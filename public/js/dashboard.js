const addButtonHandler = (event) => {
    event.preventDefault();
    document.location.replace('/add');
};

document.getElementById('add').addEventListener('click', addButtonHandler);
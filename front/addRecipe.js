document.getElementById('add-recipe-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;
    const status = document.getElementById('status').value;
    const authorid = localStorage.getItem('user_id');
    alert('author:', authorid);

    const response = await fetch('http://localhost:5000/recepie/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, ingredients, instructions, authorid})
    });

    if (response.ok) {
        alert('Recipe added successfully!');
        document.getElementById('add-recipe-form').reset();
    } else {
        const errorData = await response.json();
        status.innerHTML = errorData.message;
        alert(`Failed to add recipe: ${errorData.message}`);  
    }
});
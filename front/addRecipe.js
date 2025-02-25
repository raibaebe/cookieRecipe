document.getElementById('add-recipe-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;
    const status = document.getElementById('status').value;
    const imageInput = document.getElementById('image');
    const authorid = localStorage.getItem('user_id');
    const category = document.getElementById('category').value;


    const formData = new FormData();
    formData.append('image', imageInput.files[0]); 

    // Upload the image first
    const imageUploadResponse = await fetch('/recepie/upload-image', {
        method: 'POST',
        body: formData
    });

    if (!imageUploadResponse.ok) {
        alert('Failed to upload image.');
        return;
    }

    const imageData = await imageUploadResponse.json(); 
    
    const response = await fetch('/recepie/add', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({ title, ingredients, instructions, author_id: authorid, category: category, imagePath: imageData.path })

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
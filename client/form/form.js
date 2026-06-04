const addMovieForm = document.getElementById('add-movie-form');
const movieNameInput = document.getElementById('movie_name');
const directorInput = document.getElementById('director');
const producerInput = document.getElementById('producer');
const notableActorsInput = document.getElementById('notable_actors');
const yearReleasedInput = document.getElementById('year_released');
const message = document.getElementById('message');
const recommendTextbox = document.getElementById("ai-reccomendation")

const token = localStorage.getItem('token');

addMovieForm.addEventListener('submit', handleAddMovie);

async function handleAddMovie(event) {
    event.preventDefault();

    const movieData = {
        film_name: movieNameInput.value.trim(),
        director: directorInput.value.trim(),
        producer: producerInput.value.trim(),
        notable_actors: notableActorsInput.value.trim(),
        year_released: Number(yearReleasedInput.value.trim())
    };

    if (!movieData.film_name) {
        showMessage('Please enter a movie title.');
        movieNameInput.focus();
        return;
    }
    if (!movieData.director) {
        showMessage('Please enter a director.');
        directorInput.focus();
        return;
    }
    if (!movieData.producer) {
        showMessage('Please enter a producer.');
        producerInput.focus();
        return;
    }
    if (!movieData.notable_actors) {
        showMessage('Please enter notable actors.');
        notableActorsInput.focus();
        return;
    }
    if (!movieData.year_released) {
        showMessage('Please enter a year.');
        yearReleasedInput.focus();
        return;
    }

    fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(movieData)
    })
    .then(function(res) {
        if (!res.ok) {
            return res.json().then(function(data) { showMessage(data.error || 'Something went wrong.'); });
        }
        return res.json().then(function() {
            showMessage('Movie added successfully!');
            addMovieForm.reset();
            generateRecommendation(movieData.film_name)
        });
    })
    .catch(function() {
        showMessage('Could not connect to server.');
    });

}

function showMessage(text) {
    message.textContent = text;
}

async function generateRecommendation(filmName) {
    recommendTextbox.textContent = "AI recommendation loading..."
    const req_body = {
        "film_name": filmName
    }
    try {
        const response = await fetch('http://127.0.0.1:5001/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,        
            },
            body: JSON.stringify(req_body)
        })
        const data = await response.json()
        addRecommendationText(data.recommendation);

    } catch (err) {
        showMessage('Something went wrong' + err)
    }
}

function addRecommendationText(recc) {
    console.log(recommendTextbox);
    recommendTextbox.textContent = recc
}

document.getElementById('home-btn').addEventListener('click', function() {
    window.location.href = '../homepage/home.html';
});
document.getElementById('my-list-btn').addEventListener('click', function() {
    window.location.href = '../my-list/my-list.html';
});
document.getElementById('form-btn').addEventListener('click', function() {
    window.location.href = '../form/form.html';
});


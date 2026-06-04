const addMovieForm = document.getElementById('add-movie-form');
const movieNameInput = document.getElementById('movie_name');
const directorInput = document.getElementById('director');
const producerInput = document.getElementById('producer');
const notableActorsInput = document.getElementById('notable_actors');
const yearReleasedInput = document.getElementById('year_released');
const userRatingInput = document.getElementById('user_rating');
const message = document.getElementById('message');

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

    const userRating = userRatingInput.value ? parseInt(userRatingInput.value) : null;

    if (userRating !== null && (userRating < 1 || userRating > 10)) {
        showMessage('Rating must be between 1 and 10.');
        userRatingInput.focus();
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
        return res.json().then(function(data) {
            if (userRating !== null) {
                return fetch('http://localhost:3000/movies/' + data.film_id + '/ratings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({ root_user_rating: userRating })
                });
            }
        });
    })
    .then(function() {
        showMessage('Movie added successfully!');
        addMovieForm.reset();
    })
    .catch(function() {
        showMessage('Could not connect to server.');
    });
}

function showMessage(text) {
    message.textContent = text;
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

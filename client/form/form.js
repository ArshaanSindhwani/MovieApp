const addMovieForm = document.getElementById('add-movie-form');
const movieNameInput = document.getElementById('movie_name');
const directorInput = document.getElementById('director');
const producerInput = document.getElementById('producer');
const notableActorsInput = document.getElementById('notable_actors');
const yearReleasedInput = document.getElementById('year_released');
const posterUrlInput = document.getElementById('poster_img_url');
const posterImg = document.getElementById('poster-img');
const posterPlaceholder = document.getElementById('poster-placeholder');
const message = document.getElementById('message');

const token = localStorage.getItem('token');

posterUrlInput.addEventListener('input', () => {
    const url = posterUrlInput.value.trim();
    if (url) {
        posterImg.src = url;
        posterImg.classList.add('visible');
        posterPlaceholder.style.display = 'none';
    } else {
        posterImg.classList.remove('visible');
        posterImg.src = '';
        posterPlaceholder.style.display = 'block';
    }
});

posterImg.addEventListener('error', () => {
    posterImg.classList.remove('visible');
    posterPlaceholder.style.display = 'block';
});

addMovieForm.addEventListener('submit', handleAddMovie);

function handleAddMovie(event) {
    event.preventDefault();

    const movieData = {
        film_name: movieNameInput.value.trim(),
        director: directorInput.value.trim(),
        producer: producerInput.value.trim(),
        notable_actors: notableActorsInput.value.trim(),
        year_released: Number(yearReleasedInput.value.trim()),
        poster_img_url: posterUrlInput.value.trim()
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
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(movieData)
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(data => { showMessage(data.error || 'Something went wrong.'); });
        }
        return res.json().then(() => {
            showMessage('Movie added successfully!');
            addMovieForm.reset();
            posterImg.classList.remove('visible');
            posterImg.src = '';
            posterPlaceholder.style.display = 'block';
        });
    })
    .catch(err => showMessage('Something went wrong.'));
}

function showMessage(text) {
    message.textContent = text;
}

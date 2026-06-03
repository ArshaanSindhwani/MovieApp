console.log('form.js connected');

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

// Live poster preview — updates as user types a URL
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

// Hide placeholder if image fails to load
posterImg.addEventListener('error', () => {
    posterImg.classList.remove('visible');
    posterPlaceholder.style.display = 'block';
});

addMovieForm.addEventListener('submit', handleAddMovie);

function handleAddMovie(event) {
    event.preventDefault();

    const movieData = {
        movie_name: movieNameInput.value.trim(),
        director: directorInput.value.trim(),
        producer: producerInput.value.trim(),
        notable_actors: notableActorsInput.value.trim(),
        year_released: yearReleasedInput.value.trim(),
        poster_img_url: posterUrlInput.value.trim()
    };

    if (!movieData.movie_name) {
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

    console.log('Movie data captured:', movieData);
    showMessage('Movie added successfully!');
    addMovieForm.reset();
    posterImg.classList.remove('visible');
    posterImg.src = '';
    posterPlaceholder.style.display = 'block';

    // TODO: connect to API when backend is ready
    // const token = localStorage.getItem('token');
    // fetch('/movies', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`
    //     },
    //     body: JSON.stringify(movieData)
    // })
    // .then(res => res.json())
    // .then(data => {
    //     showMessage('Movie added successfully!');
    //     addMovieForm.reset();
    // })
    // .catch(err => showMessage('Something went wrong.'));
}

function showMessage(text) {
    message.textContent = text;
}

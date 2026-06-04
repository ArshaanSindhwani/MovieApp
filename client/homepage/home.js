const homeBtn = document.getElementById('home-btn');
const myListBtn = document.getElementById('my-list-btn');
const formBtn = document.getElementById('form-btn');
const searchBar = document.getElementById('search-bar');
const movieListBox = document.querySelector('.movie-list-box');

homeBtn.addEventListener('click', goToHomePage);
myListBtn.addEventListener('click', goToMyListPage);
formBtn.addEventListener('click', goToFormPage);

document.addEventListener('DOMContentLoaded', getTopRatedMovies);

searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    document.querySelectorAll('.movie-card').forEach(card => {
        const title = card.querySelector('.movie-title').textContent.toLowerCase();
        card.style.display = title.includes(query) ? 'flex' : 'none';
    });
});

async function getTopRatedMovies() {
    const token = localStorage.getItem('token');

    if (!token) {
        movieListBox.innerHTML = `<p id="movie-message">Please log in to see movies.</p>`;
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/movies/top-rated', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        });

        const movies = await response.json();

        if (!response.ok) {
            movieListBox.innerHTML = `<p id="movie-message">${movies.error}</p>`;
            return;
        }

        renderMovies(movies);
    } catch (err) {
        console.error(err);
        movieListBox.innerHTML = `<p id="movie-message">Could not connect to server.</p>`;
    }
}

function renderMovies(movies) {
    movieListBox.innerHTML = '';

    if (movies.length === 0) {
        movieListBox.innerHTML = `<p id="movie-message">No movies found.</p>`;
        return;
    }

    movies.forEach((movie, index) => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${movie.poster_img_url || 'https://placehold.co/80x120'}" alt="${movie.film_name} poster">
            <div class="movie-info">
                <h2 class="movie-title">#${index + 1} ${movie.film_name}</h2>
                <p class="movie-year">Year: ${movie.year_released}</p>
                <p class="movie-director">Director: ${movie.director}</p>
                <p class="movie-rating">🌐 ${movie.external_rating}/10</p>
                <p class="movie-rating">⭐ ${movie.avg_user_rating ? movie.avg_user_rating + '/10' : 'No user ratings yet'}</p>
            </div>
        `;
        movieListBox.appendChild(card);
    });
}

function goToHomePage() {
    window.location.href = '../homepage/home.html';
}

function goToMyListPage() {
    window.location.href = '../my-list/my-list.html';
}

function goToFormPage() {
    window.location.href = '../form/form.html';
}

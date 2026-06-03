const homeBtn = document.getElementById('home-btn');
const myListBtn = document.getElementById('my-list-btn');
const formBtn = document.getElementById('form-btn');
const searchBar = document.getElementById('search-bar');
const movieMessage = document.getElementById('movie-message');
const movieListBox = document.querySelector('.movie-list-box');

const token = localStorage.getItem('token');

if (!token) {
    window.location.href = '../login/login.html';
}

homeBtn.addEventListener('click', goToHomePage);
myListBtn.addEventListener('click', goToMyListPage);
formBtn.addEventListener('click', goToFormPage);
searchBar.addEventListener('input', handleSearch);

let allMovies = [];

async function fetchMovies() {
    try {
        const response = await fetch('http://localhost:3000/movies', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '../login/login.html';
            return;
        }

        const movies = await response.json();
        allMovies = movies;
        renderMovies(movies);
    } catch (err) {
        movieMessage.textContent = 'Failed to load movies.';
    }
}

function renderMovies(movies) {
    movieListBox.innerHTML = '';

    if (movies.length === 0) {
        movieListBox.innerHTML = '<p id="movie-message">No movies found.</p>';
        return;
    }

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
            <h3>${movie.film_name}</h3>
            <p>${movie.director} · ${movie.year_released}</p>
            <p>TMDB: ${movie.external_rating ?? 'N/A'} | Avg Rating: ${movie.avg_user_rating ?? 'N/A'}</p>
        `;
        movieListBox.appendChild(card);
    });
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    const filtered = allMovies.filter(movie =>
        movie.film_name.toLowerCase().includes(query)
    );
    renderMovies(filtered);
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

fetchMovies();

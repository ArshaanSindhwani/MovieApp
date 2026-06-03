console.log("my-list.js is connected");

const movieList = document.querySelector("#movie-list");
// const movieCard = document.querySelector("#movie-card")
// const movieInfo = document.querySelector("#movie-info")
const homeBtn = document.querySelector("#home-btn");
const myListBtn = document.querySelector("#mylist-btn");
const formBtn = document.querySelector("#form-btn");

document.addEventListener("DOMContentLoaded", () => {

    getMovies();

    homeBtn.addEventListener("click", goToHomePage);
    myListBtn.addEventListener("click", goToMyListPage);
    formBtn.addEventListener("click", goToFormPage);

});

async function getMovies() {
  try {
    const response = await fetch("http://localhost:3000/movies");
    const movies = await response.json();

    if (!response.ok) {
      movieList.innerHTML = `<p class="movie-rating">${movies.error}</p>`;
      return;
    }
    renderMovies(movies);
    // renderMovieCard()
    // renderMovieInfo()
  } catch (err) {
    console.log(err);
    movieList.innerHTML = `<p class="movie-rating">An error occurred while fetching movies. Please try again later.</p>`;
  }
}

function renderMovies(movies) {
    
  movieList.innerHTML = "";

  if (movies.length === 0) {
    movieList.innerHTML = `<p class="movie-rating">No movies found.</p>`;
    return;
  }
  
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";

    movieCard.innerHTML = `
        <img
            src="${movie.poster_img_url || "https://placehold.co/80x120"}"
            alt="${movie.flim_name} poster"
        >

        <div class="movie-info">
            <h2 class="movie-title">${movie.flim_name}</h2>
            <p class="movie-year">Year: ${formatYear(movie.year_released)}</p>
            <p class="movie-director">Director: ${movie.directors}</p>
            <p class="movie-actors">Actors: ${movie.notable_actors}</p>
            <p class="movie-rating">External Rating: ${movie.external_rating}/10</p>
            <p class="movie-rating">Average User Rating: ${movie.avg_user_rating || "No ratings yet"}</p>
        </div>

    `;

    movieList.appendChild(movieCard)
  });  
}

function formatYear(yearReleased) {
  if (!yearReleased) {
    return "Unknown";
  }
  return yearReleased.toString().slice(0, 4);
}

function goToHomePage() {
    window.location.href = "../homepage/home.html"
}

function goToMyListPage() {
    window.location.href = "../my-list/my-list.html"
}

function goToFormPage() {
    window.location.href = "../form/form.html"
}
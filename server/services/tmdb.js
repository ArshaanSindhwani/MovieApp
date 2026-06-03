const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

async function searchMovieByTitle(title) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?query=${encodeURIComponent(title)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Unable to fetch movie from TMDB.");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return null;
    }

    const movie = data.results[0];

    return {
      film_name: movie.title,
      year_released: movie.release_date ? movie.release_date.slice(0, 4) : null,
      external_rating: Math.round(movie.vote_average),
      poster_img_url: movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : "",
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  searchMovieByTitle,
};

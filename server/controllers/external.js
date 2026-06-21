const Movie = require("../models/Movie");

async function refreshExternalRating(req, res) {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Film not found" });

    let tmdbData;
    try {
      const tmdbRes = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie.film_name)}&api_key=${process.env.TMDB_API_KEY}`
      );
      tmdbData = await tmdbRes.json();
    } catch {
      return res.status(502).json({ error: "Unable to reach TMDB" });
    }

    if (!tmdbData.results || tmdbData.results.length === 0) {
      return res.status(404).json({ error: "Film not found on TMDB" });
    }

    const tmdbMovie = tmdbData.results[0];
    const tmdbRating = tmdbMovie.vote_average;
    if (tmdbRating == null) {
      return res.status(502).json({ error: "No rating available on TMDB" });
    }

    const posterUrl = tmdbMovie.poster_path
      ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}`
      : movie.poster_img_url;

    const updated = await Movie.updateExternalRating(req.params.id, tmdbRating, posterUrl);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { refreshExternalRating };

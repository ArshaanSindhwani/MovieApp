const Movie = require("../models/Movie");

async function getMovies(req, res) {
  try {
    const movies = await Movie.getAll();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getTopRated(req, res) {
    try {
        const movies = await Movie.getTopRated();

        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}

async function addMovie(req, res) {
  try {
    const { film_name, producer, director, notable_actors, year_released } = req.body;

    if (!film_name || !producer || !director || !notable_actors || !year_released) {
      return res.status(400).json({ error: "Missing required movie fields" });
    }

    const movie = await Movie.create({
      film_name, producer, director, notable_actors, year_released,
      poster_img_url: ""
    }, req.user.user_id);

    try {
      const tmdbRes = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(film_name)}&api_key=${process.env.TMDB_API_KEY}`
      );
      const tmdbData = await tmdbRes.json();

      if (tmdbData.results && tmdbData.results.length > 0) {
        const tmdbMovie = tmdbData.results[0];
        const posterUrl = tmdbMovie.poster_path
          ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}`
          : "";
        const externalRating = tmdbMovie.vote_average || 0;
        const updated = await Movie.updateExternalRating(movie.film_id, externalRating, posterUrl);
        return res.status(201).json(updated);
      }
    } catch {
      // TMDB failed — return the movie without poster/rating
    }

    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getMovieById(req, res) {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Film not found" });
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function refreshRating(req, res) {
    try {
        const { id } = req.params;
        const { external_rating } = req.body;

        if (external_rating === undefined) {
            return res.status(400).json({
                error: "External rating is required"
            });
        }

        const movie = await Movie.updateExternalRating(id, external_rating);

        if (!movie) {
            return res.status(404).json({
                error: "Movie not found"
            });
        }

        res.status(200).json({
            message: "Rating refreshed successfully",
            movie
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}

async function deleteMovie(req, res) {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Film not found" });

    if (movie.added_by !== req.user.user_id) {
      return res.status(403).json({ error: "You can only delete films you added" });
    }

    await Movie.deleteById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getMovies, getTopRated, addMovie, getMovieById, refreshRating, deleteMovie };

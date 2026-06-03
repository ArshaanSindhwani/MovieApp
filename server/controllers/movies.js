const Movie = require("../models/Movie");

async function getMovies(req, res) {
  try {
    const movies = await Movie.getAll();

    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function addMovie(req, res) {
  try {
    const {
      film_name,
      producer,
      director,
      notable_actors,
      year_released,
      poster_img_url,
    } = req.body;

    if (
      !film_name ||
      !producer ||
      !director ||
      !notable_actors ||
      !year_released
    ) {
      return res.status(400).json({
        error: "Missing required movie fields",
      });
    }

    const movie = await Movie.create({
      film_name,
      producer,
      director,
      notable_actors,
      year_released,
      poster_img_url: poster_img_url || "",
    });

    res.status(201).json({
      message: "Movie added successfully",
      movie,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function getMovieById(req, res) {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({
        error: "Movie not found",
      });
    }

    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function refreshRating(req, res) {
  try {
    const { id } = req.params;
    const { external_rating } = req.body;

    if (external_rating === undefined) {
      return res.status(400).json({
        error: "External rating is required",
      });
    }

    const movie = await Movie.updateExternalRating(id, external_rating);

    if (!movie) {
      return res.status(404).json({
        error: "Movie not found",
      });
    }

    res.status(200).json({
      message: "Rating refreshed successfully",
      movie,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function deleteMovie(req, res) {
  try {
    const { id } = req.params;

    const movie = await Movie.deleteById(id);

    if (!movie) {
      return res.status(404).json({
        error: "Movie not found",
      });
    }

    res.status(200).json({
      message: "Movie deleted successfully",
      movie,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

module.exports = {
  getMovies,
  addMovie,
  getMovieById,
  refreshRating,
  deleteMovie,
};

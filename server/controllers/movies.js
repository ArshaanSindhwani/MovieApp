const Movie = require("../models/Movie");

async function getMovies(req, res) {
  try {
    const movies = await Movie.getAll();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function addMovie(req, res) {
  try {
    const { film_name, producer, director, notable_actors, year_released, poster_img_url } = req.body;

    if (!film_name || !producer || !director || !notable_actors || !year_released) {
      return res.status(400).json({ error: "Missing required movie fields" });
    }

    const movie = await Movie.create({
      film_name, producer, director, notable_actors, year_released,
      poster_img_url: poster_img_url || ""
    }, req.user.user_id);

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

module.exports = { getMovies, addMovie, getMovieById, deleteMovie };

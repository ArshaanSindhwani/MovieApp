const Rating = require("../models/Rating");

async function addRating(req, res) {
  try {
    const { film_id, root_user_rating } = req.body;
    const user_id = req.user.user_id;

    if (!film_id || root_user_rating === undefined) {
      return res.status(400).json({
        error: "Film ID and rating are required",
      });
    }

    if (root_user_rating < 1 || root_user_rating > 10) {
      return res.status(400).json({
        error: "Rating must be between 1 and 10",
      });
    }

    const rating = await Rating.create(user_id, film_id, root_user_rating);

    res.status(201).json({
      message: "Rating added successfully",
      rating,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function updateRating(req, res) {
  try {
    const { film_id } = req.params;
    const { root_user_rating } = req.body;
    const user_id = req.user.user_id;

    if (root_user_rating === undefined) {
      return res.status(400).json({
        error: "Rating is required",
      });
    }

    if (root_user_rating < 1 || root_user_rating > 10) {
      return res.status(400).json({
        error: "Rating must be between 1 and 10",
      });
    }

    const rating = await Rating.updateRating(
      user_id,
      film_id,
      root_user_rating,
    );

    if (!rating) {
      return res.status(404).json({
        error: "Rating not found",
      });
    }

    res.status(200).json({
      message: "Rating updated successfully",
      rating,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function getRatingsForMovie(req, res) {
  try {
    const { film_id } = req.params;

    const ratings = await Rating.findByFilm(film_id);

    res.status(200).json(ratings);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

module.exports = {
  addRating,
  updateRating,
  getRatingsForMovie,
};

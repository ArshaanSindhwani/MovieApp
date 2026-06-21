const Rating = require("../models/Rating");

async function addRating(req, res) {
  try {
    const film_id = req.params.film_id;
    const { root_user_rating } = req.body;
    const user_id = req.user.user_id;

    if (root_user_rating === undefined || root_user_rating === null) {
      return res.status(400).json({ error: "Rating is required" });
    }

    if (typeof root_user_rating !== 'number' || root_user_rating < 1 || root_user_rating > 10) {
      return res.status(400).json({ error: "Rating must be a number between 1 and 10" });
    }

    const rating = await Rating.create(user_id, film_id, root_user_rating);
    res.status(201).json(rating);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: "You have already rated this film" });
    }
    res.status(500).json({ error: err.message });
  }
}

async function updateRating(req, res) {
  try {
    const film_id = req.params.film_id;
    const { root_user_rating } = req.body;
    const user_id = req.user.user_id;

    if (root_user_rating === undefined || root_user_rating === null) {
      return res.status(400).json({ error: "Rating is required" });
    }

    if (typeof root_user_rating !== 'number' || root_user_rating < 1 || root_user_rating > 10) {
      return res.status(400).json({ error: "Rating must be a number between 1 and 10" });
    }

    const rating = await Rating.updateRating(user_id, film_id, root_user_rating);
    if (!rating) return res.status(404).json({ error: "Rating not found" });
    res.status(200).json(rating);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getRatingsForMovie(req, res) {
  try {
    const ratings = await Rating.findByFilm(req.params.film_id);
    res.status(200).json(ratings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { addRating, updateRating, getRatingsForMovie };

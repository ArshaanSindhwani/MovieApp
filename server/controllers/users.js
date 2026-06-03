const Rating = require("../models/Rating");

async function getMyFilms(req, res) {
  try {
    const films = await Rating.findByUser(req.user.user_id);
    res.status(200).json(films);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getMyFilms };

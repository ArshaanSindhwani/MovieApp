const Movie = require("../models/Movie");

async function refreshExternalRating(req, res) {
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
      message: "External rating refreshed successfully",
      movie,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

module.exports = {
  refreshExternalRating,
};

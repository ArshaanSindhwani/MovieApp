const express = require("express");

const moviesController = require("../controllers/movies");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", moviesController.getMovies);
router.post("/", auth, moviesController.addMovie);
router.get("/:id", moviesController.getMovieById);
router.patch("/:id/refresh-rating", auth, moviesController.refreshRating);
router.delete("/:id", auth, moviesController.deleteMovie);

module.exports = router;

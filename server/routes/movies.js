const { Router } = require('express');
const moviesController = require('../controllers/movies');
const auth = require('../middleware/auth');

const moviesRouter = Router();

moviesRouter.get("/", auth, moviesController.getMovies);
moviesRouter.post("/", auth, moviesController.addMovie);
moviesRouter.get("/:id", auth, moviesController.getMovieById);
moviesRouter.delete("/:id", auth, moviesController.deleteMovie);

module.exports = moviesRouter;

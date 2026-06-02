const { Router } = require('express');

const moviesController = require('../controllers/movies.js');

const moviesRouter = Router();

moviesRouter.get("/", moviesController.getMovies);
moviesRouter.get("/:id", moviesController.getMovieById);
moviesRouter.post("/", moviesController.addMovie);
moviesRouter.delete("/:id", moviesController.deleteMovie);


module.exports = moviesRouter;
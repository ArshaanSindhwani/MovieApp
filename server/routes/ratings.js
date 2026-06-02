const { Router } = require('express');

const ratingsController = require('../controllers/ratings.js');

const ratingsRouter = Router();

ratingsRouter.get("/:id", ratingsController.getRatingsForMovie);
ratingsRouter.post("/:id", ratingsController.addRating);
ratingsRouter.patch("/:id", ratingsController.updateRating);


module.exports = ratingsRouter;
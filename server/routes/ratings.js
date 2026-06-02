const { Router } = require('express');
const ratingsController = require('../controllers/ratings');
const auth = require('../middleware/auth');

const ratingsRouter = Router();

ratingsRouter.get("/:film_id/ratings", auth, ratingsController.getRatingsForMovie);
ratingsRouter.post("/:film_id/ratings", auth, ratingsController.addRating);
ratingsRouter.patch("/:film_id/ratings", auth, ratingsController.updateRating);

module.exports = ratingsRouter;

const express = require("express");

const ratingsController = require("../controllers/ratings");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/ratings", auth, ratingsController.addRating);
router.patch("/ratings/:film_id", auth, ratingsController.updateRating);
router.get("/ratings/:film_id", ratingsController.getRatingsForMovie);

module.exports = router;

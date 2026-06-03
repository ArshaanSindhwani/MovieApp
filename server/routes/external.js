const express = require("express");

const externalController = require("../controllers/external");
const auth = require("../middleware/auth");

const router = express.Router();

router.patch("/external/:id", auth, externalController.refreshExternalRating);

module.exports = router;

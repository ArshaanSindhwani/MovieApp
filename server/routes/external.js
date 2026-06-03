const { Router } = require('express');
const externalController = require('../controllers/external');
const auth = require('../middleware/auth');

const externalRouter = Router();

externalRouter.post("/:id/refresh", auth, externalController.refreshExternalRating);

module.exports = externalRouter;

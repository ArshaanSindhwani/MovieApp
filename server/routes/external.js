const { Router } = require('express');

const externalController = require('../controllers/external.js');

const externalRouter = Router();

externalRouter.post("/refresh", externalController.refreshExternalRating);

module.exports = externalRouter;
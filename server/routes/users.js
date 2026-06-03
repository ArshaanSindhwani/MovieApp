const { Router } = require('express');
const usersController = require('../controllers/users');
const auth = require('../middleware/auth');

const usersRouter = Router();

usersRouter.get("/me/films", auth, usersController.getMyFilms);

module.exports = usersRouter;

const { Router } = require('express');
const authController = require('../controllers/auth.js');
const auth = require('../middleware/auth');

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/me", auth, authController.getMe);

module.exports = authRouter;

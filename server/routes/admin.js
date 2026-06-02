const { Router } = require('express');
const adminController = require('../controllers/admin');
const auth = require('../middleware/auth');

const adminRouter = Router();

adminRouter.get("/users", auth, adminController.listUsers);
adminRouter.delete("/users/:id", auth, adminController.deleteUser);
adminRouter.delete("/movies/:id", auth, adminController.adminDeleteMovie);

module.exports = adminRouter;

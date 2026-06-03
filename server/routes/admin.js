const { Router } = require('express');
const adminController = require('../controllers/admin');
const adminAuth = require('../middleware/adminAuth');

const adminRouter = Router();

adminRouter.get("/users", adminAuth, adminController.listUsers);
adminRouter.delete("/users/:id", adminAuth, adminController.deleteUser);
adminRouter.delete("/movies/:id", adminAuth, adminController.adminDeleteMovie);

module.exports = adminRouter;

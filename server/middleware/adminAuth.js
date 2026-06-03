const auth = require('./auth');

function adminAuth(req, res, next) {
  auth(req, res, () => {
    if (!req.user.is_admin) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  });
}

module.exports = adminAuth;

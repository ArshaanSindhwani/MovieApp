const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        res.status(403).json({ error: 'Invalid token' });
      } else {
        req.user = data;
        next();
      }
    });
  } else {
    res.status(403).json({ error: 'Missing token' });
  }
}

module.exports = auth;

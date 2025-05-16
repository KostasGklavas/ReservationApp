const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send({ error: "No token provided" });
  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, jwtSecret);
    next();
  } catch {
    res.status(401).send({ error: "Invalid token" });
  }
}

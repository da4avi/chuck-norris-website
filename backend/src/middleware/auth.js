const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ error: "Invalid token." });
  }
}

module.exports = authMiddleware;

const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const user = require("../controller/user");

function authMiddleware(roles = []) {
  return async (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
      return res
        .status(401)
        .send({ error: "Access denied. No token provided." });
    }

    const userLogged = await user.findUser(decoded.id);
    if (!userLogged) {
      return res.status(500).json("User not found.");
    }
    if (roles.length && !roles.includes(userLogged.role)) {
      return res.status(500).json("User without permission.");
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).send({ error: "Invalid token." });
    }
  };
}

module.exports = authMiddleware;

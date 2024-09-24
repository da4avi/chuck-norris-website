const express = require("express");
const router = express.Router();
const UserApi = require("../api/user");
const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware(["viewer", "admin"]), UserApi.findUsers);
router.put("/:id", authMiddleware(["viewer", "admin"]), UserApi.updateUser);
router.delete("/:id", authMiddleware(["viewer", "admin"]), UserApi.deleteUser);
router.post("/", authMiddleware(["admin"]), UserApi.createAdmin);
router.post("/", UserApi.createUser);
router.post("/login", UserApi.login);

module.exports = router;

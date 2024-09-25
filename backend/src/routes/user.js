const express = require("express");
const router = express.Router();
const UserApi = require("../api/user");
const authMiddleware = require("../middleware/auth");

router.post("/register", UserApi.createUser);
router.post("/login", UserApi.login);

router.put("/", authMiddleware(), UserApi.updateUser);
router.get("/info", authMiddleware(), UserApi.findUserById);
router.delete("/", authMiddleware(), UserApi.deleteUser);

router.get("/", authMiddleware(["admin"]), UserApi.findUsers);
router.put("/:id", authMiddleware(["admin"]), UserApi.updateUser);
router.delete("/:id", authMiddleware(["admin"]), UserApi.deleteUser);
router.post("/admin", authMiddleware(["admin"]), UserApi.createAdmin);

module.exports = router;

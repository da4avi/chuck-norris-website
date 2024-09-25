const express = require("express");
const router = express.Router();
const UserApi = require("../api/user");
const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware(["admin"]), UserApi.findUsers);
router.delete("/", authMiddleware(), UserApi.deleteUser);
router.put("/", authMiddleware(), UserApi.updateUser);
router.post("/", UserApi.createUser);
router.post("/login", UserApi.login);
router.put("/:id", authMiddleware(["viewer", "admin"]), UserApi.updateUser);
router.delete("/:id", authMiddleware(["admin"]), UserApi.deleteUser);
router.post("/admin", authMiddleware(["admin"]), UserApi.createAdmin);

module.exports = router;

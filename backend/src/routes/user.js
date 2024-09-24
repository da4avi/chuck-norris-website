const express = require("express");
const router = express.Router();
const UserApi = require("../api/user");
const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, UserApi.findUsers);
router.put("/:id", authMiddleware, UserApi.updateUser);
router.delete("/:id", authMiddleware, UserApi.deleteUser);

router.post("/", UserApi.createUser);
router.post("/login", UserApi.login);

module.exports = router;

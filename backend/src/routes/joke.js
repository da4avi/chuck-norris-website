const express = require("express");
const router = express.Router();
const JokeApi = require("../api/joke");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware(), JokeApi.createJoke);
router.get("/random", JokeApi.getRandomJoke);
router.get(
  "/random/:category",
  authMiddleware(),
  JokeApi.getRandomJokeByCategory
);
router.put("/:id", authMiddleware(), JokeApi.updateJoke);
router.get("/:id", authMiddleware(), JokeApi.findJokeById);
router.delete("/:id", authMiddleware(), JokeApi.deleteJoke);
router.get("/", authMiddleware(), JokeApi.findJokes);

module.exports = router;

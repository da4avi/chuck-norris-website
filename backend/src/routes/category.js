const express = require("express");
const router = express.Router();
const CategoryApi = require("../api/category");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware(["admin"]), CategoryApi.createCategory);
router.put("/:id", authMiddleware(["admin"]), CategoryApi.updateCategory);
router.get("/", authMiddleware(), CategoryApi.findAll);
router.get("/:id", authMiddleware(), CategoryApi.findCategoryById);
router.get("/", authMiddleware(), CategoryApi.findAll);
router.delete("/:id", authMiddleware(["admin"]), CategoryApi.deleteCategory);

module.exports = router;

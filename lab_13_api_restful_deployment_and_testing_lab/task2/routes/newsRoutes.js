const express = require("express");
const router = express.Router();
const { getNewsByCountry } = require("../controllers/newsController");

// GET /api/news/:country
router.get("/:country", getNewsByCountry);

module.exports = router;
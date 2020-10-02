const router = require("express").Router();
const path = require("path");

router.get("/Exercise", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/Exercise.html"));
});

router.get("/stats", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/stats.html"));
});

module.exports = router;

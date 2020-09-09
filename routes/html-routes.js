const router = require("express").Router();

router.get("/exercise", (req, res) => {
    res.redirect("/exercise.html");
});

router.get("/stats", (req, res) => {
    res.redirect("/stats.html");
});

module.exports = router;
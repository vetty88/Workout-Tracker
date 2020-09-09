const router = require("express").Router();
const Workout = require("../models/Workout.js");

// Get last workout
router.get("/api/workouts", (req, res) => {
    Workout.find({}, (err, docs) => {
        if (err) {
            console.log(err);
        }
        res.json(docs);
    });
});

// Add Exercise
router.put("/api/workouts/:id", (req, res) => {
    const id = req.params.id;

    Workout.findByIdAndUpdate(id, {
        $push: {
            exercises: req.body
        }
    }, {
        new: true
    }, (err, docs) => {
        if (err) {
            console.log(err);
        }
        res.json(docs);
    });

});

// Create workout
router.post("/api/workouts", ({
    body
}, res) => {
    Workout.create({
        day: new Date(),
        exercises: [],
    }).then((workoutData) => {
        res.json(workoutData);
    });

});

// Get all workouts in range
router.get("/api/workouts/range", (req, res) => {
    Workout.find({}, (err, docs) => {
        if (err) {
            console.log(err);
        }
        res.json(docs);
    });
});


module.exports = router;
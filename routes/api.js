const router = require("express").Router();
const Workout = require("../models/Workout.js");

router.post("/api/Workouts", (req, res) => {
  Workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/api/Workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { Exercises: body } },
    // "runValidators" will ensure new Exercises meet our schema requirements
    { new: true, runValidators: true }
  )
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/api/Workouts", (req, res) => {
  Workout.find()
    .then(dbWorkouts => {
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/api/Workouts/range", (req, res) => {
  Workout.find({}).limit(7)
    .then(dbWorkouts => {
      console.table(dbWorkouts);
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete("/api/Workouts", ({ body }, res) => {
  Workout.findByIdAndDelete(body.id)
    .then(() => {
      res.json(true);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;

let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

let workoutseed = [
  {
    day: new Date(new Date().setDate(new Date().getDate() - 10)),
    Exercises: [
      {
        type: "resistance",
        name: "Bicep Curl",
        duration: 20,
        weight: 100,
        reps: 10,
        sets: 4
      }
    ]
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 9)),
    Exercises: [
      {
        type: "resistance",
        name: "Lateral Pull",
        duration: 20,
        weight: 100,
        reps: 10,
        sets: 4
      }
    ]
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 8)),
    Exercises: [
      {
        type: "resistance",
        name: "Push Press",
        duration: 25,
        weight: 60,
        reps: 8,
        sets: 4
      }
    ]
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 7)),
    Exercises: [
      {
        type: "cardio",
        name: "Running",
        duration: 25,
        distance: 8
      }
    ]
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 6)),
    Exercises: [
      {
        type: "resistance",
        name: "Bench Press",
        duration: 20,
        weight: 120,
        reps: 10,
        sets: 4
      }
    ]
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 5)),
    Exercises: [
      {
        type: "resistance",
        name: "Bench Press",
        duration: 20,
        weight: 150,
        reps: 10,
        sets: 4
      }
    ]
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 4)),
    Exercises: [
      {
        type: "resistance",
        name: "Quad Press",
        duration: 30,
        weight: 150,
        reps: 10,
        sets: 4
      }
    ]
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 3)),
    Exercises: [
      {
        type: "resistance",
        name: "Bench Press",
        duration: 20,
        weight: 150,
        reps: 10,
        sets: 4
      }
    ]
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 2)),
    Exercises: [
      {
        type: "resistance",
        name: "Military Press",
        duration: 20,
        weight: 150,
        reps: 10,
        sets: 4
      }
    ]
  }
];

db.workout.deleteMany({})
  .then(() => db.workout.collection.insertMany(workoutseed))
  .then(data => {
    console.table(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

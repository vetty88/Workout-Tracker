const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Workoutschema = new Schema(
  {
    day: {
      type: Date,
      default: () => new Date()
    },
    Exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "Enter an Exercise type"
        },
        name: {
          type: String,
          trim: true,
          required: "Enter an Exercise name"
        },
        duration: {
          type: Number,
          required: "Enter an Exercise duration in minutes"
        },
        weight: {
          type: Number
        },
        reps: {
          type: Number
        },
        sets: {
          type: Number
        },
        distance: {
          type: Number
        }
      }
    ]
  },
  {
    toJSON: {
      // include any virtual properties when data is requested
      virtuals: true
    }
  }
);

// adds a dynamically-created property to schema
Workoutschema.virtual("totalDuration").get(function () {
  // "reduce" array of Exercises down to just the sum of their durations
  return this.Exercises.reduce((total, Exercise) => {
    return total + Exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", Workoutschema);

module.exports = Workout;

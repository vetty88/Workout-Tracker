async function initWorkout() {
  const lastWorkout = await API.getLastWorkout();
  console.log("Last Workout:", lastWorkout);
  if (lastWorkout) {
    document
      .querySelector("a[href='/Exercise?']")
      .setAttribute("href", `/Exercise?id=${lastWorkout._id}`);

    const Workoutsummary = {
      date: formatDate(lastWorkout.day),
      totalDuration: lastWorkout.totalDuration,
      numExercises: lastWorkout.Exercises.length,
      ...tallyExercises(lastWorkout.Exercises)
    };

    renderWorkoutsummary(Workoutsummary);
  } else {
    renderNoWorkoutText();
  }
}

function tallyExercises(Exercises) {
  const tallied = Exercises.reduce((acc, curr) => {
    if (curr.type === "resistance") {
      acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
      acc.totalSets = (acc.totalSets || 0) + curr.sets;
      acc.totalReps = (acc.totalReps || 0) + curr.reps;
    } else if (curr.type === "cardio") {
      acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
    }
    return acc;
  }, {});
  return tallied;
}

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return new Date(date).toLocaleDateString(options);
}

function renderWorkoutsummary(summary) {
  const container = document.querySelector(".Workout-stats");

  const WorkoutKeyMap = {
    date: "Date",
    totalDuration: "Total Workout Duration",
    numExercises: "Exercises Performed",
    totalWeight: "Total Weight Lifted",
    totalSets: "Total Sets Performed",
    totalReps: "Total Reps Performed",
    totalDistance: "Total Distance Covered"
  };

  Object.keys(summary).forEach(key => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = WorkoutKeyMap[key];
    const textNode = document.createTextNode(`: ${summary[key]}`);

    p.appendChild(strong);
    p.appendChild(textNode);

    container.appendChild(p);
  });
}

function renderNoWorkoutText() {
  const container = document.querySelector(".Workout-stats");
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "You have not created a Workout yet!";

  p.appendChild(strong);
  container.appendChild(p);
}

initWorkout();

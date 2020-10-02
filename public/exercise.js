const WorkoutTypeSelect = document.querySelector("#type");
const cardioForm = document.querySelector(".cardio-form");
const resistanceForm = document.querySelector(".resistance-form");
const cardioNameInput = document.querySelector("#cardio-name");
const nameInput = document.querySelector("#name");
const weightInput = document.querySelector("#weight");
const setsInput = document.querySelector("#sets");
const repsInput = document.querySelector("#reps");
const durationInput = document.querySelector("#duration");
const resistanceDurationInput = document.querySelector("#resistance-duration");
const distanceInput = document.querySelector("#distance");
const completeButton = document.querySelector("button.complete");
const addButton = document.querySelector("button.add-another");
const toast = document.querySelector("#toast");
const newWorkout = document.querySelector(".new-Workout");

let WorkoutType = null;
let shouldNavigateAway = false;

async function initExercise() {
  let Workout;

  if (location.search.split("=")[1] === undefined) {
    Workout = await API.createWorkout();
    console.table(Workout);
  }
  if (Workout) {
    location.search = "?id=" + Workout._id;
  }

}

initExercise();

function handleWorkoutTypeChange(event) {
  WorkoutType = event.target.value;

  if (WorkoutType === "cardio") {
    cardioForm.classList.remove("d-none");
    resistanceForm.classList.add("d-none");
  } else if (WorkoutType === "resistance") {
    resistanceForm.classList.remove("d-none");
    cardioForm.classList.add("d-none");
  } else {
    cardioForm.classList.add("d-none");
    resistanceForm.classList.add("d-none");
  }

  validateInputs();
}

function validateInputs() {
  let isValid = true;

  if (WorkoutType === "resistance") {
    if (nameInput.value.trim() === "") {
      isValid = false;
    }

    if (weightInput.value.trim() === "") {
      isValid = false;
    }

    if (setsInput.value.trim() === "") {
      isValid = false;
    }

    if (repsInput.value.trim() === "") {
      isValid = false;
    }

    if (resistanceDurationInput.value.trim() === "") {
      isValid = false;
    }
  } else if (WorkoutType === "cardio") {
    if (cardioNameInput.value.trim() === "") {
      isValid = false;
    }

    if (durationInput.value.trim() === "") {
      isValid = false;
    }

    if (distanceInput.value.trim() === "") {
      isValid = false;
    }
  }

  if (isValid) {
    completeButton.removeAttribute("disabled");
    addButton.removeAttribute("disabled");
  } else {
    completeButton.setAttribute("disabled", true);
    addButton.setAttribute("disabled", true);
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();

  let WorkoutData = {};

  if (WorkoutType === "cardio") {
    WorkoutData.type = "cardio";
    WorkoutData.name = cardioNameInput.value.trim();
    WorkoutData.distance = Number(distanceInput.value.trim());
    WorkoutData.duration = Number(durationInput.value.trim());
  } else if (WorkoutType === "resistance") {
    WorkoutData.type = "resistance";
    WorkoutData.name = nameInput.value.trim();
    WorkoutData.weight = Number(weightInput.value.trim());
    WorkoutData.sets = Number(setsInput.value.trim());
    WorkoutData.reps = Number(repsInput.value.trim());
    WorkoutData.duration = Number(resistanceDurationInput.value.trim());
  }

  await API.addExercise(WorkoutData);
  clearInputs();
  toast.classList.add("success");
}

function handleToastAnimationEnd() {
  toast.removeAttribute("class");
  if (shouldNavigateAway) {
    location.href = "/";
  }
}

function clearInputs() {
  cardioNameInput.value = "";
  nameInput.value = "";
  setsInput.value = "";
  distanceInput.value = "";
  durationInput.value = "";
  repsInput.value = "";
  resistanceDurationInput.value = "";
  weightInput.value = "";
}

if (WorkoutTypeSelect) {
  WorkoutTypeSelect.addEventListener("change", handleWorkoutTypeChange);
}
if (completeButton) {
  completeButton.addEventListener("click", function (event) {
    shouldNavigateAway = true;
    handleFormSubmit(event);
  });
}
if (addButton) {
  addButton.addEventListener("click", handleFormSubmit);
}
toast.addEventListener("animationend", handleToastAnimationEnd);

document
  .querySelectorAll("input")
  .forEach(element => element.addEventListener("input", validateInputs));

const workoutTypeSelect = document.querySelector("#type");
const CardioForm = document.querySelector(".Cardio-form");
const ResistanceForm = document.querySelector(".Resistance-form");
const CardioNameInput = document.querySelector("#Cardio-name");
const nameInput = document.querySelector("#name");
const weightInput = document.querySelector("#weight");
const setsInput = document.querySelector("#sets");
const repsInput = document.querySelector("#reps");
const durationInput = document.querySelector("#duration");
const ResistanceDurationInput = document.querySelector("#Resistance-duration");
const distanceInput = document.querySelector("#distance");
const completeButton = document.querySelector("button.complete");
const addButton = document.querySelector("button.add-another");
const toast = document.querySelector("#toast");
const newWorkout = document.querySelector(".new-workout");

let workoutType = null;
let shouldNavigateAway = false;

async function initexercise() {
  let workout;

  if (location.search.split("=")[1] === undefined) {
    workout = await API.createWorkout();
    console.table(workout);
  }
  if (workout) {
    location.search = "?id=" + workout._id;
  }

}

initexercise();

function handleWorkoutTypeChange(event) {
  workoutType = event.target.value;

  if (workoutType === "Cardio") {
    CardioForm.classList.remove("d-none");
    ResistanceForm.classList.add("d-none");
  } else if (workoutType === "Resistance") {
    ResistanceForm.classList.remove("d-none");
    CardioForm.classList.add("d-none");
  } else {
    CardioForm.classList.add("d-none");
    ResistanceForm.classList.add("d-none");
  }

  validateInputs();
}

function validateInputs() {
  let isValid = true;

  if (workoutType === "Resistance") {
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

    if (ResistanceDurationInput.value.trim() === "") {
      isValid = false;
    }
  } else if (workoutType === "Cardio") {
    if (CardioNameInput.value.trim() === "") {
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

  let workoutData = {};

  if (workoutType === "Cardio") {
    workoutData.type = "Cardio";
    workoutData.name = CardioNameInput.value.trim();
    workoutData.distance = Number(distanceInput.value.trim());
    workoutData.duration = Number(durationInput.value.trim());
  } else if (workoutType === "Resistance") {
    workoutData.type = "Resistance";
    workoutData.name = nameInput.value.trim();
    workoutData.weight = Number(weightInput.value.trim());
    workoutData.sets = Number(setsInput.value.trim());
    workoutData.reps = Number(repsInput.value.trim());
    workoutData.duration = Number(ResistanceDurationInput.value.trim());
  }

  await API.addexercise(workoutData);
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
  CardioNameInput.value = "";
  nameInput.value = "";
  setsInput.value = "";
  distanceInput.value = "";
  durationInput.value = "";
  repsInput.value = "";
  ResistanceDurationInput.value = "";
  weightInput.value = "";
}

if (workoutTypeSelect) {
  workoutTypeSelect.addEventListener("change", handleWorkoutTypeChange);
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

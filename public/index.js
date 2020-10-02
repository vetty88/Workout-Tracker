init();

async function init() {
  if (location.search.split("=")[1] === undefined) {
    const Workout = await API.getLastWorkout();
    if (Workout) {
      location.search = "?id=" + Workout._id;
    } else {
      document.querySelector("#continue-btn").classList.add("d-none");
    }
  }
}


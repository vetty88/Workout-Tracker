init();

async function init() {
  if (location.search.split("=")[1] === undefined) {
    const workout = await API.getLastworkout();
    if (workout) {
      location.search = "?id=" + workout._id;
    } else {
      document.querySelector("#continue-btn").classList.add("d-none");
    }
  }
}


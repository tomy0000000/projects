import "../../node_modules/bulma-modal-fx/dist/js/modal-fx.js";
import "../scss/main.scss";

const projects = document.getElementById("projects").dataset.projects;

const stars = fetch(
  "https://api.github-star-counter.workers.dev/user/tomy0000000"
)
  .then((response) => response.json())
  .then((data) => data.stars);

const followers = fetch("https://api.github.com/users/tomy0000000")
  .then((response) => response.json())
  .then((data) => data.followers);

const since = document.getElementById("since").dataset.since;

Promise.all([projects, stars, followers, since]).then((values) => {
  document.getElementById("projects").innerHTML = values[0] ? values[0] : "-";
  document.getElementById("stars").innerHTML = values[1] ? values[1] : "-";
  document.getElementById("followers").innerHTML = values[2] ? values[2] : "-";
  document.getElementById("since").innerHTML = values[3] ? values[3] : "-";
});

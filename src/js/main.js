import Swiper, { Navigation, Pagination } from "swiper";
import "../scss/main.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "bulma-modal-fx/dist/css/modal-fx.css";

const elements = {
  target: "target",
  active: "is-active",
  button: ".modal-button",
  close: ".delete",
  buttonClose: ".modal-button-close",
  background: ".modal-background",
};

// Freeze scrollbars
const freeze = function () {
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflowY = "scroll";
};

const unFreeze = function () {
  document.documentElement.style.overflow = "";
  document.body.style.overflowY = "";
};

const openModal = function () {
  const modal = this.dataset[elements.target];
  const url = new URL(window.location);
  url.pathname = `/projects/${this.dataset.project}/`;
  window.history.pushState({}, "", url);
  document.getElementById(modal).classList.add(elements.active);
  freeze();
};

const closeModal = function () {
  this.closest(".modal").classList.remove(elements.active);
  const url = new URL(window.location);
  url.pathname = "/";
  window.history.pushState({}, "", url);
  unFreeze();
};

const closeAll = function () {
  const openModal = document.querySelectorAll(`.modal.${elements.active}`);
  openModal.forEach(function (modal) {
    modal.classList.remove(elements.active);
  });
  unFreeze();
};

const onClickEach = function (selector, callback) {
  document.querySelectorAll(selector).forEach((element) => {
    element.addEventListener("click", callback);
  });
};

// Open modal on button click
onClickEach(elements.button, openModal);
onClickEach(elements.close, closeModal);
onClickEach(elements.background, closeModal);
onClickEach(elements.buttonClose, closeAll);

// Close all modals if ESC key is pressed
document.addEventListener("keyup", function (event) {
  if (event.key === "Escape") {
    closeAll();
  }
});

// Open modal if project is specified in URL
const rawSearch = window.location.search.substring(1);
const activeProject = new URLSearchParams(rawSearch).get("project");
if (activeProject) {
  // Remove project param from URL
  const url = new URL(window.location);
  url.searchParams.delete("project");
  window.history.replaceState({}, "", url);

  const projectModal = document.querySelector(
    `a[data-target=modal-${activeProject.trim()}]`
  );
  if (projectModal) {
    projectModal.click();
  }
}

// Fetch stats from API
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

// Update stats
Promise.all([projects, stars, followers, since]).then((values) => {
  document.getElementById("projects").innerHTML = values[0] ? values[0] : "-";
  document.getElementById("stars").innerHTML = values[1] ? values[1] : "-";
  document.getElementById("followers").innerHTML = values[2] ? values[2] : "-";
  document.getElementById("since").innerHTML = values[3] ? values[3] : "-";
});

const swiper = new Swiper(".swiper", {
  modules: [Navigation, Pagination],
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

import modal from "./modules/modal";
import sliders from "./modules/sliders";

window.addEventListener("DOMContentLoaded", () => {
  modal();
  sliders(
    ".feedback-slider-item",
    "horizontal",
    ".main-prev-btn",
    ".main-next-btn"
  );
  sliders(".main-slider-item");
});

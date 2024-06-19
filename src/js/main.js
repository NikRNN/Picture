import modal from "./modules/modal";
import sliders from "./modules/sliders";
import forms from "./modules/forms";

window.addEventListener("DOMContentLoaded", () => {
  modal();
  sliders(
    ".feedback-slider-item",
    "horizontal",
    ".main-prev-btn",
    ".main-next-btn"
  );
  sliders(".main-slider-item");
  forms();
});

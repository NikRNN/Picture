import modal from "./modules/modal";
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import mask from "./modules/mask";
import checkLanguageInput from "./modules/checkLanguageInput";
import showMoreStyles from "./modules/showMoreStyles";

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
  mask('[name = "phone"]');
  checkLanguageInput('[name="name"]');
  checkLanguageInput('[name="message"]');
  showMoreStyles(".button-styles", "#styles .row");
});

import modal from "./modules/modal";
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import mask from "./modules/mask";
import checkLanguageInput from "./modules/checkLanguageInput";
import showMoreStyles from "./modules/showMoreStyles";
import calc from "./modules/calc";

window.addEventListener("DOMContentLoaded", () => {
  const pictureInfo = {};

  modal();
  sliders(
    ".feedback-slider-item",
    "horizontal",
    ".main-prev-btn",
    ".main-next-btn"
  );
  sliders(".main-slider-item");
  forms(pictureInfo);
  mask('[name = "phone"]');
  checkLanguageInput('[name="name"]');
  checkLanguageInput('[name="message"]');
  showMoreStyles(".button-styles", "#styles .row");
  calc(
    "#size",
    "#material",
    "#options",
    ".promocode",
    ".calc-price",
    pictureInfo
  );
});

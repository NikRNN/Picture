import { getData } from "../services/request";

const showMoreStyles = (trigger, selector) => {
  const triggerBtn = document.querySelector(trigger),
    wrapper = document.querySelector(selector);

  triggerBtn.addEventListener("click", function () {
    getData("assets/db.json").then((res) => loadCards(res.styles));

    this.remove();
  });

  function loadCards(cards) {
    cards.forEach((item) => {
      let card = document.createElement("div");
      card.classList.add(
        "animate__animated",
        "animate__fadeInUp",
        "col-sm-3",
        "col-sm-offset-0",
        "col-xs-10",
        "col-xs-offset-1"
      );

      let { src, title, link } = item;

      card.innerHTML = `
            		<div class='styles-block'>
						<img src=${src} alt></img>
						<h4>${title}</h4>
						<a href=${link}>Подробнее</a>
					</div>`;

      wrapper.append(card);
    });
  }
  // elements = document.querySelectorAll(selector);

  //простой вариант показа доп элементов без подзагрузки с сервера (не забудь для этого раскомментировать верстку с карточками и изменить параметры в вызове showMoreStyles: вместо wrapper вернуть стиль карточек)
  // triggerBtn.addEventListener("click", () => {
  //   elements.forEach((item) => {
  //     item.classList.add("animate__animated", "animate__fadeInUp");

  //     item.classList.remove("hidden-lg", "hidden-md", "hidden-sm", "hidden-xs");

  //     item.classList.add(
  //       "col-sm-3",
  //       "col-sm-offset-0",
  //       "col-xs-10",
  //       "col-xs-offset-1"
  //     );
  //   });

  //   triggerBtn.style.display = "none";
  // });
};

export default showMoreStyles;

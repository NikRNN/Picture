import { postData } from "../services/request";

const forms = () => {
  const form = document.querySelectorAll("form"),
    inputs = document.querySelectorAll("input"),
    comments = document.querySelectorAll("textarea"),
    selects = document.querySelectorAll("select"),
    uploads = document.querySelectorAll('[name = "upload"]');

  const messages = {
    loading: "Идет передача данных...",
    success: "Спасибо! Скоро мы свяжемся с Вами",
    failure: "Что-то пошло не так, попробуйте позже",
    spinner: "assets/img/spinner.gif",
    ok: "assets/img/ok.png",
    fail: "assets/img/fail.png",
  };

  function clearFormElements() {
    inputs.forEach((item) => {
      item.value = "";
    });
    comments.forEach((item) => (item.value = ""));
    selects.forEach((item) => (item.children[0].selected = true));
    uploads.forEach(
      (item) => (item.previousElementSibling.textContent = "Файл не выбран")
    );
  }

  const path = {
    designer: "assets/server.php",
    consultation: "assets/consultation.php",
  };

  uploads.forEach((item) => {
    item.addEventListener("input", () => {
      console.log(item.files[0]);

      let dots;

      const arr = item.files[0].name.split(".");

      arr[0].length > 6 ? (dots = "...") : (dots = ".");

      const name = arr[0].substring(0, 6) + dots + arr[1];

      item.previousElementSibling.textContent = name;
    });
  });

  form.forEach((item) => {
    item.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      item.parentNode.appendChild(statusMessage);

      item.classList.add("animate__animated", "animate__fadeOutUp");
      setTimeout(() => {
        item.style.display = "none";
      }, 400);

      let statusImg = document.createElement("img");
      statusImg.setAttribute("src", messages.spinner);
      statusImg.classList.add("animate__animated", "animate__fadeInUp");
      statusMessage.appendChild(statusImg);

      let textMessage = document.createElement("div");
      textMessage.textContent = messages.loading;
      statusMessage.appendChild(textMessage);

      const formData = new FormData(item);
      let api;
      item.closest(".popup-design") || item.classList.contains("calc_form")
        ? (api = path.designer)
        : (api = path.consultation);
      console.log(api);

      postData(api, formData)
        .then((res) => {
          console.log(res);
          statusImg.setAttribute("src", messages.ok);
          textMessage.textContent = messages.success;
        })
        .catch(() => {
          statusImg.setAttribute("src", messages.fail);
          textMessage.textContent = messages.failure;
        })
        .finally(() => {
          clearFormElements();
          setTimeout(() => {
            statusMessage.remove();
            item.style.display = "block";
            item.classList.remove("animate__fadeOutUp");
            item.classList.add("animate__fadeInUp");
          }, 4000);
        });
    });
  });
};

export default forms;

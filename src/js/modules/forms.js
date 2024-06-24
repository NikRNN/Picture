const forms = () => {
  const form = document.querySelectorAll("form"),
    inputs = document.querySelectorAll("inputs");

  const messages = {
    loading: "Идет передача данных...",
    success: "Спасибо! Скоро мы свяжемся с Вами",
    failure: "Что-то пошло не так, попробуйте позже",
    spinner: "assets/img/spinner.gif",
    ok: "assets/img/ok.png",
    fail: "assets/img/fail.png",
  };

  const postData = async (url, data) => {
    let res = await fetch(url, {
      method: "POST",
      body: data,
    });

    return await res.text();
  };

  function clearInputs() {
    inputs.forEach((item) => {
      item.value = "";
    });
  }

  const path = {
    designer: "assets/server.php",
    consultation: "assets/consultation.php",
  };

  form.forEach((item) => {
    item.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      item.parentNode.appendChild(statusMessage);

      item.classList.add("animated__animate", "animate__fadeOutUp");
      setTimeout(() => {
        item.style.display = "none";
      }, 400);

      let statusImg = document.createElement("img");
      statusImg.setAttribute("src", messages.spinner);
      statusImg.classList.add("animated__animate", "animate__fadeInUp");
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
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
            item.style.display = "block";
            cleanInput();
            item.classList.remove("animate__fadeOutUp");
            item.classList.add("animate__fadeInUp");
          }, 5000);
        });
    });
  });
};

export default forms;

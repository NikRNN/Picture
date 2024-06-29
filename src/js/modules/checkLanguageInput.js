const checkLanguageInput = (selector) => {
  const textInput = document.querySelectorAll(selector);

  textInput.forEach((input) => {
    input.addEventListener("keypress", (e) => {
      if (e.key.match(/[^а-яё 0-9]/gi)) {
        e.preventDefault();
      }
    });

    input.addEventListener("input", () => {
      if (input.value.match(/[^а-яё 0-9]/gi)) {
        input.value = "";

        setTimeout(() => {
          input.value = "";
        }, 0);
      }
    });
  });
};

export default checkLanguageInput;

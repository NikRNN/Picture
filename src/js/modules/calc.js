const calc = (size, material, options, promocod, result, infoUser) => {
  const sizeBlock = document.querySelector(size),
    materialBlock = document.querySelector(material),
    optionsBlock = document.querySelector(options),
    promocodeBlock = document.querySelector(promocod),
    resultBlock = document.querySelector(result);

  let sum = 0;

  const calcForm = () => {
    sum = Math.round(
      +sizeBlock.value * +materialBlock.value + +optionsBlock.value
    );

    if (sizeBlock.value == "" || materialBlock.value == "") {
      resultBlock.textContent = `Выберите размер и материалы картины`;
    } else if (promocodeBlock.value === "IWANTPOPART") {
      resultBlock.textContent = Math.round(sum * 0.7);
    } else {
      resultBlock.textContent = sum;
    }
  };

  sizeBlock.addEventListener("change", () => {
    calcForm();
    infoUser.size =
      sizeBlock.value + ", " + sizeBlock.options[sizeBlock.selectedIndex].text;

    console.log(infoUser);
  });
  materialBlock.addEventListener("change", () => {
    calcForm();
    infoUser.material =
      materialBlock.value +
      ", " +
      materialBlock.options[materialBlock.selectedIndex].text;

    console.log(infoUser);
  });
  optionsBlock.addEventListener("change", () => {
    calcForm();
    infoUser.options =
      optionsBlock.value +
      ", " +
      optionsBlock.options[optionsBlock.selectedIndex].text;

    console.log(infoUser);
  });
  promocodeBlock.addEventListener("input", () => {
    calcForm();
    infoUser.promocode = promocodeBlock.value;

    console.log(infoUser);
  });
};

export default calc;

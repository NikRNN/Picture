const calc = (size, material, options, promocod, result) => {
  const sizeBlock = document.querySelector(size),
    materilBlock = document.querySelector(material),
    optionsBlock = document.querySelector(options),
    promocodeBlock = document.querySelector(promocod),
    resultBlock = document.querySelector(result);

  let sum = 0;

  const calcForm = () => {
    sum = Math.round(
      +sizeBlock.value * +materilBlock.value + +optionsBlock.value
    );

    if (sizeBlock.value == "" || materilBlock.value == "") {
      result.textContent = `Выберите размер и материалы картины`;
    } else if (promocodeBlock.value === "IWANTPOPART") {
      resultBlock.textContent = Math.round(sum * 0.7);
    } else {
      resultBlock.textContent = sum;
    }
  };

  sizeBlock.addEventListener("change", calcForm);
  materilBlock.addEventListener("change", calcForm);
  optionsBlock.addEventListener("change", calcForm);
  promocodeBlock.addEventListener("input", calcForm);
};

export default calc;

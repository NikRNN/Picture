const mask = (selector) => {
  function createMask(event) {
    let i = 0,
      matrix = "+7 (___) ___ __ __",
      def = matrix.replace(/\D/g, ""),
      value = this.value.replace(/\D/g, "");

    if (def.length >= value.length) {
      value = def;
    }

    this.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < value.length
        ? value.charAt(i++)
        : i >= value.length
        ? ""
        : a;
    });

    if (event.type === "blur") {
      if (this.value.length == 2) {
        this.value = "";
      }
    } else if (event.type === "click") {
      if (this.value.length == 2) {
        setCursorPosition(3, this);
      } else {
        setCursorPosition(this.value.length, this);
      }
    } else {
      setCursorPosition(this.value.length, this);
    }
  }

  let setCursorPosition = (pos, elem) => {
    elem.focus();

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      let range = elem.createTextRange();

      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
    }
  };

  const inputs = document.querySelectorAll(selector);

  inputs.forEach((input) => {
    input.addEventListener("input", createMask);
    input.addEventListener("focus", createMask);
    input.addEventListener("blur", createMask);
    input.addEventListener("click", createMask);
  });
};

export default mask;

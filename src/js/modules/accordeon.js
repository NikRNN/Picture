const accordeon = (btnTrigger, blockSelector) => {
  const btns = document.querySelectorAll(btnTrigger);

  btns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const isActive = this.classList.contains("active");
      btns.forEach((item) => {
        item.classList.remove("active");
        item.nextElementSibling.classList.remove("active");
        item.nextElementSibling.style.maxHeight = "0px";
      });

      if (!isActive) {
        this.classList.add("active");
        this.nextElementSibling.classList.add("active");
        this.nextElementSibling.style.maxHeight =
          this.nextElementSibling.scrollHeight + 80 + "px";
      }
    });
  });

  // blocks = document.querySelectorAll(blockSelector);

  //первый вариант
  //   blocks.forEach((item) => {
  //     item.classList.add("animate__animated", "animate__fadeInDown");
  //   });

  //   btns.forEach((item) => {
  //     item.addEventListener("click", function () {
  //       if (!this.classList.contains("active")) {
  //         btns.forEach((item) => {
  //           item.classList.remove("active");
  //         });

  //         this.classList.add("active");
  //       }
  //     });
  //   });
};

export default accordeon;

const burger = (burgerSelector, btnSelector) => {
  const burgerMenu = document.querySelector(burgerSelector),
    burgerBtn = document.querySelector(btnSelector);

  burgerMenu.style.display = "none";

  burgerBtn.addEventListener("click", () => {
    if (burgerMenu.style.display === "none" && window.screen.availWidth < 993) {
      burgerMenu.style.display = "block";
      burgerMenu.classList.add("animate__animated", "animate__fadeIn");
    } else {
      burgerMenu.style.display = "none";
    }
  });

  window.addEventListener("resize", () => {
    if (window.screen.availWidth > 992) {
      burgerMenu.style.display = "none";
    }
  });
};

export default burger;

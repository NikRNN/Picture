const modal = () => {
  let scrollWidth = scrollY();
  const fixedGift = document.querySelector(".fixed-gift");
  let btnPressed;

  function scrollY() {
    let div = document.createElement("div");
    div.style.width = "50px";
    div.style.height = "50px";
    div.style.visibility = "hidden";
    div.style.overflow = "scroll";
    document.body.append(div);

    let scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();

    return scrollWidth;
  }

  function showModalWindows(trigger, modal, close, destroy = false) {
    const triggerBtn = document.querySelectorAll(trigger),
      modalWindow = document.querySelector(modal),
      closeBtn = document.querySelector(close),
      windows = document.querySelectorAll("[data-modal]");

    triggerBtn.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }

        if (destroy) {
          item.remove();
        }

        windows.forEach((item) => {
          item.style.display = "none";
          item.classList.add("animate__animated", "animate__fadeIn");
        });

        btnPressed = true;

        modalWindow.style.display = "block";
        document.body.style.marginRight = `${scrollWidth}px`;
        document.body.style.overflow = "hidden";
        fixedGift.style.right = `calc(2rem + ${scrollWidth}px)`;
      });
    });

    closeBtn.addEventListener("click", () => {
      windows.forEach((item) => {
        item.style.display = "none";
      });
      modalWindow.style.display = "none";
      document.body.style.marginRight = "0px";
      document.body.style.overflow = "";
      fixedGift.style.right = `2rem`;
    });

    modalWindow.addEventListener("click", (e) => {
      if (e.target === modalWindow) {
        modalWindow.style.display = "none";
        document.body.style.marginRight = "0px";
        document.body.style.overflow = "";
        fixedGift.style.right = `2rem`;
      }
    });
  }

  showModalWindows(
    ".button-order",
    ".popup-design",
    ".popup-design .popup-close"
  );
  showModalWindows(
    ".button-consultation",
    ".popup-consultation",
    ".popup-consultation .popup-close"
  );
  showModalWindows(
    ".fixed-gift",
    ".popup-gift",
    ".popup-gift .popup-close",
    true
  );

  function showModalByTime(selector, ms) {
    setTimeout(() => {
      let display;

      document.querySelectorAll("[data-modal]").forEach((item) => {
        if (getComputedStyle(item).display !== "none") {
          display = true;
        }
      });

      if (!display) {
        document.querySelector(selector).style.display = "block";
        document.body.style.marginRight = `${scrollWidth}px`;
        document.body.style.overflow = "hidden";
        fixedGift.style.right = `calc(2rem + ${scrollWidth}px)`;
      }
    }, ms);
  }

  showModalByTime(".popup-consultation", 500000);

  function checkUserScrollY(selector) {
    window.addEventListener("scroll", () => {
      let scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );

      if (
        !btnPressed &&
        window.scrollY + document.documentElement.clientHeight >= scrollHeight
      ) {
        document.querySelector(selector).click();
      }
    });
  }

  checkUserScrollY(".fixed-gift");
};

export default modal;

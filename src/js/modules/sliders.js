const sliders = (slider, div, prev, next) => {
  let slidersIndex = 1;
  let pause;
  const items = document.querySelectorAll(slider);

  function showSlides(n) {
    if (n > items.length) {
      slidersIndex = 1;
    }
    if (n < 1) {
      slidersIndex = items.length;
    }

    items.forEach((item) => {
      item.style.display = "none";
      item.classList.add("animate__animated");
    });

    items[slidersIndex - 1].style.display = "block";
  }

  showSlides(slider);

  function plusSlides(n) {
    showSlides((slidersIndex += n));
  }

  try {
    const prevBtn = document.querySelector(prev),
      nextBtn = document.querySelector(next);

    prevBtn.addEventListener("click", () => {
      plusSlides(-1);
      items[slidersIndex - 1].classList.remove("animate__slideInLeft");
      items[slidersIndex - 1].classList.add("animate__slideInRight");
    });

    nextBtn.addEventListener("click", () => {
      plusSlides(1);
      items[slidersIndex - 1].classList.remove("animate__slideInRight");
      items[slidersIndex - 1].classList.add("animate__slideInLeft");
    });
  } catch (e) {}

  function activeSlider() {
    if (div === "horizontal") {
      pause = setInterval(() => {
        plusSlides(1);
        items[slidersIndex - 1].classList.remove("animate__slideInRight");
        items[slidersIndex - 1].classList.add("animate__slideInLeft");
      }, 3000);
    } else {
      pause = setInterval(() => {
        plusSlides(1);
        items[slidersIndex - 1].classList.add("animate__slideInDown");
      }, 3000);
    }
    try {
      const prevBtn = document.querySelector(prev),
        nextBtn = document.querySelector(next);

      prevBtn.addEventListener("click", () => {
        clearInterval(pause);
      });
      nextBtn.addEventListener("click", () => {
        clearInterval(pause);
      });
    } catch (e) {}
  }

  activeSlider();

  function pausedSlider() {
    items.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        clearInterval(pause);
      });
      item.addEventListener("mouseleave", () => {
        activeSlider();
      });
    });
  }

  pausedSlider();
};

export default sliders;

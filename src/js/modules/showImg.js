const showImg = (block) => {
  const blocks = document.querySelectorAll(block);

  function showImgMouse(item) {
    const img = item.querySelector("img");

    img.src = img.src.slice(0, -4) + "-1.png";

    item
      .querySelectorAll("p:not(.sizes-hit")
      .forEach((elem) => (elem.style.display = "none"));
  }

  function hideImgMouse(item) {
    const img = item.querySelector("img");

    img.src = img.src.slice(0, -6) + ".png";

    item
      .querySelectorAll("p:not(.sizes-hit)")
      .forEach((elem) => (elem.style.display = "block"));
  }

  blocks.forEach((elem) => {
    elem.addEventListener("mouseover", () => {
      showImgMouse(elem);
    });

    elem.addEventListener("mouseout", () => {
      hideImgMouse(elem);
    });
  });
};

export default showImg;

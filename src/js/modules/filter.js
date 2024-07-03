const filter = () => {
  const wrapperLi = document.querySelector(".portfolio-menu"),
    li = wrapperLi.querySelectorAll("li"),
    divs = document.querySelectorAll(".portfolio-block"),
    noPortfolio = document.querySelector(".portfolio-no");

  wrapperLi.addEventListener("click", (e) => {
    const target = e.target;

    let invisible;

    const classesTarget = [...target.classList];

    divs.forEach((item) => {
      item.classList.remove("animate__animated", "animate__fadeIn");
      noPortfolio.classList.remove("animate__animated", "animate__fadeIn");

      if (
        classesTarget.some((className) => item.classList.contains(className))
      ) {
        item.style.display = "block";
        item.classList.add("animate__animated", "animate__fadeIn");
        target.classList.add("active");
        invisible = true;
      } else {
        item.style.display = "none";
        noPortfolio.classList.add("animate__animated", "animate__fadeIn");
      }
    });
    noPortfolio.style.display = invisible ? "none" : "block";
    li.forEach((item) => item.classList.remove("active"));
    target.classList.add("active");
  });
};

export default filter;

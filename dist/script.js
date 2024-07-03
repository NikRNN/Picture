/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const calc = (size, material, options, promocod, result, infoUser) => {
  const sizeBlock = document.querySelector(size),
    materialBlock = document.querySelector(material),
    optionsBlock = document.querySelector(options),
    promocodeBlock = document.querySelector(promocod),
    resultBlock = document.querySelector(result);
  let sum = 0;
  const calcForm = () => {
    sum = Math.round(+sizeBlock.value * +materialBlock.value + +optionsBlock.value);
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
    infoUser.size = sizeBlock.value + ", " + sizeBlock.options[sizeBlock.selectedIndex].text;
    console.log(infoUser);
  });
  materialBlock.addEventListener("change", () => {
    calcForm();
    infoUser.material = materialBlock.value + ", " + materialBlock.options[materialBlock.selectedIndex].text;
    console.log(infoUser);
  });
  optionsBlock.addEventListener("change", () => {
    calcForm();
    infoUser.options = optionsBlock.value + ", " + optionsBlock.options[optionsBlock.selectedIndex].text;
    console.log(infoUser);
  });
  promocodeBlock.addEventListener("input", () => {
    calcForm();
    infoUser.promocode = promocodeBlock.value;
    console.log(infoUser);
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/checkLanguageInput.js":
/*!**********************************************!*\
  !*** ./src/js/modules/checkLanguageInput.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const checkLanguageInput = selector => {
  const textInput = document.querySelectorAll(selector);
  textInput.forEach(input => {
    input.addEventListener("keypress", e => {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (checkLanguageInput);

/***/ }),

/***/ "./src/js/modules/filter.js":
/*!**********************************!*\
  !*** ./src/js/modules/filter.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const filter = () => {
  const wrapperLi = document.querySelector(".portfolio-menu"),
    li = wrapperLi.querySelectorAll("li"),
    divs = document.querySelectorAll(".portfolio-block"),
    noPortfolio = document.querySelector(".portfolio-no");
  wrapperLi.addEventListener("click", e => {
    const target = e.target;
    let invisible;
    const classesTarget = [...target.classList];
    divs.forEach(item => {
      item.classList.remove("animate__animated", "animate__fadeIn");
      noPortfolio.classList.remove("animate__animated", "animate__fadeIn");
      if (classesTarget.some(className => item.classList.contains(className))) {
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
    li.forEach(item => item.classList.remove("active"));
    target.classList.add("active");
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (filter);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/request */ "./src/js/services/request.js");

const forms = userInfo => {
  const form = document.querySelectorAll("form"),
    inputs = document.querySelectorAll("input"),
    comments = document.querySelectorAll("textarea"),
    selects = document.querySelectorAll("select"),
    uploads = document.querySelectorAll('[name = "upload"]'),
    select = document.querySelectorAll("select"),
    sizeBlock = document.querySelector("#size"),
    materialBlock = document.querySelector("#material"),
    optionsBlock = document.querySelector("#options"),
    promocodeBlock = document.querySelector(".promocod"),
    resultBlock = document.querySelector(".calc-price");
  const messages = {
    loading: "Идет передача данных...",
    success: "Спасибо! Скоро мы свяжемся с Вами",
    failure: "Что-то пошло не так, попробуйте позже",
    spinner: "assets/img/spinner.gif",
    ok: "assets/img/ok.png",
    fail: "assets/img/fail.png"
  };
  function clearFormElements() {
    inputs.forEach(item => {
      item.value = "";
    });
    comments.forEach(item => item.value = "");
    selects.forEach(item => item.children[0].selected = true);
    uploads.forEach(item => item.previousElementSibling.textContent = "Файл не выбран");
  }
  const path = {
    designer: "assets/server.php",
    consultation: "assets/consultation.php"
  };
  uploads.forEach(item => {
    item.addEventListener("input", () => {
      console.log(item.files[0]);
      let dots;
      const arr = item.files[0].name.split(".");
      arr[0].length > 6 ? dots = "..." : dots = ".";
      const name = arr[0].substring(0, 6) + dots + arr[1];
      item.previousElementSibling.textContent = name;
    });
  });
  form.forEach(item => {
    item.addEventListener("submit", e => {
      e.preventDefault();
      let statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      item.parentNode.appendChild(statusMessage);
      item.classList.add("animate__animated", "animate__fadeOutUp");
      setTimeout(() => {
        item.style.display = "none";
      }, 400);
      let statusImg = document.createElement("img");
      statusImg.setAttribute("src", messages.spinner);
      statusImg.classList.add("animate__animated", "animate__fadeInUp");
      statusMessage.appendChild(statusImg);
      let textMessage = document.createElement("div");
      textMessage.textContent = messages.loading;
      statusMessage.appendChild(textMessage);
      const formData = new FormData(item);
      if (item.getAttribute("data-user") === "user") {
        for (let elem in userInfo) {
          formData.append(elem, userInfo[elem]);
        }
      }
      let api = path.consultation;
      item.closest(".popup-design") || item.classList.contains("calc_form") ? api = path.designer : api = path.consultation;
      if (item.getAttribute("data-user") === "user") {
        api = path.consultation;
      }
      console.log(api);
      (0,_services_request__WEBPACK_IMPORTED_MODULE_0__.postData)(api, formData).then(res => {
        console.log(res);
        statusImg.setAttribute("src", messages.ok);
        textMessage.textContent = messages.success;
      }).catch(() => {
        statusImg.setAttribute("src", messages.fail);
        textMessage.textContent = messages.failure;
      }).finally(() => {
        clearFormElements();
        setTimeout(() => {
          statusMessage.remove();
          item.style.display = "block";
          item.classList.remove("animate__fadeOutUp");
          item.classList.add("animate__fadeInUp");
        }, 4000);
      });
    });
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/mask.js":
/*!********************************!*\
  !*** ./src/js/modules/mask.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const mask = selector => {
  function createMask(event) {
    let i = 0,
      matrix = "+7 (___) ___ __ __",
      def = matrix.replace(/\D/g, ""),
      value = this.value.replace(/\D/g, "");
    if (def.length >= value.length) {
      value = def;
    }
    this.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < value.length ? value.charAt(i++) : i >= value.length ? "" : a;
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
  inputs.forEach(input => {
    input.addEventListener("input", createMask);
    input.addEventListener("focus", createMask);
    input.addEventListener("blur", createMask);
    input.addEventListener("click", createMask);
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mask);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
    triggerBtn.forEach(item => {
      item.addEventListener("click", e => {
        if (e.target) {
          e.preventDefault();
        }
        if (destroy) {
          item.remove();
        }
        windows.forEach(item => {
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
      windows.forEach(item => {
        item.style.display = "none";
      });
      modalWindow.style.display = "none";
      document.body.style.marginRight = "0px";
      document.body.style.overflow = "";
      fixedGift.style.right = `2rem`;
    });
    modalWindow.addEventListener("click", e => {
      if (e.target === modalWindow) {
        modalWindow.style.display = "none";
        document.body.style.marginRight = "0px";
        document.body.style.overflow = "";
        fixedGift.style.right = `2rem`;
      }
    });
  }
  showModalWindows(".button-design", ".popup-design", ".popup-design .popup-close");
  showModalWindows(".button-consultation", ".popup-consultation", ".popup-consultation .popup-close");
  showModalWindows(".fixed-gift", ".popup-gift", ".popup-gift .popup-close", true);
  function showModalByTime(selector, ms) {
    setTimeout(() => {
      let display;
      document.querySelectorAll("[data-modal]").forEach(item => {
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
      let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      if (!btnPressed && window.scrollY + document.documentElement.clientHeight >= scrollHeight) {
        document.querySelector(selector).click();
      }
    });
  }
  checkUserScrollY(".fixed-gift");
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./src/js/modules/showImg.js":
/*!***********************************!*\
  !*** ./src/js/modules/showImg.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const showImg = block => {
  const blocks = document.querySelectorAll(block);
  function showImgMouse(item) {
    const img = item.querySelector("img");
    img.src = img.src.slice(0, -4) + "-1.png";
    item.querySelectorAll("p:not(.sizes-hit").forEach(elem => elem.style.display = "none");
  }
  function hideImgMouse(item) {
    const img = item.querySelector("img");
    img.src = img.src.slice(0, -6) + ".png";
    item.querySelectorAll("p:not(.sizes-hit)").forEach(elem => elem.style.display = "block");
  }
  blocks.forEach(elem => {
    elem.addEventListener("mouseover", () => {
      showImgMouse(elem);
    });
    elem.addEventListener("mouseout", () => {
      hideImgMouse(elem);
    });
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showImg);

/***/ }),

/***/ "./src/js/modules/showMoreStyles.js":
/*!******************************************!*\
  !*** ./src/js/modules/showMoreStyles.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/request */ "./src/js/services/request.js");

const showMoreStyles = (trigger, selector) => {
  const triggerBtn = document.querySelector(trigger),
    wrapper = document.querySelector(selector);
  triggerBtn.addEventListener("click", function () {
    (0,_services_request__WEBPACK_IMPORTED_MODULE_0__.getData)("http://localhost:3000/styles").then(res => loadCards(res));
    this.remove();
  });
  function loadCards(cards) {
    cards.forEach(item => {
      let card = document.createElement("div");
      card.classList.add("animate__animated", "animate__fadeInUp", "col-sm-3", "col-sm-offset-0", "col-xs-10", "col-xs-offset-1");
      let {
        src,
        title,
        link
      } = item;
      card.innerHTML = `
            		<div class='styles-block'>
						<img src=${src} alt></img>
						<h4>${title}</h4>
						<a href=${link}>Подробнее</a>
					</div>`;
      wrapper.append(card);
    });
  }
  // elements = document.querySelectorAll(selector);

  //простой вариант показа доп элементов без подзагрузки с сервера (не забудь для этого раскомментировать верстку с карточками и изменить параметры в вызове showMoreStyles: вместо wrapper вернуть стиль карточек)
  // triggerBtn.addEventListener("click", () => {
  //   elements.forEach((item) => {
  //     item.classList.add("animate__animated", "animate__fadeInUp");

  //     item.classList.remove("hidden-lg", "hidden-md", "hidden-sm", "hidden-xs");

  //     item.classList.add(
  //       "col-sm-3",
  //       "col-sm-offset-0",
  //       "col-xs-10",
  //       "col-xs-offset-1"
  //     );
  //   });

  //   triggerBtn.style.display = "none";
  // });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showMoreStyles);

/***/ }),

/***/ "./src/js/modules/sliders.js":
/*!***********************************!*\
  !*** ./src/js/modules/sliders.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
    items.forEach(item => {
      item.style.display = "none";
      item.classList.add("animate__animated");
    });
    items[slidersIndex - 1].style.display = "block";
  }
  showSlides(slider);
  function plusSlides(n) {
    showSlides(slidersIndex += n);
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
    items.forEach(item => {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sliders);

/***/ }),

/***/ "./src/js/services/request.js":
/*!************************************!*\
  !*** ./src/js/services/request.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getData: () => (/* binding */ getData),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  let res = await fetch(url, {
    method: "POST",
    body: data
  });
  return await res.text();
};
const getData = async url => {
  let res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${fetch.status}`);
  }
  return await res.json();
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_sliders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/sliders */ "./src/js/modules/sliders.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_mask__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/mask */ "./src/js/modules/mask.js");
/* harmony import */ var _modules_checkLanguageInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/checkLanguageInput */ "./src/js/modules/checkLanguageInput.js");
/* harmony import */ var _modules_showMoreStyles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/showMoreStyles */ "./src/js/modules/showMoreStyles.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/filter */ "./src/js/modules/filter.js");
/* harmony import */ var _modules_showImg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/showImg */ "./src/js/modules/showImg.js");









window.addEventListener("DOMContentLoaded", () => {
  const pictureInfo = {};
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_1__["default"])(".feedback-slider-item", "horizontal", ".main-prev-btn", ".main-next-btn");
  (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_1__["default"])(".main-slider-item");
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])(pictureInfo);
  (0,_modules_mask__WEBPACK_IMPORTED_MODULE_3__["default"])('[name = "phone"]');
  (0,_modules_checkLanguageInput__WEBPACK_IMPORTED_MODULE_4__["default"])('[name="name"]');
  (0,_modules_checkLanguageInput__WEBPACK_IMPORTED_MODULE_4__["default"])('[name="message"]');
  (0,_modules_showMoreStyles__WEBPACK_IMPORTED_MODULE_5__["default"])(".button-styles", "#styles .row");
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])("#size", "#material", "#options", ".promocode", ".calc-price", pictureInfo);
  (0,_modules_filter__WEBPACK_IMPORTED_MODULE_7__["default"])();
  (0,_modules_showImg__WEBPACK_IMPORTED_MODULE_8__["default"])(".sizes-block");
});
/******/ })()
;
//# sourceMappingURL=script.js.map
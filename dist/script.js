/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const forms = () => {
  const form = document.querySelectorAll("form"),
    inputs = document.querySelectorAll("inputs");
  const messages = {
    loading: "Идет передача данных...",
    success: "Спасибо! Скоро мы свяжемся с Вами",
    failure: "Что-то пошло не так, попробуйте позже",
    spinner: "assets/img/spinner.gif",
    ok: "assets/img/ok.png",
    fail: "assets/img/fail.png"
  };
  const postData = async (url, data) => {
    let res = await fetch(url, {
      method: "POST",
      body: data
    });
    return await res.text();
  };
  function clearInputs() {
    inputs.forEach(item => {
      item.value = "";
    });
  }
  const path = {
    designer: "assets/server.php",
    consultation: "assets/consultation.php"
  };
  form.forEach(item => {
    item.addEventListener("submit", e => {
      e.preventDefault();
      let statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      item.parentNode.appendChild(statusMessage);
      item.classList.add("animated__animate", "animate__fadeOutUp");
      setTimeout(() => {
        item.style.display = "none";
      }, 400);
      let statusImg = document.createElement("img");
      statusImg.setAttribute("src", messages.spinner);
      statusImg.classList.add("animated__animate", "animate__fadeInUp");
      statusMessage.appendChild(statusImg);
      let textMessage = document.createElement("div");
      textMessage.textContent = messages.loading;
      statusMessage.appendChild(textMessage);
      const formData = new FormData(item);
      let api;
      item.closest(".popup-design") || item.classList.contains("calc_form") ? api = path.designer : api = path.consultation;
      console.log(api);
      postData(api, formData).then(res => {
        console.log(res);
        statusImg.setAttribute("src", messages.ok);
        textMessage.textContent = messages.success;
      }).catch(() => {
        statusImg.setAttribute("src", messages.fail);
        textMessage.textContent = messages.failure;
      }).finally(() => {
        clearInputs();
        setTimeout(() => {
          statusMessage.remove();
          item.style.display = "block";
          cleanInput();
          item.classList.remove("animate__fadeOutUp");
          item.classList.add("animate__fadeInUp");
        }, 5000);
      });
    });
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

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



window.addEventListener("DOMContentLoaded", () => {
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_1__["default"])(".feedback-slider-item", "horizontal", ".main-prev-btn", ".main-next-btn");
  (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_1__["default"])(".main-slider-item");
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])();
});
/******/ })()
;
//# sourceMappingURL=script.js.map
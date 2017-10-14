// МЕНЮ В МОБИЛЬНОЙ ВЕРСИИ
var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__toggle");

navMain.classList.remove("main-nav--nojs");
navToggle.classList.remove("main-nav__toggle--nojs");

navToggle.addEventListener("click", function() {
  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.add("main-nav--opened");
    navToggle.classList.remove("main-nav__toggle--closed");
    navToggle.classList.add("main-nav__toggle--opened");
  } else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.remove("main-nav--opened");
    navToggle.classList.add("main-nav__toggle--closed");
    navToggle.classList.remove("main-nav__toggle--opened");
  }
});

// МОДАЛЬНОЕ ОКНО "ДОБАВИТЬ В КОРЗИНУ"
var toCart = document.querySelectorAll(".tocart");
var modaltoCart = document.querySelector(".modal-tocart");
var overLay = document.querySelector(".modal-overlay");

for (var i = 0; i < toCart.length; i++) {
  toCart[i].addEventListener("click", function(event) {
    event.preventDefault();
    overLay.classList.add("modal-overlay--show");
    modaltoCart.classList.remove("modal-tocart--closed");
    modaltoCart.classList.add("modal-tocart--opened");
  });

  overLay.addEventListener("click", function(event) {
    overLay.classList.remove("modal-overlay--show");
    modaltoCart.classList.remove("modal-tocart--opened");
    modaltoCart.classList.add("modal-tocart--closed");
  });

  window.addEventListener("keydown", function (event) {
    if (event.keyCode === 27) {
      if (modaltoCart.classList.contains("modal-tocart--opened")) {
        overLay.classList.remove("modal-overlay--show");
        modaltoCart.classList.remove("modal-tocart--opened");
        modaltoCart.classList.add("modal-tocart--closed");
      }
    }
  });
}

// КАРТА БЕЗ JS
var contactsMap = document.querySelector(".contacts__map");

contactsMap.classList.remove("contacts__map--nojs");

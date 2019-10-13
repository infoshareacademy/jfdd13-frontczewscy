const navigation = document.querySelector(".navigation__links");
const navigationButton = document.querySelector("#navigation__button");
const myNav = document.querySelector(".navigation");

const makeResponsive = () => {
  if (navigation.className === "navigation__links") {
    navigation.className += " responsive";
    myNav.classList.add("navigation-colored");
    myNav.classList.remove("navigation-transparent");
  } else {
    navigation.className = "navigation__links";
    myNav.classList.add("navigation-transparent");
    myNav.classList.remove("navigation-colored");
  }
};

const closeMenu = () => {
    navigation.className = "navigation__links";
}

const addBackground = () => {
  if (window.pageYOffset >= 500) {
    myNav.classList.add("navigation-colored");
    myNav.classList.remove("navigation-transparent");
  } else {
    myNav.classList.add("navigation-transparent");
    myNav.classList.remove("navigation-colored");
  }
};

navigationButton.addEventListener("click", () => {
  makeResponsive();
});

window.addEventListener("scroll", () => {
  addBackground();
  closeMenu();
});

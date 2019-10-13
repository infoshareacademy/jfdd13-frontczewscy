const navigation = document.querySelector(".navigation__links");
const navigationButton = document.querySelector("#navigation__button");
const myNav = document.querySelector(".navigation");

const addBackground = () => {
  if (window.pageYOffset >= 500) {
    myNav.classList.add("navigation-colored");
    myNav.classList.remove("navigation-transparent");
  } else {
    myNav.classList.add("navigation-transparent");
    myNav.classList.remove("navigation-colored");
  }
};

const makeResponsive = () => {
  if (navigation.className === "navigation__links") {
    navigation.className += " responsive";
    myNav.classList.add("navigation-colored");
    myNav.classList.remove("navigation-transparent");
  } else {
    navigation.className = "navigation__links";
    addBackground();
  }
};

const closeMenu = () => {
    navigation.className = "navigation__links";
}

navigationButton.addEventListener("click", () => {
  makeResponsive();
});

window.addEventListener("scroll", () => {
  addBackground();
  closeMenu();
});

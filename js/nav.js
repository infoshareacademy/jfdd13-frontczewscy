const navigation = document.querySelector(".navigation__links");
const navigationButton = document.querySelector("#navigation__button");
const myNav = document.querySelector(".navigation");
const scrollButton = document.querySelector('#scrollToTop');

const height = 500

// Add background to the headder at height of 500px;
const addBackground = () => {
  if (window.pageYOffset >= height) {
    myNav.classList.add("navigation-colored");
    myNav.classList.remove("navigation-transparent");
  } else {
    myNav.classList.add("navigation-transparent");
    myNav.classList.remove("navigation-colored");
  }
};

// Add scrollButton to the site at height of 
const addScrollButton = () => {
  if (window.pageYOffset >= height) {
    scrollButton.classList.add("active");
  } else {
    scrollButton.classList.remove("active");
  }
}

// Add responsive class to the navigation
const makeResponsive = () => {
  if (navigation.className === "navigation__links") {
    navigation.classList.add("responsive");
    myNav.classList.add("navigation-colored");
    myNav.classList.remove("navigation-transparent");
  } else {
    navigation.className = "navigation__links";
    addBackground();
  }
};

// Add change class to the navigation links
const closeMenu = () => {
    navigation.className = "navigation__links";
    navigationButton.classList.remove("change");
}

// Checks for the click on navigation button
navigationButton.addEventListener("click", () => {
  makeResponsive();
  navigationButton.classList.toggle("change");
  
});

// Checks for the scroll in window
window.addEventListener("scroll", () => {
  addBackground();
  closeMenu();
  addScrollButton();
});

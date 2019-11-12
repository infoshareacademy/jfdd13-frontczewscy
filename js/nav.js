const navigation = document.querySelector(".navigation__links");
const navigationButton = document.querySelector("#navigation__button");
const myNav = document.querySelector(".navigation");
const scrollButton = document.querySelector('#scrollToTop');
const link1 = document.getElementById('link1');
const link2 = document.getElementById('link2');
const link3 = document.getElementById('link3');
const links = [link1, link2, link3];


scrollButton.addEventListener('click', () => {
  window.scroll({
    top : 0,
    left : 0,
    behavior : 'smooth'
  });
})


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

// Removes background from every navigation link
function removeBackground() {
  links.forEach(element => element.classList.remove('hightlight'));
}

// Hightlight proper navigation link
function navHighlight() {
  let currentPosition = window.scrollY + 80;
  removeBackground();
  if (currentPosition  >= functions.offsetTop && currentPosition < premier.offsetTop) {
   link1.classList.add("hightlight");
  }
  else if (currentPosition >=  premier.offsetTop && currentPosition <  about.offsetTop) {
    link2.classList.add("hightlight");
  }
  else if  (currentPosition >=  about.offsetTop) { 
   link3.classList.add("hightlight");
  }
}

// Checks for the scroll in window
window.addEventListener("scroll", () => {
  addBackground();
  closeMenu();
  addScrollButton();
  navHighlight();
});
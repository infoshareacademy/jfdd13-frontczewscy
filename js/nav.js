// UWAGI AS: kod zamknac w funkcji samowykonujacej sie

const navigation = document.querySelector(".navigation__links");
const navigationButton = document.querySelector("#navigation__button");
const myNav = document.querySelector(".navigation");
const scrollButton = document.querySelector('#scrollToTop');


scrollButton.addEventListener('click', () => {
  window.scroll({
    top : 0,
    left : 0,
    behavior : 'smooth'
  });
})


const height = 500// UWAGI AS: sredniki

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


document.addEventListener("scroll", navHighlight);


function setBackground() {// UWAGI AS: funkcja powinna sie raczej nazywac clearBackground, bo clearuje a nie cos ustawia
  link1.style.backgroundColor = "";
  link2.style.backgroundColor = "";
  link3.style.backgroundColor = "";
}


function navHighlight() {
  var link1=document.getElementById('link1');// UWAGI AS: vary nie stosujemy, let i const, czyli const
  var link2=document.getElementById('link2');
  var link3=document.getElementById('link3');
  let currentPosition = window.scrollY + 80;
  setBackground();
  if (currentPosition  >= functions.offsetTop && currentPosition < premier.offsetTop) {
   link1.style.backgroundColor = "#bd3161"; // UWAGI AS: kolory do css
  }
  else if (currentPosition >=  premier.offsetTop && currentPosition <  about.offsetTop) {
   link2.style.backgroundColor = "#bd3161"; // UWAGI AS: j/w
  }
  else if  (currentPosition >=  about.offsetTop) { 
   link3.style.backgroundColor = "#bd3161"; // UWAGI AS: j/w
  }
}
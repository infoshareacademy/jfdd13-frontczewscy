const navigation = document.querySelector(".navigation__links");
const navigationButton = document.querySelector("#navigation__button");
const myNav = document.querySelector(".navigation");
const scrollButton = document.querySelector('#scrollToTop');

const addBackground = () => {
  if (window.pageYOffset >= 500) {
    myNav.classList.add("navigation-colored");
    myNav.classList.remove("navigation-transparent");
  } else {
    myNav.classList.add("navigation-transparent");
    myNav.classList.remove("navigation-colored");
  }
};

const addScrollButton = () => {
  if (window.pageYOffset >= 500) {
    scrollButton.classList.add("active");
  } else {
    scrollButton.classList.remove("active");
  }
}

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
    navigationButton.classList.remove("change");
}

navigationButton.addEventListener("click", () => {
  makeResponsive();
  navigationButton.classList.toggle("change");
  
});

window.addEventListener("scroll", () => {
  addBackground();
  closeMenu();
  addScrollButton();
});


//Get the button
// const scrollButton = document.querySelector('#scrollToTop');

// // When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }
// }

// // When the user clicks on the button, scroll to the top of the document
// function topFunction() {
//   document.body.scrollTop = 0;
//   document.documentElement.scrollTop = 0;
// }

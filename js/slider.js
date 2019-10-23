const images = document.querySelectorAll(".slider__image");
const elements = document.querySelectorAll(".info__element");
const slider = document.querySelector(".slider__images");

const heroSlider = document.querySelector('.hero__slider');
const heroElements = document.querySelectorAll(".hero__item");

let n = 0;
let interval = setInterval(() => {
  n++;
  if (n == heroElements.length) {
    n = 0;
  }
  console.log(n);
  heroSlideElements(n);
}, 5000);

function heroSlideElements(index) {
    heroSlider.style.transform = `translateX(${-index}00%)`
}

let a = 0;
let counting = setInterval(() => {
  if(a > 4) {
    a--;
  }
  if (a < -1) {
    a++;
  }
  console.log(a)
}, 1000)


// let n = 0;

// elements.forEach((element, index) => {
//   element.addEventListener("click", () => {
//     showImg(index);
//     changeColor(index);
//     console.log(index);
//     n = index;
//   });
// });

// function showImg(index) {
//   slider.style.transform = `translateX(${-index}00%)`
// }

// function changeColor(element) {
//   elements.forEach(item => {
//     item.style.backgroundColor = "rgb(133, 93, 93)";
//     item.style.transform = "scale(1)";
//   });

//   elements[element].style.backgroundColor = "rgb(209, 164, 164)";
//   elements[element].style.transform = "scale(1.1)";
// }

// let interval = setInterval(() => {
//     n++
//     if(n == elements.length) {
//         n = 0;
//     }
//     console.log(n);
//     changeColor(n);
//     showImg(n);
// }, 5000);

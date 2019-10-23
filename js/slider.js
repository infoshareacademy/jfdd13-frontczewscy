

const heroSlider = document.querySelector('.hero__slider');
const heroElements = document.querySelectorAll(".hero__item");
const leftButton = document.querySelector(".left__button");
const rightButton = document.querySelector(".right__button");

let currentSlide = 0;
let interval = null;
let intervalTime = 5000; // in miliseconds

interval = setInterval(animate, intervalTime);

function animate() {
  currentSlide++;
  if (currentSlide == heroElements.length) {
    currentSlide = 0;
  }
  heroSlideElements(currentSlide);
}

function nextSlide() {
  if(currentSlide < heroElements.length - 1){
    currentSlide++;
  }  
  clearInterval(interval);
  heroSlideElements(currentSlide);
}

function previousSlide() {
  if(currentSlide > 0){
    currentSlide--;
  }  
  heroSlideElements(currentSlide);
  clearInterval(interval);
}

function heroSlideElements(index) {
  heroSlider.style.transform = `translateX(${-index}00%)`
}

leftButton.addEventListener('click', previousSlide);
rightButton.addEventListener('click', nextSlide)



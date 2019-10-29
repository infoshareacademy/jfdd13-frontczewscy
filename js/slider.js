const heroSlider = document.querySelector('.hero__slider');
const heroElements = document.querySelectorAll(".hero__item");
const leftButton = document.querySelector(".left__button");
const rightButton = document.querySelector(".right__button");

let currentSlide = 0;
let interval = null;
let intervalTime = 6000; // in miliseconds
let timeoutTime = 15000; // in miliseconds
let time;
let moving;

function createTimeout() {
  clearTimeout(time)
  time = setTimeout(setTheInterval, timeoutTime);
}

window.addEventListener('mousemove', () => {
  clearInterval(interval);
  clearTimeout(time);
  time = setTimeout(setTheInterval, timeoutTime);
})



function setTheInterval() {
  interval = setInterval(animate, intervalTime);
}

function animate() {
  currentSlide++;
  if (currentSlide == heroElements.length) {
    currentSlide = 0;
  }
  heroSlideElements(currentSlide);
}

function onSlideCLicks() {
  clearInterval(interval);
  heroSlideElements(currentSlide);
  createTimeout();
}

function nextSlide() {
  if(currentSlide < heroElements.length - 1){
    currentSlide++;
  } else {
    currentSlide = 0;
  }
  clearInterval(interval);
  heroSlideElements(currentSlide);
  createTimeout();
}

function previousSlide() {
  if(currentSlide === 0){    
    currentSlide = heroElements.length - 1;
    console.log(currentSlide);
  } 
  else {
    currentSlide--;
  };
  onSlideCLicks()
}

function heroSlideElements(index) {
  heroSlider.style.transform = `translateX(${-index}00%)`
}

setTheInterval();

leftButton.addEventListener('click', previousSlide);
rightButton.addEventListener('click', nextSlide)



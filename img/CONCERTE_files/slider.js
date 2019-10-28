const heroSlider = document.querySelector('.hero__slider');
const heroElements = document.querySelectorAll(".hero__item");
const leftButton = document.querySelector(".left__button");
const rightButton = document.querySelector(".right__button");

let currentSlide = 0;
let interval = null;
let intervalTime = 5000; // in miliseconds
let timeoutTime = 15000; // in miliseconds



function setTheInterval() {
  interval = setInterval(animate, intervalTime);
}

function animate() {
  currentSlide++;
  if (currentSlide == heroElements.length) {
    currentSlide = 0;
  }
  heroSlideElements(currentSlide);
  console.log('set')
}
setTheInterval();

function nextSlide() {
  if(currentSlide < heroElements.length - 1){
    currentSlide++;
  } else {
    currentSlide = 0;
  }
  console.log(currentSlide);
  clearInterval(interval);
  heroSlideElements(currentSlide);
  clearTimeout(setTheInterval)
  setTimeout(setTheInterval, timeoutTime);
}

function previousSlide() {
  if(currentSlide === 0){    
    currentSlide = heroElements.length - 1;
    console.log(currentSlide);
  } 
  else {
    currentSlide--;
  }
  heroSlideElements(currentSlide);
  clearInterval(interval);
  clearTimeout(setTheInterval);
  setTimeout(setTheInterval, timeoutTime);
}

function heroSlideElements(index) {
  heroSlider.style.transform = `translateX(${-index}00%)`
}

leftButton.addEventListener('click', previousSlide);
rightButton.addEventListener('click', nextSlide)



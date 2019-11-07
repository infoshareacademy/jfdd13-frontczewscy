// UWAGI AS: kod zamknac w funkcji samowykonujacej sie

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
    currentSlide++; // UWAGI AS: lepiej stosowac += 1
  } else {
    currentSlide = 0;
  }
  clearInterval(interval);
  heroSlideElements(currentSlide);
  createTimeout();
}

function previousSlide() {
  if(currentSlide === 0){  // UWAGI AS: wystarczy if (!currentSlide) {}
    currentSlide = heroElements.length - 1;
    console.log(currentSlide);
  }  // UWAGI AS: niepotrzebny enter po }
  else {
    currentSlide--; // UWAGI AS: -= 1
  };
  onSlideCLicks()
}

function heroSlideElements(index) {
  heroSlider.style.transform = `translateX(${-index}00%)` // UWAGI AS: sredniki
}

setTheInterval();

leftButton.addEventListener('click', previousSlide);
rightButton.addEventListener('click', nextSlide) // UWAGI AS: j/w



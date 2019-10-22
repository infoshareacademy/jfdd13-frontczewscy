const images = document.querySelectorAll(".slider__image");
const elements = document.querySelectorAll(".info__element");
let n = 0;

elements.forEach((element, index) => {
  element.addEventListener("click", () => {
    showImg(index);
    changeColor(index);
    console.log(index);
    n = index;
  });
});

function showImg(element) {
  images.forEach((item) => {
    item.style.opacity = "0";
  });

  images[element].style.opacity = "1";
}

function changeColor(element) {
    elements.forEach((item) => {
        item.style.backgroundColor = "rgb(133, 93, 93)";
      });
    
      elements[element].style.backgroundColor = "rgb(209, 164, 164)";
}
 

let interval = setInterval(() => {
    n++
    if(n == elements.length) {
        n = 0;
    }
    console.log(n);
    changeColor(n);
    showImg(n);
}, 5000);

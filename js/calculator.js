const slider = document.getElementById("myRange"),
  output = document.getElementById("demo"),
  checkBox = document.getElementById("checkbox"),
  discountHTML = document.getElementById("discount"),
  price = document.getElementById("cena");
let count = true;
  
  
// document.querySelector(".submit").addEventListener('click', sliderChange);
document.querySelector("#calcButton").addEventListener('click', calcDisplay);
document.querySelector("#exitButton").addEventListener('click', calcDisplay);


function calcDisplay() {

   
  if (count) {
    count = false;
    document.querySelector('#calculator').style.display = "block";
  } else {
    count = true;
    document.querySelector('#calculator').style.display = "none";
  };

}
function sliderChange() {
  let discount = 0;
  let value = slider.value;
  let basicPrice = 200;




  if (value <= 5) discount = 0;
  else if (value > 5 && value < 11) discount = 0.05;
  else if (value >= 11) discount = 0.1;

  if (checkBox.checked == true && value) discount += 0.15;



  output.innerHTML = slider.value;
  discountHTML.innerHTML = `${discount * 100} %`;
  price.innerHTML = `${((basicPrice - basicPrice * discount)).toFixed(2)} zł`;

}

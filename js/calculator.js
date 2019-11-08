const slider = document.getElementById("myRange"),
  output = document.getElementById("demo"),
  checkBox = document.getElementById("checkbox"),
  discountHTML = document.getElementById("discount"),
  price = document.getElementById("cena");
let count = 0;

// document.querySelector(".submit").addEventListener('click', sliderChange);
document.querySelector("#calcButton").addEventListener('click', calcDisplay);
document.querySelector("#exitButton").addEventListener('click', calcDisplay);


function calcDisplay() {
  count += 1;

  if (count % 2) {

    document.querySelector('#calculator').style.display = "block";
  } else {
    document.querySelector('#calculator').style.display = "none";
  };

}
function sliderChange() {
  let discount = 0;
  let value = slider.value;




  if (value <= 5) discount = 0;
  else if (value > 5 && value < 11) discount = 0.05;
  else if (value >= 11) discount = 0.1;

  if (checkBox.checked == true && value) discount += 0.15;



  output.innerHTML = `${slider.value} osób`;
  discountHTML.innerHTML = `${discount * 100} %`;
  price.innerHTML = `${20000 - 20000 * discount} zł`;

}

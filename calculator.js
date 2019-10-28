const slider = document.getElementById("myRange");
const output = document.getElementById("demo");
const checkBox = document.getElementById("checkbox");
const discountHTML = document.getElementById("discount");
const price = document.getElementById("cena");
var count = 0;

// document.querySelector(".submit").addEventListener('click', sliderChange);
document.querySelector("#calcButton").addEventListener('click', calcDisplay);
document.querySelector("#exitButton").addEventListener('click', calcDisplay);


function calcDisplay() {
    count++;
    console.log(count);
  if(count % 2 !=0) {
      
    document.querySelector('#calculator').style.display = "block";
    console.log('PARZYSTE');}
  else {
    document.querySelector('#calculator').style.display = "none";  
    console.log("NIEPARZYSTE")}
    
}
function sliderChange() {
    var discount = 0;
    let value = slider.value;
    console.log("slider: " + slider.value)
    console.log(value);
    
  
  
        if(value <=5)  discount=0;
        else if(value >5 && value <11)  discount = 0.05;
        else if (value>=11)  discount = 0.1;

        if(checkBox.checked == true && value)  discount += 0.15;


      console.log(value)
    console.log(discount);
    output.innerHTML = `${slider.value} osób`;
    discountHTML.innerHTML = `${discount*100} %`;
    console.log("discount" + discount)
    price.innerHTML = `${20000-20000 * discount} zł`

}

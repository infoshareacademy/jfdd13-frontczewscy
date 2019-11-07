// UWAGI AS: kod zamknac w funkcji samowykonujacej sie

const slider = document.getElementById("myRange");
const output = document.getElementById("demo");
const checkBox = document.getElementById("checkbox");
const discountHTML = document.getElementById("discount");
const price = document.getElementById("cena");
var count = 0; // UWAGI AS: var.... ech... let let let it be

// document.querySelector(".submit").addEventListener('click', sliderChange);
document.querySelector("#calcButton").addEventListener('click', calcDisplay);
document.querySelector("#exitButton").addEventListener('click', calcDisplay);


function calcDisplay() {
    count++; // UWAGI AS: zaleca sie stosowanie formy 'count += 1', kod jest wydajniejszy
    console.log(count); // UWAGI AS: na produkcji (masterze nie mamy console.logow)
  if(count % 2 !=0) { // UWAGI AS: wystarczyla by forma 'if (count%2){}', brakuje spacji po !=
      
    document.querySelector('#calculator').style.display = "block";
    console.log('PARZYSTE');} // UWAGI AS: console.log + zakkmniecia ifow robimy w nowej lini zazwyczaj
  else {
    document.querySelector('#calculator').style.display = "none";  
    console.log("NIEPARZYSTE")}
    
}
/* UWAGI AS: poprawny if
if () {
  //kod
} else {
  //kod
}
*/
function sliderChange() {
    var discount = 0;
    let value = slider.value;
    console.log("slider: " + slider.value)
    console.log(value);
    
  // UWAGI AS: wcięcia, spacje
  
        if(value <=5)  discount=0; // UWAGI AS: podwojne spacje
        else if(value >5 && value <11)  discount = 0.05;
        else if (value>=11)  discount = 0.1; // UWAGI AS: j/w

        if(checkBox.checked == true && value)  discount += 0.15; // UWAGI AS: j/w


      console.log(value) // UWAGI AS: console.log
    console.log(discount);
    output.innerHTML = `${slider.value} osób`;
    discountHTML.innerHTML = `${discount*100} %`;
    console.log("discount" + discount)
    price.innerHTML = `${20000-20000 * discount} zł`// UWAGI AS: brak konsekwencji ze średnikami... albo ich uzywacie, albo nie. konsekwentnie w calym kodzie

}

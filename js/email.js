const emailInput = document.querySelector("#email");
const form = document.querySelector(".premiere__form");
const submit = document.querySelector("#submit");
const emailInfo = document.querySelector(".emailInfo");

function addToLocal() {
    localStorage.setItem('email', true);
}


if (localStorage.getItem('email') == "true") {
    emailInfo.innerHTML = `
        <p id="info">Dziękujemy za podanie maila <a href="./game.html">Teraz możesz zagrać w gre</a></p>
        
    `
    setTimeout(() =>{
        emailInfo.innerHTML = ``;
        localStorage.setItem('email', false);
    }, 5000);
}

form.addEventListener("submit", addToLocal)
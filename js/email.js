(function () {
    const emailInput = document.querySelector("#email"),
        form = document.querySelector(".premiere__form"),
        submit = document.querySelector("#submit"),
        emailInfo = document.querySelector(".emailInfo");
        

    function addToLocal() {
        localStorage.setItem('email', true);
    }

    function removePopup() {
        emailInfo.innerHTML = ``;
        localStorage.setItem('email', false);
    }


    if (localStorage.getItem('email') == "true") {
        emailInfo.innerHTML = `
            
            <div class="popup" >
                <span class="exitBtn" id="exitEmailInfo" >X</span>
                <p>Dziekujemy za podanie maila.</p>
                <p><a class="link" href="./game.html">Teraz możesz zagrać w gre.</p>
                <p>Kliknij tutaj.</a></p>
            </div>
        `
        const exitEmail = document.querySelector("#exitEmailInfo");
        exitEmail.addEventListener('click', removePopup)
  
        setTimeout(removePopup, 8000);
    }

    form.addEventListener("submit", addToLocal);
})()


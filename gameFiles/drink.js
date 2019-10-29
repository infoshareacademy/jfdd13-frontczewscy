//Pojawienie sie obiektu co 1,5 sekundy
var spawnRate = 1500;


function spawnRandomObject() {
    const board = document.querySelector('.board');

    //Obiekty zaczynaja od okreslonego polozenia
    var spawnLineY = Math.random() * 470;
    var spawnLineX = Math.random() * 470;
    
var t;

//Random od 0 do 1 czy bedzie pierwszy drink czy drugi
    if (Math.random() < 0.50) {
        t = "black";
    } else {
        t = "green";
    }



//Tworzenie obiektu (drinkow)
    var object = {
        type: t,
        x: Math.random() * (board.width - 30) + 15,
        y: spawnLineY,
        x: spawnLineX,
    }


    const div = document.createElement('div');
    div.classList.add('t');

    div.style.top = object.y + 'px';
    div.style.left = object.x + 'px';

    board.appendChild(div);
}

setInterval(spawnRandomObject, spawnRate)
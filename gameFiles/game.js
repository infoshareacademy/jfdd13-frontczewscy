const board = document.querySelector(".board");
const suppBoard = document.querySelector('#support-board');
let keys = [];
let moveSpeed = 5;
let moveX;
let moveY;


// Class for making Player in game;
class Player {
  constructor(box) {
    this.box = document.querySelector(box);
    this.y = this.box.offsetTop;
    this.x = this.box.offsetLeft;
    this.w = this.box.offsetWidth;
    this.h = this.box.offsetHeight;
  }
}

// 
class DomControl {
  static randomSpawn(player) {
    player.x = Math.floor(Math.random() * 40) * 10;
    player.y = Math.floor(Math.random() * 40) * 10;
  }
  static checkCollision(object1, object2, collisionFunction) {
    if (
      object1.offsetTop < object2.offsetTop + object2.offsetWidth &&
      object1.offsetTop + object1.offsetWidth > object2.offsetTop &&
      object1.offsetLeft < object2.offsetLeft + object2.offsetHeight &&
      object1.offsetLeft + object1.offsetHeight > object2.offsetLeft
    ) {
      collisionFunction();
    }
  }
  static endGame() {
    alert('gameOver');
    keys = [];
    DomControl.randomSpawn(player1);
    DomControl.randomSpawn(enemy);
  }
}


const player1 = new Player("#player1");
const enemy = new Player("#enemy");

function keyPressed(event) {
  keys[event.keyCode] = true;
}
function keyReleased(event) {
  keys[event.keyCode] = false;
}
let randomDirections = [];

let makerandom = setInterval(() => {
  randomDirections = [
    Math.random() >= 0.5,
    Math.random() >= 0.5,
    Math.random() >= 0.5,
    Math.random() >= 0.5,
  ]
}, 800)
let allElements = []


function animate() {
  player1.box.style.left = player1.x + "px";
  player1.box.style.top = player1.y + "px";
  enemy.box.style.left = enemy.x + "px";
  enemy.box.style.top = enemy.y + "px";

  if (keys[37] && player1.x > 0) {
    player1.x -= moveSpeed;
  }
  if (keys[38] && player1.y > 0) {
    player1.y -= moveSpeed;
  }
  if (keys[39] && player1.x < board.offsetWidth - player1.w) {
    player1.x += moveSpeed;
  }
  if (keys[40] && player1.y < board.offsetHeight - player1.h) {
    player1.y += moveSpeed;
  }  
  // enemy.x -= moveSpeed
  if (randomDirections[0] && enemy.x > 0) {
    enemy.x -= moveSpeed / 2;
  }
  if (randomDirections[1] && enemy.y  > 0) {
    enemy.y -= moveSpeed / 2 ;
  }
  if (randomDirections[2] && enemy.x < board.offsetWidth - enemy.w) {
    enemy.x += moveSpeed / 2;
  }
  if (randomDirections[3] && enemy.y < board.offsetHeight - enemy.h) {
    enemy.y += moveSpeed / 2;
  } 
  // console.log(keys);
  DomControl.checkCollision(player1.box, enemy.box, DomControl.endGame);

  if (allElements.length > 2){
    clearInterval(drinkRefreshing);
  }
  addDrinkToBoard();
  drinkCollision();
  requestAnimationFrame(animate);
}
animate();


DomControl.randomSpawn(player1);
DomControl.randomSpawn(enemy);

document.addEventListener("keydown", keyPressed);
document.addEventListener("keyup", keyReleased);

//Pojawienie sie obiektu co 5,5 sekundy
var spawnRate = 5500;


function spawnRandomObject() {
    

    //Obiekty zaczynaja od okreslonego polozenia
    var spawnLineY = Math.random() * 470;
    var spawnLineX = Math.random() * 470;
    
    var t;

//Random od 0 do 1 czy bedzie pierwszy drink czy drugi
    if (Math.random() < 0.50) {
        t = 'url("gameFiles/drinkYellow.png")';
        console.log(t)
    } else {
        t = 'url("gameFiles/drinkGreen.png")';
    }
    const div = document.createElement('div');


//Tworzenie obiektu (drinkow)
    var object = {
        box: div,
        type: t,
        x: Math.random() * (board.width - 30) + 15,
        y: spawnLineY,
        x: spawnLineX,
    }

    
    div.classList.add('t');
    div.style.background = t;
    div.style.top = object.y + 'px';
    div.style.left = object.x + 'px';

    allElements.push(object);
}

// Takes all elements from allElements & put them in the support board
function addDrinkToBoard() {
  suppBoard.innerHTML = "";
  allElements.forEach((element) => {
    suppBoard.appendChild(element.box)
  })
}




// Deleting elements from array
function collectDrink(index) {
  allElements.splice(index,1)
}
// For each element in allElements array start a function 
function drinkCollision() {
  allElements.forEach((element, index) => {
    DomControl.checkCollision(element.box, player1.box, () => {
      collectDrink(index)
    });
    DomControl.checkCollision(element.box, enemy.box, () => {
      collectDrink(index)
    });
  })
}

let drinkRefreshing = setInterval(spawnRandomObject, spawnRate)


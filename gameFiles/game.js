// getting dom elements
const board = document.querySelector(".board");
const suppBoard = document.querySelector("#support-board");

// configuration
let keys = [];
let randomDirections = [];
let drinksArray = [];
let playerSpeed = 5;
let enemySpeed = 2;
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

// Class for controling the dom elements
class DomControl {
  // static function that spawns object in random position on the board;
  static randomSpawn(player) {
    player.x = Math.floor(Math.random() * 40) * 10;
    player.y = Math.floor(Math.random() * 40) * 10;
  }
  // static function that looks for the collision between two objects
  // when it detects the collision it calls the function that is passed in parameter
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

  // ends the game
  static endGame() {
    alert("gameOver");
    keys = [];
    drinksArray = [];
    DomControl.randomSpawn(player1);
    DomControl.randomSpawn(enemy);
  }
}

// creates new objects using Player class
const player1 = new Player("#player1");
const enemy = new Player("#enemy");

// helping functions for detecting which key is pressed and released at a given time;
function keyPressed(event) {
  keys[event.keyCode] = true;
}
function keyReleased(event) {
  keys[event.keyCode] = false;
}

// function for moving the player
function movePlayer() {
  player1.box.style.left = player1.x + "px";
  player1.box.style.top = player1.y + "px";

  if (keys[37] && player1.x > 0) {
    player1.x -= playerSpeed;
  }
  if (keys[38] && player1.y > 0) {
    player1.y -= playerSpeed;
  }
  if (keys[39] && player1.x < board.offsetWidth - player1.w) {
    player1.x += playerSpeed;
  }
  if (keys[40] && player1.y < board.offsetHeight - player1.h) {
    player1.y += playerSpeed;
  }
}

// interval function that is responsible for making random move of the enemy
let makeRandomMove = setInterval(() => {
  randomDirections = [
    Math.random() >= 0.5,
    Math.random() >= 0.5,
    Math.random() >= 0.5,
    Math.random() >= 0.5
  ];
}, 800);

// function for moving the enemy
function moveEnemy() {
  enemy.box.style.left = enemy.x + "px";
  enemy.box.style.top = enemy.y + "px";

  if (randomDirections[0] && enemy.x > 0) {
    enemy.x -= enemySpeed;
  }
  if (randomDirections[1] && enemy.y > 0) {
    enemy.y -= enemySpeed;
  }
  if (randomDirections[2] && enemy.x < board.offsetWidth - enemy.w) {
    enemy.x += enemySpeed;
  }
  if (randomDirections[3] && enemy.y < board.offsetHeight - enemy.h) {
    enemy.y += enemySpeed;
  }
}

// function that is responsible for frame-by-frame playback
function animate() {
  movePlayer();
  moveEnemy();
  DomControl.checkCollision(player1.box, enemy.box, DomControl.endGame);

  if (drinksArray.length > 2) {
    clearInterval(drinkRefreshing);
  }
  addDrinkToBoard();
  drinkCollision();
  requestAnimationFrame(animate);
}
animate();

// random spawn of the objects at start;
DomControl.randomSpawn(player1);
DomControl.randomSpawn(enemy);

// listening for pressed keys
document.addEventListener("keydown", keyPressed);
document.addEventListener("keyup", keyReleased);

// Appearance of the new drink every 5.5 seconds
var spawnRate = 5500;

function spawnDrinks() {
  // Setting random spawn point for the drinks
  let spawnLineY = Math.random() * 470;
  let spawnLineX = Math.random() * 470;

  let color;

  //Random od 0 do 1 czy bedzie pierwszy drink czy drugi
  if (Math.random() < 0.5) {
    color = "black";
  } else {
    color = "green";
  }

  // creating new div that will contain drink
  const div = document.createElement("div");

  //Tworzenie obiektu (drinkow)
  var drink = {
    box: div,
    type: color,
    x: Math.random() * (board.width - 30) + 15,
    y: spawnLineY,
    x: spawnLineX
  };

  // styling of the drink
  div.classList.add("drink");
  div.style.backgroundColor = color;
  div.style.top = drink.y + "px";
  div.style.left = drink.x + "px";

  // push new drink to the Array of the drinks
  drinksArray.push(drink);
}

// Takes all elements from drinksArray & put them in the support board
function addDrinkToBoard() {
  suppBoard.innerHTML = "";
  drinksArray.forEach(element => {
    suppBoard.appendChild(element.box);
  });
}

// Deleting elements from array
function collectDrink(index) {
  clearInterval(drinkRefreshing);
  drinksArray.splice(index, 1);
  drinkRefreshing = setInterval(spawnDrinks, spawnRate);
}
// For each element in drinksArray array start a function that looks for collisions between boxes
function drinkCollision() {
  drinksArray.forEach((element, index) => {
    DomControl.checkCollision(element.box, player1.box, () => {
      collectDrink(index);
    });
    DomControl.checkCollision(element.box, enemy.box, () => {
      collectDrink(index);
    });
  });
}

// start the interval that spawns drinks
let drinkRefreshing = setInterval(spawnDrinks, spawnRate);

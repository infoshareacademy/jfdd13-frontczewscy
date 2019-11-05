// getting dom elements
const board = document.querySelector(".board");
const suppBoard = document.querySelector("#support-board");
const pointsBoard = document.querySelector("#points");
const openInstr = document.querySelector(".btnInstr");
const popup = document.querySelector(".popup-wrapper");
const startButton = document.querySelector(".startButton");
const timer = document.querySelector(".timer");
const close = document.querySelector(".popup-close");

// configuration
let keys = [];
let randomDirections = [];
let drinksArray = [];
let playerSpeed = 5;
let enemySpeed = 2;
let moveX;
let moveY;
let playerPoints = 0;
let timeInterval;
let drinkRefreshing;
let makeMove;


// class for making message box
class Message {
  constructor(text, timeOut) {
    this.box = document.createElement("div");
    this.text = text;
    this.timeOut = timeOut || 1000;
  }
  renderMessage() {
    this.box.innerHTML = `<h2>${this.text}<h2>`;
    this.box.classList.add("pop-up");
    document.body.appendChild(this.box);
    setTimeout(() => {
      this.removeFromDom();
    }, this.timeOut);
  }
  removeFromDom() {
    this.box.classList.add("remove");
    this.box.addEventListener("animationend", () => {
      this.box.remove();
    });
  }
}

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
    player.x = Math.floor(Math.random() * 57) * 10;
    player.y = Math.floor(Math.random() * 57) * 10;
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
  static endGame(msg) {
    keys = [];
    // deletes drinks from the board
    drinksArray = [];

    // moves players to random spot on the board
    DomControl.randomSpawn(player1);
    DomControl.randomSpawn(enemy);

    // turns off the timer
    clearInterval(timeInterval);

    // set playerPoints to 0
    // not best place to hold it
    playerPoints = 0;

    // create messageBox with msg and 2 sec
    const message = new Message(msg, 2000);
    message.renderMessage();

    // removes listeners for keys, disable moving of the player
    document.removeEventListener("keydown", keyPressed);
    document.removeEventListener("keyup", keyReleased);

    // turns off enemy moves
    makeRandomMove(false);
    randomDirections = [];

    // stops drinks from appearing
    clearInterval(drinkRefreshing);
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

function changeRandomDirection() {
  randomDirections = [
    Math.random() >= 0.5,
    Math.random() >= 0.5,
    Math.random() >= 0.5,
    Math.random() >= 0.5
  ];
}

function makeRandomMove(state) {
  console.log("before", makeMove);
  if (state) {
    makeMove = setInterval(changeRandomDirection, 800);
  } else {
    clearInterval(makeMove);
  }
  console.log("after", makeMove);
}

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
  DomControl.checkCollision(player1.box, enemy.box, () => {
    DomControl.endGame("Game over");
  });

  if (drinksArray.length > 2) {
    clearInterval(drinkRefreshing);
  }

  drawPoints();
  addDrinkToBoard();
  drinkCollision();

  requestAnimationFrame(animate);
}
animate();

// random spawn of the objects at start;
DomControl.randomSpawn(player1);
DomControl.randomSpawn(enemy);

// Appearance of the new drink every 5.5 seconds
var spawnRate = 5500;

function spawnDrinks() {
  // Setting random spawn point for the drinks
  let spawnLineY = Math.random() * 570;
  let spawnLineX = Math.random() * 570;

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

// Collecting drinks by player
function addPlayerPoints() {
  console.log("Point for player");
  playerPoints++;
}

// Collecting drinks by enemy
function addEnemyPoints() {
  console.log("Point for enemy");
  playerPoints--;
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
      addPlayerPoints();
      const message = new Message("Point for Player");
      message.renderMessage();
    });
    DomControl.checkCollision(element.box, enemy.box, () => {
      collectDrink(index);
      addEnemyPoints();
      const message = new Message("Enemy gain your point");
      message.renderMessage();
    });
  });
}

function drawPoints() {
  pointsBoard.innerHTML = `
    <h2>Your points</h2>
    <p>${playerPoints}</p>
  `;
}

function startGame() {
  //start the timer
  timerFunction();

  // makes random move of the enemy
  makeRandomMove(true);

  // listening for pressed keys
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);

  // Adds drinks to the board in spawnRate time
  drinkRefreshing = setInterval(spawnDrinks, spawnRate);
}

function timerFunction() {  
  let sec = 60;
  // set the timer
  timer.innerText = "01:00";
  //set the amount of seconds
  clearInterval(timeInterval);
    timeInterval = setInterval(function() {
      sec--;
      if (sec < 10) timer.innerHTML = `00: 0${sec}`;
      else timer.innerHTML = `00: ${sec}`;
      if (sec == 0) {
        // po skończeniu czasu gra się kończy
        DomControl.endGame("Time ends");
        clearInterval(timeInterval);
  
        // po skończeniu czasu gra się kończy
        DomControl.endGame("Time ends");
      }
    }, 1000);  
}

openInstr.addEventListener("click", () => {
  popup.style.display = "block";
});

startButton.addEventListener("click", startGame);

close.addEventListener("click", () => {
  popup.style.display = "none";
  startButton.style.display = "block";
});

// getting dom elements
const board = document.querySelector(".board"),
    suppBoard = document.querySelector("#support-board"),
    pointsBoard = document.querySelector("#points"),
    highestPoints = document.querySelector("#highest-point"),
    openInstr = document.querySelector(".btnInstr"),
    popup = document.querySelector(".popup-wrapper"),
    startButton = document.querySelector(".startButton"),
    timer = document.querySelector(".timer"),
    close = document.querySelector(".popup-close"),
    endGameScreen = document.querySelector("#end-game");

// configuration
let keys = [],
    randomDirections1 = [],
    randomDirections2 = [],
    drinksArray = [],
    enemySpeed = 2,
    moveX,
    moveY,
    playerPoints = 0,
    timeInterval,
    drinkRefreshing,
    makeMove1,
    makeMove2,
    randomPosition =  57;

let highest = localStorage.getItem('hight');

    
const playerSpeed = 5;
// Appearance of the new drink every 1.0 seconds
const spawnRate = 1000;



// class for making message box
class Message {
  constructor(text, timeOut, top) {
    this.box = document.createElement("div");
    this.text = text;
    this.timeOut = timeOut || 1000;
    this.top = top || "";
  }
  renderMessage() {    
    this.box.style.top = `${this.top}%`
    this.box.innerHTML = `<h2>${this.text}<h2>`;
    this.box.classList.add("message");
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
    player.x = Math.floor(Math.random() * randomPosition) * 10;
    player.y = Math.floor(Math.random() * randomPosition) * 10;
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
    DomControl.randomSpawn(player);
    DomControl.randomSpawn(enemy1);

    // turns off the timer
    clearInterval(timeInterval);

    // create messageBox with msg on 2 sec
    const message = new Message(msg, 2000, 30);
    message.renderMessage();

    // removes listeners for keys, disable moving of the player
    document.removeEventListener("keydown", keyPressed);
    document.removeEventListener("keyup", keyReleased);

    // turns off enemy moves
    makeRandomMove1(false);
    makeRandomMove2(false);
    
    randomDirections1 = [];
    randomDirections2 = [];

    // stops drinks from appearing
    clearInterval(drinkRefreshing);

    // set hightscore and show end game screen
    setTimeout(setHightScore, 1500, playerPoints, msg)
  }
}

// creates new objects using Player class
const player = new Player("#player");
const enemy1 = new Player("#enemy1");
const enemy2 = new Player("#enemy2");

// getting enemys dom properties  
const enemys = [
  enemy1.box,
  enemy2.box
]

// helping functions for detecting which key is pressed and released at a given time;
function keyPressed(event) {
  keys[event.keyCode] = true;
}
function keyReleased(event) {
  keys[event.keyCode] = false;
}

// function for moving the player
function movePlayer() {
  player.box.style.left = player.x + "px";
  player.box.style.top = player.y + "px";

  if (keys[37] && player.x > 0) {
    player.x -= playerSpeed;
  }
  if (keys[38] && player.y > 0) {
    player.y -= playerSpeed;
  }
  if (keys[39] && player.x < board.offsetWidth - player.w) {
    player.x += playerSpeed;
  }
  if (keys[40] && player.y < board.offsetHeight - player.h) {
    player.y += playerSpeed;
  }
}

// can't make it in one function :(
function changeRandomDirection1() {
  randomDirections1 = [
    Math.random() >= 0.5,
    Math.random() >= 0.5,
    Math.random() >= 0.5,
    Math.random() >= 0.5
  ];
}

function changeRandomDirection2() {
  randomDirections2 = [
    Math.random() >= 0.5,
    Math.random() >= 0.5,
    Math.random() >= 0.5,
    Math.random() >= 0.5
  ];
}

function makeRandomMove1(state) {
  clearInterval(makeMove1);
  if (state) {
    makeMove1 = setInterval(changeRandomDirection1, 800);
  }
}

function makeRandomMove2(state) {
  clearInterval(makeMove2);
  if (state) {
    makeMove2 = setInterval(changeRandomDirection2, 800);
  }
}


function moveEnemy(enemy, randomDirections) {
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
  moveEnemy(enemy1, randomDirections1);
  moveEnemy(enemy2, randomDirections2);

  enemys.forEach(enemy => {
    DomControl.checkCollision(player.box, enemy, () => {
      DomControl.endGame("Żul Cię dopadł");
    });
  })

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
DomControl.randomSpawn(player);
DomControl.randomSpawn(enemy1);

function spawnDrinks() {
  // creating new div that will contain drink
  const div = document.createElement("div");

  // Setting random spawn point for the drinks
  let spawnLineY = Math.floor(Math.random() * 57) * 10; 
  let spawnLineX = Math.floor(Math.random() * 57) * 10;

  let points = 2;
  let nameClass = "yellow";

  //Random od 0 do 1 czy bedzie pierwszy drink czy drugi
  if (Math.random() < 0.75) {
    nameClass = "green";
    points = 1;
  };

  //Tworzenie obiektu (drinkow)
  const drink = {
    box: div,
    y: spawnLineY,
    x: spawnLineX,
    weight: points
  };

  // styling of the drink
  div.classList.add("drink");
  div.classList.add(nameClass);
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
    let addY;
    if (element.weight == 1) {
      addY = "";
    } else {
      addY = "y";
    }
    DomControl.checkCollision(element.box, player.box, () => {
      collectDrink(index);
      addPlayerPoints(element.weight);
      
      const message = new Message(`${element.weight} punkt${addY} dla gracza`);
      message.renderMessage();
    });

    enemys.forEach(enemy => {
      DomControl.checkCollision(element.box, enemy, () => {
        collectDrink(index);
        addEnemyPoints(element.weight);
        const message = new Message(`Przeciwnik zabrał Ci ${element.weight} punkt${addY}`);
        message.renderMessage();
      });
    })
  });
}

// Collecting drinks by player
function addPlayerPoints(point) {
  playerPoints += point;
}

// Collecting drinks by enemy
function addEnemyPoints(point) {
  playerPoints -= point;
}

function drawPoints() {
  pointsBoard.innerHTML = `
    <h2>Your points</h2>
    <p>${playerPoints}</p>
  `;
}

function drawHeightPoints() {
  
  highestPoints.innerHTML = `
    <h2>Highest points</h2>
    <p>${(highest != null) ? highest : 0}</p>
  `
}

drawHeightPoints();

function startGame() {
  // inforamtion for player at start of the game
  const message = new Message("Masz minute, śpiesz się!", 2500, 30);
  message.renderMessage();  
  
  //start the timer
  timerFunction();  

  // makes random move of the enemy

  makeRandomMove1(true);

  // listening for pressed keys
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);

  //
  drawHeightPoints()

  // 
  drinksArray = [];
  clearInterval(drinkRefreshing);

  // Adds drinks to the board in spawnRate time
  drinkRefreshing = setInterval(spawnDrinks, spawnRate);

  // turn off the endgamescrren
  endGameScreen.classList.remove('shown');

  // set player points to 0
  playerPoints = 0;

  // set enemSpeed to 2
  enemySpeed = 2;

  
  enemy2.box.style.pointerEvents = "none";
  enemy2.box.style.transform = "scale(0)";
  setTimeout(() => {
    enemy2.x = -40;
    enemy2.y = 0;
  }, 1000);
  
}

function timerFunction() {
  let sec = 60;
  // set the timer
  timer.innerText = "01 : 00";
  //set the amount of seconds
  clearInterval(timeInterval);
  timeInterval = setInterval(function() {
    sec--;
    
    if (sec == 40) {
      const message = new Message("Poziom trudności wzrasta", 2500, 30);
      message.renderMessage();

      enemy2.x = 0;

      enemy2.box.style.pointerEvents = "all";
      enemy2.box.style.transform = "scale(1)";
      makeRandomMove2(true);
    }
    if (sec == 25 ) {
      const message = new Message("Poziom trudności ponownie wzrasta", 2500, 30);
      message.renderMessage();

      enemySpeed = 5;
    }

    if (sec < 10) timer.innerHTML = `00 : 0${sec}`
    else timer.innerHTML = `00 : ${sec}`; 
    if (sec == 0) {
      // at end of the time game ends
      DomControl.endGame("Czas się skończył");
      clearInterval(timeInterval);
    }
  }, 1000);
};

function showEndGameScreen(points, highest, msg, moreInfo) {
  endGameScreen.innerHTML = `
    <div class="end-game_close">x</div>
    <h2>${msg}</h2>
    <p>${moreInfo}</p>
    <p>Liczba zdobytych punktów: ${points}</p>
    <p>Najwięcej zdobytych punktów: ${highest}</p>
  `;
  const endGameCloseBtn = document.querySelector('.end-game_close');
  endGameCloseBtn.addEventListener('click', () => {    
    endGameScreen.classList.remove('shown');
  });
  endGameScreen.classList.add('shown');

  drawHeightPoints();

  // set playerPoints to 0
  playerPoints = 0;
}

function setHightScore(points, msg) {
  

  if (highest === null) {
    localStorage.setItem('hight', points)
    highest = localStorage.getItem('hight')
  }
  if (highest < points) {
    localStorage.setItem('hight', points)
    highest = localStorage.getItem('hight')
    showEndGameScreen(points, highest, msg, "Brawo pobiłeś swój najlepszy wynik");
  } else if (highest > points) {
    showEndGameScreen(points, highest, msg, "Próbuj dalej pobić swój najlepszy wynik");
  } else {
    showEndGameScreen(points, highest, msg, "Udało Ci się zrównać ze swoim najlepszym wynikiem");
  }
}

openInstr.addEventListener("click", () => {
  popup.style.display = "block";
});

startButton.addEventListener("click", startGame);

close.addEventListener("click", () => {
  popup.style.display = "none";
  startButton.style.display = "block";
});

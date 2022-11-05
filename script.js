const grid = document.querySelector(".grid");
const startButton = document.getElementById("start");
const scoreDisplay = document.getElementById("score");
let squares = [];
let currentSnake = [0, 1, 2];
let direction = 1;
let appleIndex = 0;
let score = 0;
let timerID = 0;
let intervalTime = 1000;
const speed = 0.9;
// let start = false;

(function createGrid() {
  for (let i = 0; i < 100; i++) {
    let square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
})();

function startGame() {
  currentSnake.forEach((index) => squares[index].classList.remove("snake"));
  squares[appleIndex].classList.remove("apple");
  clearInterval(timerID);
  direction = 1;
  currentSnake = [0, 1, 2];
  score = 0;
  scoreDisplay.innerText = score;
  intervalTime = 1000;
  generateApple();
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  timerID = setInterval(move, intervalTime);
}
startButton.addEventListener("click", startGame);

function move() {
  if (
    (currentSnake.slice(-1)[0] + 10 >= 100 && direction === 10) ||
    (currentSnake.slice(-1)[0] - 10 < 0 && direction === -10) ||
    (currentSnake.slice(-1)[0] % 10 === 9 && direction === 1) ||
    (currentSnake.slice(-1)[0] % 10 === 0 && direction === -1) ||
    squares[currentSnake.slice(-1)[0] + direction].classList.contains("snake")
  ) {
    return clearInterval(timerID);
  }
  let snakeLength = currentSnake.length;
  let head = currentSnake[snakeLength - 1];
  currentSnake.push(head + direction);
  let tail = currentSnake.shift();
  squares[tail].classList.remove("snake");
  if (head + direction === appleIndex) {
    squares[appleIndex].classList.remove("apple");
    currentSnake.unshift(tail);
    generateApple();
    score++;
    scoreDisplay.innerText = score;
    clearInterval(timerID);
    intervalTime *= speed;
    timerID = setInterval(move, intervalTime);
  }
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
}
// timerID = setInterval(move, intervalTime);
function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * 100);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}

function control(e) {
  if (e.keyCode === 37) {
    direction = -1;
  } else if (e.keyCode === 38) {
    direction = -10;
  } else if (e.keyCode === 39) {
    direction = 1;
  } else if (e.keyCode === 40) {
    direction = 10;
  }
}

document.addEventListener("keydown", control);

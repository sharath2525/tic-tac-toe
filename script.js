let cells = document.querySelectorAll(".cell");
const gamestatus = document.getElementsByClassName("status")[0];
const restart = document.getElementsByClassName("restart")[0];

let currentPlayer = "x";
let gameIsOver = false;
let winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const updateStatusText = () => {
  gamestatus.innerHTML = `Now player ${currentPlayer}'s turn`;
};

const checkForWinner = () => {
  winningConditions.forEach((combination) => {
    let check = combination.every(
      (index) => cells[index].innerHTML.trim() === currentPlayer
    );
    if (check) {
      gamestatus.innerHTML = `${currentPlayer} won the game`;
      gameIsOver = true;

      combination.forEach((index) => {
        cells[index].classList.add("winning-cell");
        cells[index].style.color = "blue";
      });
    }
  });
};

const checkForDraw = () => {
  if (![...cells].some((cell) => cell.innerHTML.trim() === "") && !gameIsOver) {
    gamestatus.innerHTML = "It's a draw!";
    gameIsOver = true;
  }
};

updateStatusText();

cells = Array.from(cells);
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (gameIsOver || cell.innerHTML.trim() !== "") return;
    cell.innerHTML = currentPlayer;
    checkForWinner();
    checkForDraw();

    if (!gameIsOver) {
      currentPlayer = currentPlayer === "x" ? "o" : "x";
      updateStatusText();
    }
  });
});

restart.addEventListener("click", () => {
  restartGame();
});

const restartGame = () => {
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("winning-cell");
    cell.style.color = ""; 
  });

  currentPlayer = "x";
  gameIsOver = false;

  updateStatusText();
};
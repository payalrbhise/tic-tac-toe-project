const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        let index = cell.getAttribute("data-index");

        if (board[index] === "" && gameActive) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.style.pointerEvents = "none";
            checkWin();
            if (gameActive) {
                currentPlayer = (currentPlayer === "X") ? "O" : "X";
                statusText.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    });
});

function checkWin() {
    for (let condition of winningConditions) {
        let [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.innerHTML = `<b>🎉 Player ${currentPlayer} Wins! 🏆</b>`;
            gameActive = false;
            return;
        }
    }

    if (!board.includes("")) {
        statusText.innerHTML = `<b>It's a Draw! 🤝</b>`;
        gameActive = false;
    }
}

restartBtn.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.pointerEvents = "auto";
    });
    gameActive = true;
    currentPlayer = "X";
    statusText.innerHTML = "Player X's turn";
});

document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const message = document.getElementById("message");
    const resetButton = document.getElementById("resetButton");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    const handleCellClick = (index) => {
        if (gameBoard[index] === "" && !checkWinner()) {
            gameBoard[index] = currentPlayer;
            renderBoard();
            if (!checkWinner()) {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                message.innerText = `Player ${currentPlayer}'s turn`;
            }
        }
    };
    const renderBoard = () => {
        board.innerHTML = "";
        gameBoard.forEach((value, index) => {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.innerText = value;
            cell.addEventListener("click", () => handleCellClick(index));
            board.appendChild(cell);
        });
    };
    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                message.innerText = `Player ${gameBoard[a]} wins!`;
                return true;
            }
        }

        if (!gameBoard.includes("")) {
            message.innerText = "It's a draw!";
            return true;
        }

        return false;
    };

    const resetGame = () => {
        currentPlayer = "X";
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        message.innerText = `Player ${currentPlayer}'s turn`;
        renderBoard();
    };
    resetButton.addEventListener("click", resetGame);
    renderBoard();
});

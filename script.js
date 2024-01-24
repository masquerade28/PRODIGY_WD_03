let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let mode = 'twoPlayer'; // Default mode

function changeMode() {
    mode = document.getElementById('mode').value;
    resetGame();
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    updateBoard();
    updateMessage('');
}

function handleCellClick(event) {
    if (gameOver) return;

    const cellIndex = event.target.dataset.index;

    if (board[cellIndex] === '') {
        board[cellIndex] = currentPlayer;
        checkWinner();
        if (mode === 'vsAI' && !gameOver) {
            playAI();
        }
        updateBoard();
        switchPlayer();
    }
}

function playAI() {
    const bestMove = getBestMove(board, 'O');
    board[bestMove.index] = 'O';
    checkWinner();
    updateBoard();
    switchPlayer();
}

function getBestMove(board, player) {
    const emptyCells = board.reduce((acc, val, index) => val === '' ? acc.concat(index) : acc, []);

    if (checkWinnerForPlayer(board, 'X')) {
        return { score: -1 };
    } else if (checkWinnerForPlayer(board, 'O')) {
        return { score: 1 };
    } else if (emptyCells.length === 0) {
        return { score: 0 };
    }

    const moves = [];

    for (const emptyCell of emptyCells) {
        const move = {};
        move.index = emptyCell;
        board[emptyCell] = player;

        if (player === 'O') {
            const result = getBestMove(board, 'X');
            move.score = result.score;
        } else {
            const result = getBestMove(board, 'O');
            move.score = result.score;
        }

        board[emptyCell] = '';
        moves.push(move);
    }

    let bestMove;
    if (player === 'O') {
        let bestScore = -Infinity;
        for (const move of moves) {
            if (move.score > bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        }
    } else {
        let bestScore = Infinity;
        for (const move of moves) {
            if (move.score < bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        }
    }

    return bestMove;
}

function checkWinnerForPlayer(board, player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }

    return false;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
            gameOver = true;
            updateMessage(`${board[a]} wins!`);
            return;
        }
    }

    if (!board.includes('')) {
        gameOver = true;
        updateMessage('It\'s a draw!');
    }
}

function updateBoard() {
    const boardElement = document.getElementById('board');
        boardElement.innerHTML = '';
        for (let i = 0; i < board.length; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.textContent = board[i];
            boardElement.appendChild(cell);
        }
}

function updateMessage(msg) {
    document.getElementById('message').textContent = msg;
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}


function updateTurn() {
    document.getElementById('turn').textContent = `Turn: ${currentPlayer}`;
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurn();
}

// ... (existing JavaScript code remains unchanged) ...

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    updateBoard();
    updateMessage('');
    updateTurn();
}

// ... (existing JavaScript code remains unchanged) ...


// Initial setup
resetGame();
updateTurn(); // Display the initial turn
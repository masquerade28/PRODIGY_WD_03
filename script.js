// Initialize variables
let currentPlayer = 'X'; // Tracks the current player (initially 'X')
let board = ['', '', '', '', '', '', '', '', '']; // Represents the tic-tac-toe board
let gameOver = false; // Indicates whether the game is over
let mode = 'twoPlayer'; // Default mode is 'twoPlayer', can be changed to 'vsAI'

// Function to handle mode change
function changeMode() {
    mode = document.getElementById('mode').value; // Get selected mode from HTML dropdown
    resetGame(); // Reset the game when mode changes
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X'; // Reset the current player to 'X'
    board = ['', '', '', '', '', '', '', '', '']; // Clear the board
    gameOver = false; // Reset game over status
    updateBoard(); // Update the visual representation of the board
    updateMessage(''); // Clear any previous messages
}

// Event handler for cell click
function handleCellClick(event) {
    if (gameOver) return; // Return if the game is already over

    const cellIndex = event.target.dataset.index; // Get the index of the clicked cell

    if (board[cellIndex] === '') {
        // If the clicked cell is empty
        board[cellIndex] = currentPlayer; // Mark the cell with the current player's symbol
        checkWinner(); // Check if the current player has won
        if (mode === 'vsAI' && !gameOver) {
            playAI(); // If playing against AI, let AI make a move
        }
        updateBoard(); // Update the visual representation of the board
        switchPlayer(); // Switch to the next player
    }
}

// Function to make a move for the AI
function playAI() {
    const bestMove = getBestMove(board, 'O'); // Get the best move for the AI (player 'O')
    board[bestMove.index] = 'O'; // Make the AI move
    checkWinner(); // Check if the AI has won
    updateBoard(); // Update the visual representation of the board
    switchPlayer(); // Switch to the next player
}

// Function to get the best move for a player using minimax algorithm
function getBestMove(board, player) {
    // ... (minimax algorithm implementation, recursively explores possible moves)
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

// Function to check if a specific player has won
function checkWinnerForPlayer(board, player) {
    // ... (checks for winning combinations for a given player)
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

// Function to check if the game has a winner or is a draw
function checkWinner() {
    // ... (checks for winning combinations and updates game status)
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

// Function to update the visual representation of the board
function updateBoard() {
    // ... (updates the HTML elements to reflect the current state of the board)
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

// Function to update the message displayed on the page
function updateMessage(msg) {
    document.getElementById('message').textContent = msg; // Update the message element
}

// Function to update the turn information on the page
function updateTurn() {
    document.getElementById('turn').textContent = `Turn: ${currentPlayer}`; // Update the turn information
}

// Function to switch the current player
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player from 'X' to 'O' or vice versa
    updateTurn(); // Update the displayed turn information
}

// Initial setup
resetGame(); // Initialize the game state
updateTurn(); // Display the initial turn

const Gameboard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = function () {
        console.log("Fetching board status");
        return board
    };

    const updateBoard = function (square, mark) {
        console.log("Placing an " + mark + " mark.");
        board[square] = mark;
    };

    const restart = function () {
        console.log("Restarting match.");
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    let winner;
    const haveWinner = function () {
        if ((board[0]) && (board[1]) && (board[2]) && (board[0] === board[1]) && (board[1] === board[2])) {
            winner = {player: board[0], squares: "0-1-2"};
        } else if ((board[3]) && (board[4]) && (board[5]) && (board[3] === board[4]) && (board[4] === board[5])) {
            winner = {player: board[3], squares: "3-4-5"};
        } else if ((board[6]) && (board[7]) && (board[8]) && (board[6] === board[7]) && (board[7] === board[8])) {
            winner = {player: board[6], squares: "6-7-8"};
        } else if ((board[0]) && (board[3]) && (board[6]) && (board[0] === board[3]) && (board[3] === board[6])) {
            winner = {player: board[0], squares: "0-3-6"};
        } else if ((board[1]) && (board[4]) && (board[7]) && (board[1] === board[4]) && (board[4] === board[7])) {
            winner = {player: board[1], squares: "1-4-7"};
        } else if ((board[2]) && (board[5]) && (board[8]) && (board[2] === board[5]) && (board[5] === board[8])) {
            winner = {player: board[2], squares: "2-5-8"};
        } else if ((board[0]) && (board[4]) && (board[8]) && (board[0] === board[4]) && (board[4] === board[8])) {
            winner = {player: board[0], squares: "0-4-8"};
        } else if ((board[2]) && (board[4]) && (board[6]) && (board[2] === board[4]) && (board[4] === board[6])) {
            winner = {player: board[2], squares: "2-4-6"};
        } else {
            winner = null;
        }
        return winner;
    };

    const fill = function () {
        for (let i = 0; i < board.length; i++) {
            if (i % 2 === 0) {
                board[i] = "X";
            } else {
                board[i] = "O";
            }
        }
    };
    return ({ getBoard, updateBoard, restart, fill, haveWinner});
})();

const newPlayer = function (name, mark) {
    const playerName = name;
    const playerMark = mark;

    const getName = function () {
        return playerName
    };
    const getMark = function () {
        return playerMark
    };
    return ({getName, getMark})
};

//Gameboard.fill();
console.log(Gameboard.getBoard());
// Gameboard.restart();
// console.log(Gameboard.getBoard());

const guiModule = (function () {
    const container = document.querySelector(".board.container");

    // Temporary fix to keep track of current player
    let playedIndex = 0;

    const playerClick = function (event){
        let mark = "";
        if (!event.target.textContent){
            if (playedIndex % 2 === 0){
                mark = "O";
            }
            else
            {
                mark = "X";
            };
        playedIndex++;
        
        event.target.textContent = mark;
        let sqrUpdate = event.target.id.split("-")[1]
        Gameboard.updateBoard(sqrUpdate, mark);
        console.log(Gameboard.getBoard());
        let winner = Gameboard.haveWinner();
        if (winner) {
            console.log(winner.player + " wins! " + winner.squares);
            stopGame();
        }
    };
};

    const renderSquare = function (sqr, index){
        const newSquare = document.createElement("div");
        newSquare.setAttribute("class", "board-square");
        newSquare.setAttribute("id", `sqr-${index}`);
        newSquare.textContent = sqr;
        newSquare.addEventListener("click", playerClick);
        return newSquare;
    };

    const deleteBoard = function () {
        let squares = container.querySelectorAll(".board-square");
        squares.forEach(element => {
            element.remove();
        }); 
    };

    const stopGame = function () {
        let squares = document.querySelectorAll(".board-square");
        squares.forEach( element => {
            element.removeEventListener("click", playerClick);
        });
    };

    const renderNewBoard = function (){
        if (document.querySelector(".board-square")) {
            deleteBoard();
        }
        let i = 0;
        for (square of Gameboard.getBoard()) {
            const newSqr = renderSquare(square, i);
            container.appendChild(newSqr);
            i++;
        };
    };

    return ({renderNewBoard});
})();

let startButton = document.querySelector(".board-square");
startButton.addEventListener("click", guiModule.renderNewBoard);


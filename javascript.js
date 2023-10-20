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

    const fill = function () {
        for (let i = 0; i < board.length; i++) {
            if (i % 2 === 0) {
                board[i] = "X";
            } else {
                board[i] = "O";
            }
        }
    };
    return ({ getBoard, updateBoard, restart, fill,})
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
    };
};

    const renderSquare = function (sqr, index){
        const newSquare = document.createElement("div");
        newSquare.setAttribute("class", "board-square");
        newSquare.setAttribute("id", `sqr-${index}`);
        newSquare.textContent = sqr;
        newSquare.addEventListener("click", guiModule.playerClick);
        return newSquare;
    };

    const renderNewBoard = function (){
        const container = document.querySelector(".board.container");
        let i = 0;
        for (square of Gameboard.getBoard()) {
            const newSqr = renderSquare(square, i);
            container.appendChild(newSqr);
            i++;
        };
    };

    const updateBoard = function(sqr) {
        console.log("Hello");
    };

    return ({renderNewBoard, updateBoard, playerClick});
})();

guiModule.renderNewBoard();

const Gameboard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];

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
        for (square in board) {
            square = "";
        }
    };

    return ({ getBoard, updateBoard, restart })
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
}

let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;
let playWithComputer = false;

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#play-human").addEventListener("click", () => {
        playWithComputer = false;
        startGame();
    });
    document.querySelector("#play-computer").addEventListener("click", () => {
        playWithComputer = true;
        startGame();
    });
});

boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            checkWin();
            checkDraw();
            if (!isGameOver) {
                changeTurn();
                if (playWithComputer && turn === "O") {
                    setTimeout(computerMove, 500);
                }
            }
        }
    });
});

document.querySelector("#play-again").addEventListener("click", () => {
    resetGame();
    showModeSelection();
});

function startGame() {
    document.querySelector("#mode-selection").style.display = "none";
    document.querySelector(".turn-container").style.display = "block";
    document.querySelector(".main-grid").style.display = "grid";
    document.querySelector("#play-again").style.display = "none";
}

function showModeSelection() {
    document.querySelector("#mode-selection").style.display = "block";
    document.querySelector(".turn-container").style.display = "none";
    document.querySelector(".main-grid").style.display = "none";
    document.querySelector("#results").innerHTML = "";
}

function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;
        if (v0 !== "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " wins";
            document.querySelector("#play-again").style.display = "inline";
            for (let j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6";
                boxes[winConditions[i][j]].style.color = "#000";
            }
        }
    }
}

function checkDraw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        });
        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

function computerMove() {
    let emptyBoxes = Array.from(boxes).filter(box => box.innerHTML === "");
    if (emptyBoxes.length > 0) {
        let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        randomBox.innerHTML = turn;
        checkWin();
        checkDraw();
        if (!isGameOver) {
            changeTurn();
        }
    }
}

function resetGame() {
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });
    document.querySelector("#play-again").style.display = "none";
    document.querySelector("#results").innerHTML = "";
}

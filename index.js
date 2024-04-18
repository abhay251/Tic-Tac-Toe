//initializing all elements into a variable
let boxes = document.querySelectorAll(".box");
let newBtn = document.querySelector("#newGame");
let turnO = false;
let count = 0;
let nameWin = "";
let winningMsg = document.querySelector("#displayBox");
let xVal;
let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");
let playerField1 = document.getElementById("playerInput1");
let playerField2 = document.getElementById("playerInput2");
resetScoreBtn = document.getElementById("scoreReset");

//giving the scores inital value as 0
score1.innerText = 0;
score2.innerText = 0;

//array to store the winning patterns
const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

//function to check who is playing as X
checkX = () => {
    if (document.getElementById("radioPlayer1").checked) {
        xVal = document.getElementById("radioPlayer1").value;
    }
    else if (document.getElementById("radioPlayer2").checked) {
        xVal = document.getElementById("radioPlayer2").value;
    }
}

//function to enable and disable radio buttons 
disableRadio = () => {
    document.getElementById("radioPlayer1").disabled = true;
    document.getElementById("radioPlayer2").disabled = true;
}

enableRadio = () => {
    document.getElementById("radioPlayer1").disabled = false;
    document.getElementById("radioPlayer2").disabled = false;
}

//function to check winning pattern and tell if anyone won, whenever called
const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos1 != "") {
            if (pos1 == pos2 && pos2 == pos3) {
                scoreUpdate(pos1) //updating score using the value inside the winning pattern's box
                console.log("executed");
                winningMsg.innerText = "Winner is " + nameWin;
                disableBoxes(); //disabling box after winner is found
                return true; //returning true when winner found, to the variable which determines wether someone won or not
            }
        }
    }

}

//function to disable and enable boxes whenever called
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// function to follow procedures when reset button is clicked
const resetGame = () => {
    turnO = false; //because x moves first in any game
    enableBoxes();
    winningMsg.innerText = "";
    count = 0; //reseting the no of moves played for every new game
    enableRadio(); // players allowed to choose who will play as X
};

//function to check if the name bar is left empty then replace it with "player1" or "player2" respectively
checkEmpty = () => {
    if (playerField1.value == "")
        document.getElementById("player1").innerHTML = "Player1";
    if (playerField2.value == "")
        document.getElementById("player2").innerHTML = "Player2";
}

//function to update score using the winning player's symbol, whenever called
scoreUpdate =(sym) =>
{
    console.log("value of sym is " + sym);
    let text1 = score1.innerText;
    let text2 = score2.innerText;
    let name1 = document.getElementById("player1").innerText;
    let name2 = document.getElementById("player2").innerText;
    checkX();
    if(xVal == '1' && sym == 'X')
    {
        console.log("condition 1 satisfied");
        score1.innerText = Number(++text1);
        nameWin = name1;
    }
    else
    if(xVal == '1' && sym == 'O')
    {
        console.log("condition 2 satisfied");
        score2.innerText = Number(++text2);
        nameWin = name2;
    }
    else
    if(xVal == '2' && sym == 'X')
    {
        console.log("condition 3 satisfied");
        score2.innerText = Number(++text2);
        nameWin = name2;
    }
    else
    if(xVal == '2' && sym == 'O')
    {
        console.log("condition 4 satisfied");
        score1.innerText = Number(++text1);
        nameWin = name1;
    }
}

//adding event listener for each box when clicked
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO == true) {
            box.innerText = "O";
            box.style.color = "blue";
            turnO = false;
        }
        else {
            box.innerText = "X"
            box.style.color = "red";
            turnO = true;

        }
        box.disabled = true;
        count++; //to keep a count of how many moves played (used to calculate draw)
        let iswinner = checkWinner(); //this variable determines wether anyone won or not
        if (count == 9 && iswinner != true) {
            winningMsg.innerText = "Game Draw";
            disableBoxes(); // disable clicking boxes once the game is finished
        }
        if (count != 0) {
            disableRadio(); //let players not change the xVal value once they started playing
        }
    })
})

//adding an event listener for the new game button
newBtn.addEventListener("click", resetGame);

//adding an event listener for the name input bar for players
playerField1.addEventListener("input", () => {
    document.getElementById("player1").innerHTML = document.getElementById("playerInput1").value;
    checkEmpty();
})

playerField2.addEventListener("input", () => {
    document.getElementById("player2").innerHTML = document.getElementById("playerInput2").value;
    checkEmpty();
})

//adding an event listener for reset score button when clicked
resetScoreBtn.addEventListener("click", () => {
    score1.innerText = "0";
    score2.innerText = "0";
})
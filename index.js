let boxes = document.querySelectorAll(".box");
let newBtn = document.querySelector("#newGame");
let turnO = false;
let count = 0;
let nameWin = "";
winningMsg = document.querySelector("#displayBox");
let xVal;
let score1 = document.getElementById("score1"); 
score1.innerText = 0;
let score2 = document.getElementById("score2"); 
score2.innerText = 0;
checkPlayerName = () =>
{

}
checkX = () =>
{
    if(document.getElementById("radioPlayer1").checked)
    {
        xVal = document.getElementById("radioPlayer1").value;
    }
    else if(document.getElementById("radioPlayer2").checked)
    {
        xVal = document.getElementById("radioPlayer2").value;
    }
}
disableRadio = ()=>
{
    document.getElementById("radioPlayer1").disabled = true;
    document.getElementById("radioPlayer2").disabled = true;
}
enableRadio = ()=>
{
    document.getElementById("radioPlayer1").disabled = false;
    document.getElementById("radioPlayer2").disabled = false;
}
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
        count++;
        let iswinner = checkWinner();
        if(count == 9 && iswinner != true )
        {
            winningMsg.innerText = "Game Draw";
                disableBoxes();
        }
        if(count!=0)
        {
            disableRadio();
        }
    })
})
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const checkWinner = () => 
{
    for (let pattern of winPattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos1 != "") {
            if (pos1 == pos2 && pos2 == pos3) {
                scoreUpdate(pos1)
                console.log("executed");
                winningMsg.innerText = "Winner is " + nameWin;
                disableBoxes();
                return true;
            }
        }
    }

}


const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};
const resetGame = () => {
    turnO = false;
    enableBoxes();
    winningMsg.innerText = "";
    count = 0;
    enableRadio();
};
newBtn.addEventListener("click", resetGame);
let playerField1 = document.getElementById("playerInput1");
playerField1.addEventListener("input",() =>{
    document.getElementById("player1").innerHTML = document.getElementById("playerInput1").value;
    checkEmpty();
} )
let playerField2 = document.getElementById("playerInput2");
playerField2.addEventListener("input",() =>{
    document.getElementById("player2").innerHTML = document.getElementById("playerInput2").value;
    checkEmpty();
} )
checkEmpty = () =>
{
    if(playerField1.value == "")
    document.getElementById("player1").innerHTML = "Player1";
    if(playerField2.value == "")
    document.getElementById("player2").innerHTML = "Player2";
}
resetScoreBtn = document.getElementById("scoreReset");
resetScoreBtn.addEventListener("click", () => {
score1.innerText = "0";
score2.innerText = "0";
})

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
let boxes = document.querySelectorAll(".box");
let message = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");

let turn0 = true;
let count = 0;

const winningPatterns = [
    [0, 1, 2], // Horizontal top
    [3, 4, 5], // Horizontal middle
    [6, 7, 8], // Horizontal bottom
    [0, 3, 6], // Vertical left
    [1, 4, 7], // Vertical middle
    [2, 5, 8], // Vertical right
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
];

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.textContent = "X";
            turn0 = false;
        } else {
            box.textContent = "O";
            turn0 = true;
        }
        box.disabled = true;
        count++;
        let winner = checkWinner();
        if (count === 9 && !winner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    message.textContent = "It's a draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showWinner = (winner) => {
    message.textContent = `Congratulations, ${winner}!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winningPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

const enableBoxes= ()=>{
    boxes.forEach(box => {box.disabled = false
     box.innerText="";

    });
}
const restartgame = ()=>{
   enableBoxes()
   turn0 = true;
   count = 0;
   message.textContent = "";
   msgContainer.classList.add("hide");

    }
newGameBtn.addEventListener("click",restartgame)
resetBtn.addEventListener("click",restartgame)
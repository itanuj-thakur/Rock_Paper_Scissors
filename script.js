let playerChoice = "";
let computerChoice = "";
const moves = ["rock", "paper", "scissors"];



const playerImg = document.getElementById("youImg");
const computerImg = document.getElementById("compImg");

const resultText = document.getElementById("result");
const historyContainer=document.getElementById("history")

const yourScore = document.getElementById("yourScore");
const computerScore = document.getElementById("computerScore");
const drawScore = document.getElementById("drawScore");


const resetBtn = document.getElementById("resetBtn");

const choices = document.querySelectorAll(".moveCont");
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    playerImg.src = choice.src;
    playerChoice = choice.id.replace("Choice", "");
    play();
  });
});
let win = 0,
loss = 0,
draw = 0;
function play() {
  let result = "";
  computerChoice = moves[Math.floor(Math.random() * moves.length)];
  computerImg.src = `images/${computerChoice}.png`;
  if (playerChoice === computerChoice) {
    result = "DRAW";
    draw++;
  } else {
    switch (playerChoice) {
      case "rock":
        if (computerChoice === "paper") {
          result = "YOU LOSE";
          loss++;
        } else {
          result = "YOU WIN";
          win++;
        }
        break;
      case "paper":
        if (computerChoice === "scissors") {
          result = "YOU LOSE";
          loss++;
        } else {
          result = "YOU WIN";
          win++;
        }

        break;
      case "scissors":
        if (computerChoice === "rock") {
          result = "YOU LOSE";
          loss++;
        } else {
          result = "YOU WIN";
          win++;
        }

        break;
    }
  }
  resultText.textContent = result;
  updateScoreboard();
  historyShow(playerChoice,computerChoice,result);
}
function updateScoreboard() {
    yourScore.textContent = win;
    computerScore.textContent = loss;
    drawScore.textContent = draw;
}
resetBtn.addEventListener("click",()=>{
  playerImg.src="images/rock.png";
  computerImg.src="images/paper.png";
  resultText.textContent="RESULT";
  win=loss=draw=0;
  updateScoreboard();
  playerChoice="";
  computerChoice="";
  historyContainer.innerHTML="";
})
function historyShow(playerChoice,computerChoice,result){
  const text=document.createElement("div")
  text.textContent=playerChoice+" x "+computerChoice+" : "+result;
  text.classList.add("spanClass");
  historyContainer.prepend(text);
}
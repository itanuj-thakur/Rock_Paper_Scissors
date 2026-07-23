let playerChoice = "";
let computerChoice = "";
const moves = ["rock", "paper", "scissors"];

const playerImg = document.getElementById("youImg");
const computerImg = document.getElementById("compImg");

const resultText = document.getElementById("result");
const historyContainer = document.getElementById("history");

const yourScore = document.getElementById("yourScore");
const computerScore = document.getElementById("computerScore");
const drawScore = document.getElementById("drawScore");

const resetBtn = document.getElementById("resetBtn");
const shuffleSound=new Audio("sound/shuffle.mp3");
const choices = document.querySelectorAll(".moveCont");
let isPlaying=false;
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    if(isPlaying) return;
    playerImg.classList.remove("slider");
    void playerImg.offsetWidth;
    playerImg.src = choice.src;
    playerImg.classList.add("slider");
    playerChoice = choice.id.replace("Choice", "");
    play();
  });
});
let win = 0,
  loss = 0,
  draw = 0;
function play() {
  let result = "";
  isPlaying=true;
  resetBtn.disabled=true;
  computerChoice = moves[Math.floor(Math.random() * moves.length)];

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
  animateResult();
  animateComputerChoice(() => {
    computerImg.src = `images/${computerChoice}.png`;
    resultText.textContent = result;
    updateScoreboard();
    historyShow(playerChoice, computerChoice, result);
    applyCSS(result);
    isPlaying=false;
    resetBtn.disabled=false;
  });
}
function updateScoreboard() {
  yourScore.textContent = win;
  computerScore.textContent = loss;
  drawScore.textContent = draw;
}
resetBtn.addEventListener("click", () => {
  playerImg.src = "images/rock.png";
  computerImg.src = "images/paper.png";
  resultText.textContent = "RESULT";
  win = loss = draw = 0;
  updateScoreboard();
  playerChoice = "";
  computerChoice = "";
  historyContainer.innerHTML = "";
  resultText.classList.remove("WIN", "LOSE", "DRAW");
  i = 0;
});
let i = 0;
function historyShow(playerChoice, computerChoice, result) {
  const item = document.createElement("div");
  item.classList.add("history-item");

  const move = document.createElement("span");
  move.textContent = `#${++i} ${choiceEmoji(playerChoice)} vs ${choiceEmoji(computerChoice)}`;

  const outcome = document.createElement("span");

  if (result === "YOU WIN") {
    outcome.textContent = "✅ WIN";
    outcome.classList.add("WIN");
  } else if (result === "YOU LOSE") {
    outcome.textContent = "❌ LOSE";
    outcome.classList.add("LOSE");
  } else {
    outcome.textContent = "🤝 DRAW";
    outcome.classList.add("DRAW");
  }

  item.append(move, outcome);
  historyContainer.prepend(item);
}

function applyCSS(result) {
  resultText.classList.remove("WIN", "LOSE", "DRAW");

  if (result === "YOU WIN") resultText.classList.add("WIN");
  else if (result === "YOU LOSE") resultText.classList.add("LOSE");
  else resultText.classList.add("DRAW");
}
function choiceEmoji(choice) {
  if (choice === "rock") return "🪨";
  if (choice === "paper") return "📄";
  if (choice === "scissors") return "✂️";
}

function animateComputerChoice(callback) {
  let index = 0;
  shuffleSound.currentTime=0.1;
  shuffleSound.play();
  const interval = setInterval(() => {
    computerImg.src = `images/${moves[index]}.png`;
    index = (index + 1) % 3;
  }, 100);
  setTimeout(() => {
    clearInterval(interval);
    if (stopResultAnimation) stopResultAnimation();
    shuffleSound.pause();
    shuffleSound.currentTime=0;
    callback();

  }, 1000);
}
let stopResultAnimation = null;
function animateResult() {
  let dot = "";
  const interval = setInterval(() => {
    dot += ".";
    if (dot.length > 4) dot = "";
    resultText.textContent = "FIGHT" + dot;
  }, 200);
  stopResultAnimation = () => clearInterval(interval);
}
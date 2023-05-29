//------------------ we define score object------------------
let score = {
  wins: 0,
  looses: 0,
  equals: 0,
};

// -------------------Retrieve scores from local storage-------------------
const storedScore = localStorage.getItem("score");
if (storedScore) {
  score = JSON.parse(storedScore);
}

// -----------------show the scores only when we first open or reload-------------------------
document.querySelector(
  ".results"
).innerText = `Wins: ${score.wins}, Looses: ${score.looses}, Equals: ${score.equals}`;

//----------------- this is my function------------------------
function playGame(playerMove) {
  let result = "";

  const pickComputerMove = () => {
    let computerMove = "";
    const randomNumber = Math.floor(Math.random() * 3) + 1;

    if (randomNumber === 1) {
      computerMove = "rock";
    } else if (randomNumber === 2) {
      computerMove = "paper";
    } else {
      computerMove = "scissors";
    }
    return computerMove;
  };

  if (playerMove === "rock") {
    const computerMove = pickComputerMove();

    if (computerMove === "rock") {
      result = "Equal";
      score.equals++;
    } else if (computerMove === "paper") {
      result = "You lose!";
      score.looses++;
    } else {
      result = "You win";
      score.wins++;
    }

    displayOnScreenInsteadOfAlert(result, playerMove, computerMove);
  } else if (playerMove === "paper") {
    const computerMove = pickComputerMove();

    if (computerMove === "rock") {
      result = "You Win";
      score.wins++;
    } else if (computerMove === "paper") {
      result = "Equal!";
      score.equals++;
    } else {
      result = "You Loose";
      score.looses++;
    }

    displayOnScreenInsteadOfAlert(result, playerMove, computerMove);
  } else if (playerMove === "scissors") {
    const computerMove = pickComputerMove();
    if (computerMove === "rock") {
      result = "You Lose";
      score.looses++;
    } else if (computerMove === "paper") {
      result = "You Win!";
      score.wins++;
    } else {
      result = "Equal!";
      score.equals++;
    }
    displayOnScreenInsteadOfAlert(result, playerMove, computerMove);
  }

  console.log(score);
  console.log(JSON.stringify(score)); // Print the JSON object
  localStorage.setItem("score", JSON.stringify(score)); //  store the score object in the browser's local storage
}

//---------------------reset function-------------------------------
function reset() {
  score.wins = 0;
  score.looses = 0;
  score.equals = 0;
  localStorage.removeItem("score");

  document.querySelector(".winner").innerText = "";
  document.querySelector(".moves").innerText = "";
  document.querySelector(
    ".results"
  ).innerText = `Wins: ${score.wins}, Looses: ${score.looses}, Equals: ${score.equals}`;
}

//-----------------------display text on paragraph elements-------------
function displayOnScreenInsteadOfAlert(result, playerMove, computerMove) {
  document.querySelector(".winner").innerText = `${result}`;
  document.querySelector(".moves").innerHTML = `You
        <img src="${playerMove}-emoji.png" class="btn" />
        <img src="${computerMove}-emoji.png" class="btn" />
        Computer`;

  document.querySelector(
    ".results"
  ).innerText = `Wins: ${score.wins}, Looses: ${score.looses}, Equals: ${score.equals}`;
}

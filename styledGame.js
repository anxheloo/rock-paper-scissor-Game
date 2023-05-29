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

// ADD THE AUTOPLAY FEATURE, AND STOP AUTOPLAY
//-------------------------------------------------

let intervalId; // Variable to store the interval ID
const autoPlayButton = document.querySelector(".autoPlayButton");

// Function to automatically play the game every 3 seconds
function autoPlay() {
  // Call playGame with a random move
  const moves = ["rock", "paper", "scissors"];
  const randomMove = moves[Math.floor(Math.random() * moves.length)];
  playGame(randomMove);
}

// Function to start auto play
function startAutoPlay() {
  intervalId = setInterval(autoPlay, 1000);
  // console.log("This is internal id: " + intervalId);
}

// Function to stop auto play
function stopAutoPlay() {
  clearInterval(intervalId);
  // console.log(intervalId);
}

autoPlayButton.addEventListener("click", () => {
  if (intervalId) {
    // Auto play is already running, stop it
    stopAutoPlay();
    autoPlayButton.textContent = "Auto Play";
  } else {
    // Auto play is not running, start it
    startAutoPlay();
    autoPlayButton.textContent = "Stop Auto Play";
  }
});

// add event listener for body when we press a key down
document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  }
});

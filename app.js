class Card {
    constructor(name, img) {
      this.name = name;
      this.img = img;
    }
  }
  
    const cardArray = [
    new Card("1", "images/1.jpg"),
    new Card("2", "images/2.jpg"),
    new Card("3", "images/3.jpg"),
    new Card("4", "images/4.jpg"),
    new Card("5", "images/5.jpg"),
    new Card("6", "images/6.jpg"),
    new Card("1", "images/1.jpg"),
    new Card("2", "images/2.jpg"),
    new Card("3", "images/3.jpg"),
    new Card("4", "images/4.jpg"),
    new Card("5", "images/5.jpg"),
    new Card("6", "images/6.jpg"),
  ];

cardArray.sort(() => 0.5 - Math.random());


const gridDisplay = document.querySelector("#grid");
let resultDisplay = document.querySelector("#result");
let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];
let timerDisplay = document.querySelector("#timer");
let seconds = 0;
let maxTime = 30;
let timer;
let gameActive = false;

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const cardElement = document.createElement("img");
    cardElement.src = "images/001.jpg";
    cardElement.setAttribute("data-id", i);
    cardElement.addEventListener("click", flipCard);
    gridDisplay.appendChild(cardElement);
  }
}
createBoard();

function startTimer() {
    timer = setInterval(function () {
    seconds--;
    timerDisplay.textContent = "Time: " + seconds + "s";

    if (seconds <= 0) {
      endGame();
    }
  }, 1000);
}


function stopTimer() {
  clearInterval(timer);
}

function endGame() {
  stopTimer();
  alert("Game over! You ran out of time.");
  resetGame();
}

function resetGame() {
  // Скидання гри
    stopTimer();
    seconds = 0;
    updateTimer();
    resultDisplay.textContent = "0";
    cardsChosen = [];
    cardsChosenIds = [];
    cardsWon.length = 0;
    gridDisplay.innerHTML = "";
    createBoard();
    gameActive = false;
    stopTimer();
    seconds = maxTime;
    timerDisplay.textContent = "Time: " + seconds + "s";
  
}

function checkWin() {
  if (cardsWon.length === cardArray.length / 2) {
    stopTimer();
    openModal()
    
  }
}

function checkMatch() {
  const cards = document.querySelectorAll("#grid img");
  const optionOneId = cardsChosenIds[0];
  const optionTwoId = cardsChosenIds[1];
  if (optionOneId == optionTwoId) {
    cards[optionOneId].setAttribute("src", "images/001.jpg");
    cards[optionTwoId].setAttribute("src", "images/001.jpg");
    console.log("You have clicked the same image!");
  }
  if (cardsChosen[0] == cardsChosen[1]) {
    console.log("You found a match");
    cards[optionOneId].setAttribute("src", "images/002.jpg");
    cards[optionTwoId].setAttribute("src", "images/002.jpg");
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);
    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneId].setAttribute("src", "images/001.jpg");
    cards[optionTwoId].setAttribute("src", "images/001.jpg");
    console.log("Sorry try again!");
  }
  resultDisplay.textContent = cardsWon.length;
  checkWin();
  cardsChosen = [];
  cardsChosenIds = [];

  if (cardsWon.length == cardArray.length / 2) {
    resultDisplay.textContent = "Congratulations you found them all!";
  }
  updateScore()
}

function updateScore() {
  resultDisplay.textContent = cardsWon.length;
}
function updateTimer() {
  timerDisplay.textContent = "Time: " + seconds + "s";
}

function flipCard() {
  const cardId = this.getAttribute("data-id");
  if (!gameActive) {
    return; // Якщо гра не активована, вийдіть з функції
  }
  if (cardsChosenIds.length === 1 && cardsChosenIds[0] === cardId) {
    this.setAttribute("src", "images/001.jpg");
    cardsChosen = [];
    cardsChosenIds = [];
    return;
  }
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenIds.push(cardId);
  this.setAttribute("src", cardArray[cardId].img);
  if (cardsChosen.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

function openModal() {
  document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('myModal').style.display = 'none';
}

document.getElementById("resetGame").addEventListener("click", function() {
  resetGame();
  gameActive = false;
})

document.getElementById("startButton").addEventListener("mouseover", function() {
  this.style.backgroundColor = "lightgray";
  this.style.color = "darkblue";
  this.style.border = "2px solid darkblue";
});

document.getElementById("startButton").addEventListener("mouseout", function() {
  this.style.backgroundColor = "#b0b0b5";
  this.style.color = "#3e3ec1";
  this.style.border = "3px solid #46467c";
});


document.getElementById("resetGame").addEventListener("mouseover", function() {
  this.style.backgroundColor = "lightgray";
  this.style.color = "darkblue";
  this.style.border = "2px solid darkblue";
});

document.getElementById("resetGame").addEventListener("mouseout", function() {
  this.style.backgroundColor = "#b0b0b5";
  this.style.color = "#3e3ec1";
  this.style.border = "3px solid #46467c";
});
document.getElementById("startButton").addEventListener("click", function() {
  if (!gameActive) {
    resetGame();
    startTimer();
    gameActive = true;
  }
});
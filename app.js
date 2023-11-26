class Card {
    constructor(name, img) {
      this.name = name;
      this.img = img;
    }
  }
  
    const cardArray = [
    new Card("12", "images/12.png"),
    new Card("dog", "images/dog.jpeg"),
    new Card("duck", "images/duck.png"),
    new Card("ice-cream", "images/ice-cream.png"),
    new Card("melon", "images/melon.jpg"),
    new Card("pikachu", "images/pikachu.png"),
    new Card("12", "images/12.png"),
    new Card("dog", "images/dog.jpeg"),
    new Card("duck", "images/duck.png"),
    new Card("ice-cream", "images/ice-cream.png"),
    new Card("melon", "images/melon.jpg"),
    new Card("pikachu", "images/pikachu.png"),
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
    cardElement.src = "images/background.jpg";
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
    cards[optionOneId].setAttribute("src", "images/background.jpg");
    cards[optionTwoId].setAttribute("src", "images/background.jpg");
    console.log("You have clicked the same image!");
  }
  if (cardsChosen[0] == cardsChosen[1]) {
    console.log("You found a match");
    cards[optionOneId].setAttribute("src", "images/fon.jpg");
    cards[optionTwoId].setAttribute("src", "images/fon.jpg");
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);
    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneId].setAttribute("src", "images/background.jpg");
    cards[optionTwoId].setAttribute("src", "images/background.jpg");
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
    this.setAttribute("src", "images/background.jpg");
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
  this.style.backgroundColor = "#9d36f2";
  this.style.color = "#43ff0f";
  this.style.border = "3px solid #f915f9";
});


document.getElementById("resetGame").addEventListener("mouseover", function() {
  this.style.backgroundColor = "lightgray";
  this.style.color = "darkblue";
  this.style.border = "2px solid darkblue";
});

document.getElementById("resetGame").addEventListener("mouseout", function() {
  this.style.backgroundColor = "#9d36f2";
  this.style.color = "#43ff0f";
  this.style.border = "3px solid #f915f9";
});
document.getElementById("startButton").addEventListener("click", function() {
  if (!gameActive) {
    resetGame();
    startTimer();
    gameActive = true;
  }
});
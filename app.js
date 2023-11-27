// Визначаємо class Card для подальшого створення об'єктів карток
class Card {
    constructor(name, img) {
      this.name = name;
      this.img = img;
    }
  }
  //  Масив з парами карток для гри 
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
//  Викорустовуємо метод, щоб розміщати картки випадковим чином 
cardArray.sort(() => 0.5 - Math.random());

//  Оголошуємо всі змінні
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

//  Функцію яка заповнює дошку картками. Кожна карта має початкове зображення та слухача подій для обробки кліків.
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

// Функція яка ініціалізує і запускає таймер, що відлічує час гри.
function startTimer() {
    timer = setInterval(function () {
    seconds--;
    timerDisplay.textContent = "Time: " + seconds + "s";
    if (seconds <= 0) {
      endGame();
    }
  }, 1000);
}

// Функція яка зупиняє таймер.
function stopTimer() {
  clearInterval(timer);
}

// Функція яка викликає модальне вікно про програш, зупиняє таймер і скидає гру.
function endGame() {
  loseModal();
  stopTimer();
  stopGame();
}

// Функція скидає гру, зупиняє таймер і готується до нової гри.
function resetGame() {
  stopGame();
  stopTimer();
}

// Функція яка скидає гру, зупиняє таймер і оновлює таймер та дошку.
function stopGame() {
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
};

// Функцію яка перевіряє, чи виграв гравець (знайшов всі пари карток) і викликає модальне вікно про перемогу.
function checkWin() {
  if (cardsWon.length === cardArray.length / 2) {
    stopTimer();
    openModal()
  };
}

// Функція яка перевіряє, чи відбувається відповідність між двома вибраними картами і виконує відповідні дії.
function checkMatch() {
  const cards = document.querySelectorAll("#grid img");
  const optionOneId = cardsChosenIds[0];
  const optionTwoId = cardsChosenIds[1];
  if (optionOneId == optionTwoId) {
    cards[optionOneId].setAttribute("src", "images/001.jpg");
    cards[optionTwoId].setAttribute("src", "images/001.jpg");
  }
  if (cardsChosen[0] == cardsChosen[1]) {
    cards[optionOneId].setAttribute("src", "images/002.jpg");
    cards[optionTwoId].setAttribute("src", "images/002.jpg");
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);
    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneId].setAttribute("src", "images/001.jpg");
    cards[optionTwoId].setAttribute("src", "images/001.jpg");
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

// Функція яка оновлює відображення кількості знайдених пар карток.
function updateScore() {
  resultDisplay.textContent = cardsWon.length;
}

// Функція яка оновлює відображення таймера.
function updateTimer() {
  timerDisplay.textContent = "Time: " + seconds + "s";
}

// Функцію яка обробляє клік на картку, відкриває її і викликає функцію перевірки відповідності.
function flipCard() {
  const cardId = this.getAttribute("data-id");
  if (!gameActive) {
    return;
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

function loseModal() {
  document.getElementById("loseModal").style.display = "block";
}

function openModal() {
  document.getElementById('winModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('winModal').style.display = 'none';
  document.getElementById('loseModal').style.display = 'none';
}

document.getElementById("stopGame").addEventListener("click", function() {
  stopGame();
  gameActive = false;
})

document.getElementById("stopGame").addEventListener("mouseover", function() {
  this.style.backgroundColor = "lightgray";
  this.style.color = "darkblue";
  this.style.border = "2px solid darkblue";
});

document.getElementById("stopGame").addEventListener("mouseout", function() {
  this.style.backgroundColor = "#b0b0b5";
  this.style.color = "#3e3ec1";
  this.style.border = "3px solid #46467c";
});

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

document.getElementById("startButton").addEventListener("click", function() {
  if (!gameActive) {
    stopGame();
    startTimer();
    gameActive = true;
  }
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

document.getElementById("resetGame").addEventListener("click", function() {
  stopGame();
  updateTimer();
  startTimer();
  gameActive = true;
})

document.getElementById('playAgainButtonWin').addEventListener('click', function() {
  closeModal(); // Закриваємо модальне вікно
  resetGame();  // Скидаємо гру
  startTimer(); // Запускаємо таймер
  gameActive = true; // Вказуємо, що гра активована
});

document.getElementById('playAgainButtonLose').addEventListener('click', function() {
  closeModal(); // Закриваємо модальне вікно
  resetGame();  // Скидаємо гру
  startTimer(); // Запускаємо таймер
  gameActive = true; // Вказуємо, що гра активована
});
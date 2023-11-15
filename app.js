class Card {
    constructor(name, img) {
      this.name = name;
      this.img = img;
    }
  }
  
  const cardArray = [
    new Card("cat", "images/cat.jpg"),
    new Card("dog", "images/dog.jpeg"),
    new Card("duck", "images/duck.png"),
    new Card("ice-cream", "images/ice-cream.png"),
    new Card("melon", "images/melon.jpg"),
    new Card("pikachu", "images/pikachu.png"),
    new Card("cat", "images/cat.jpg"),
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

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/background.jpg");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    gridDisplay.appendChild(card);
  }
}
createBoard();

function checkMatch() {
  const cards = document.querySelectorAll("#grid img");
  const optionOneId = cardsChosenIds[0];
  const optionTwoId = cardsChosenIds[1];
  if (optionOneId == optionTwoId) {
    cards[optionOneId].setAttribute("src", "images/background.jpg");
    cards[optionTwoId].setAttribute("src", "images/background.jpg");
    alert("You have clicked the same image!");
  }
  if (cardsChosen[0] == cardsChosen[1]) {
    alert("You found a match");
    cards[optionOneId].setAttribute("src", "images/blue.png");
    cards[optionTwoId].setAttribute("src", "images/blue.png");
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);
    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneId].setAttribute("src", "images/background.jpg");
    cards[optionTwoId].setAttribute("src", "images/background.jpg");
    alert("Sorry try again!");
  }
  resultDisplay.textContent = cardsWon.length;
  cardsChosen = [];
  cardsChosenIds = [];

  if (cardsWon.length == cardArray.length / 2) {
    resultDisplay.textContent = "Congratulations you found them all!";
  }
}

function flipCard() {
  const cardId = this.getAttribute("data-id");
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenIds.push(cardId);
  this.setAttribute("src", cardArray[cardId].img);
  if (cardsChosen.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

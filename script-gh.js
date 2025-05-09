const board = document.getElementById("gameBoard");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

const allPairs = [
  { question: "|-3|", answer: "3" },
  { question: "|5|", answer: "5" },
  { question: "|-7|", answer: "7" },
  { question: "|0|", answer: "0" },
  { question: "|4-9|", answer: "5" },
  { question: "|√16|", answer: "4" },
  { question: "|-√25|", answer: "5" },
  { question: "|2+5|", answer: "7" },
  { question: "|-6+3|", answer: "3" },
  { question: "|3-8|", answer: "5" },
  { question: "|-√36|", answer: "6" },
  { question: "|-√49|", answer: "7" },
  { question: "|-√64|", answer: "8" },
  { question: "|8-12|", answer: "4" },
  { question: "|3√9|", answer: "9" },
  { question: "|-√81|", answer: "9" },
  { question: "|-√144|", answer: "12" },
  { question: "|-√121|", answer: "11" },
  { question: "|2√25|", answer: "10" },
];

let cards = [];
let flipped = [];
let lockBoard = false;
let score = 0;

// شروع بازی
startGame();

function startGame() {
  board.innerHTML = "";
  score = 0;
  scoreDisplay.innerText = score;
  cards = [];
  flipped = [];
  lockBoard = false;

  // انتخاب 8 جفت تصادفی
  const selectedPairs = getRandomPairs(allPairs, 8);

  // ساخت کارت‌ها
  selectedPairs.forEach((pair) => {
    cards.push({ value: pair.question, match: pair.answer });
    cards.push({ value: pair.answer, match: pair.question });
  });

  shuffle(cards);
  createCards(cards);

  // نمایش کارت‌ها برای 2 ثانیه
  setTimeout(() => {
    document.querySelectorAll(".card").forEach((card) => {
      card.classList.add("flipped");
    });

    setTimeout(() => {
      document.querySelectorAll(".card").forEach((card) => {
        card.classList.remove("flipped");
        card.addEventListener("click", () => flipCard(card));
      });
    }, 2000);
  }, 500);
}

function getRandomPairs(array, count) {
  const shuffled = [...array];
  shuffle(shuffled);
  return shuffled.slice(0, count);
}

function createCards(cards) {
  cards.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    cardBack.innerText = item.value;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.dataset.value = item.value;
    card.dataset.match = item.match;

    board.appendChild(card);
  });
}

function flipCard(card) {
  if (lockBoard || card.classList.contains("flipped")) return;

  card.classList.add("flipped");
  flipped.push(card);

  if (flipped.length === 2) {
    lockBoard = true;
    setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  const [card1, card2] = flipped;

  if (
    card1.dataset.match === card2.dataset.value &&
    card2.dataset.match === card1.dataset.value
  ) {
    score += 10;
    updateScore();
  } else {
    score -= 2;
    updateScore();

    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
    }, 500);
  }

  flipped = [];
  lockBoard = false;
}

function updateScore() {
  scoreDisplay.innerText = score;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

restartBtn.addEventListener("click", startGame);

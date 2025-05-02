let score = 0;
const scoreDisplay = document.getElementById("score");

const board = document.getElementById("gameBoard");

const pairs = [
  { question: "|-2|", answer: "2" },
  { question: "|√5-3|", answer: "3-√5" },
  { question: "|√30-5|", answer: "√30-5" },
  { question: "|√6-√8|", answer: "-√6+√8" },
  { question: "|4-√20|", answer: "-4+√20" },
  { question: "|-9-√3|", answer: "9+√3" },
  { question: "|-3√5|", answer: "3√5" },
  { question: "|0+√5|", answer: "√5" },
];

let cards = [];

// ساختن کارت‌های سؤال و جواب
pairs.forEach((pair) => {
  cards.push({ value: pair.question, match: pair.answer });
  cards.push({ value: pair.answer, match: pair.question });
});

shuffle(cards);

let flipped = [];
let lockBoard = false;

cards.forEach((item) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = item.value;
  card.dataset.match = item.match;
  card.innerText = "";
  card.addEventListener("click", () => flipCard(card));
  board.appendChild(card);
});

function flipCard(card) {
  if (lockBoard || card.classList.contains("flipped")) return;

  card.classList.add("flipped");
  card.innerText = card.dataset.value;
  flipped.push(card);

  if (flipped.length === 2) {
    lockBoard = true;
    setTimeout(checkMatch, 700);
  }
}

function checkMatch() {
  const [card1, card2] = flipped;
  if (
    card1.dataset.match === card2.dataset.value &&
    card2.dataset.match === card1.dataset.value
  ) {
    // درست بود، کارت‌ها بمونن
    score += 10;
    updateScore();
  } else {
    // اشتباه بود، برگردون
    // score -= 1;
    updateScore();
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    card1.innerText = "";
    card2.innerText = "";
  }
  flipped = [];
  lockBoard = false;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function updateScore() {
  scoreDisplay.innerText = score;
}

document.getElementById("restartBtn").addEventListener("click", () => {
  location.reload();
});

const questions = [
  { expression: "(x + 3) × (x + 5)", type: "جمله مشترک" },
  { expression: "(x + 4)²", type: "مربع دو جمله‌ای" },
  { expression: "(x + 2) × (x - 2)", type: "مزدوج" },
  { expression: "(x + 1)³", type: "مربع سه جمله‌ای" },
  { expression: "(x - 7) × (x + 7)", type: "مزدوج" },
  { expression: "(x - 4)²", type: "مربع دو جمله‌ای" },
  { expression: "(x + 2) × (x + 6)", type: "جمله مشترک" },
  { expression: "(x + 3)³", type: "مربع سه جمله‌ای" },
];
let score = 0;
let currentQuestion = {};
let remainingQuestions = [];
let maxQuestions = 10;

function startGame() {
  score = 0;
  remainingQuestions = [...questions];
  maxQuestions = 10;
  document.getElementById("score").innerText = ` امتیاز: ${score}`;
  generateQuestion();
}

function generateQuestion() {
  if (remainingQuestions.length === 0 || maxQuestions === 0) {
    alert("بازی به پایان رسید!");
    return;
  }

  const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
  currentQuestion = remainingQuestions[randomIndex];
  remainingQuestions.splice(randomIndex, 1);
  maxQuestions--;

  document.getElementById("question").innerText = currentQuestion.expression;
}

function checkAnswer(selectedType) {
  document
    .querySelectorAll(".game-option")
    .forEach((btn) => (btn.style.backgroundColor = ""));

  const correctBtn = Array.from(document.querySelectorAll(".game-option")).find(
    (btn) => btn.innerText === currentQuestion.type
  );
  const selectedBtn = Array.from(
    document.querySelectorAll(".game-option")
  ).find((btn) => btn.innerText === selectedType);

  if (selectedBtn) {
    if (selectedType === currentQuestion.type) {
      score += 10;
      selectedBtn.style.backgroundColor = "#14c031";
    } else {
      score -= 5;
      selectedBtn.style.backgroundColor = "#c0143f";
      if (correctBtn) correctBtn.style.backgroundColor = "#14c031";
    }
  }

  document.getElementById("score").innerText = ` امتیاز: ${score}`;

  setTimeout(() => {
    document
      .querySelectorAll(".game-option")
      .forEach((btn) => (btn.style.backgroundColor = ""));
    generateQuestion();
  }, 1000);
}

document.addEventListener("DOMContentLoaded", startGame);

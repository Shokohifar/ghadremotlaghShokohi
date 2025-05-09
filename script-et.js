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

function startGame() {
  score = 0;
  document.getElementById("score").innerText = ` امتیاز: ${score}`;
  generateQuestion();
}

function generateQuestion() {
  currentQuestion = questions[Math.floor(Math.random() * questions.length)];
  document.getElementById("question").innerText = currentQuestion.expression;
  document.getElementById("feedback").innerText = "";
}

function checkAnswer(selectedType) {
  // ریست کردن رنگ‌ها
  document
    .querySelectorAll(".game-option")
    .forEach((btn) => (btn.style.backgroundColor = ""));

  // پیدا کردن دکمه‌ها
  const correctBtn = Array.from(document.querySelectorAll(".game-option")).find(
    (btn) => btn.innerText === currentQuestion.type
  );
  const selectedBtn = Array.from(
    document.querySelectorAll(".game-option")
  ).find((btn) => btn.innerText === selectedType);

  if (selectedBtn) {
    if (selectedType === currentQuestion.type) {
      score += 10;
      selectedBtn.style.backgroundColor = "#17e666";
    } else {
      score -= 5;
      selectedBtn.style.backgroundColor = "#cf3535";
      if (correctBtn) correctBtn.style.backgroundColor = "#17e666";
    }
  }

  // به‌روزرسانی امتیاز
  document.getElementById("score").innerText = ` امتیاز: ${score}`;

  // بعد از یک ثانیه سوال جدید نمایش داده می‌شود
  setTimeout(() => {
    document
      .querySelectorAll(".game-option")
      .forEach((btn) => (btn.style.backgroundColor = ""));
    generateQuestion();
  }, 1000);
}

document.addEventListener("DOMContentLoaded", startGame);

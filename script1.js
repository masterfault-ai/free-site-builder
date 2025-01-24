let score = 0;
let timeLeft = 30;
let currentQuestionIndex = 0;
let timerInterval;
let gameStarted = false;

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Rome", "Berlin"],
    correct: "Paris"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    choices: ["Shakespeare", "Dickens", "Austen", "Hemingway"],
    correct: "Shakespeare"
  },
  {
    question: "What is the largest planet in our solar system?",
    choices: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: "Jupiter"
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    choices: ["Oxygen", "Gold", "Osmium", "Ozone"],
    correct: "Oxygen"
  },
  {
    question: "What is 2 + 2?",
    choices: ["3", "4", "5", "6"],
    correct: "4"
  }
];

document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('restart-game').addEventListener('click', restartGame);
document.getElementById('next-question').addEventListener('click', nextQuestion);

function startGame() {
  if (gameStarted) return;

  gameStarted = true;
  score = 0;
  timeLeft = 30;
  currentQuestionIndex = 0;
  document.getElementById('score').textContent = score;
  document.getElementById('timer').textContent = timeLeft;
  document.getElementById('start-game').style.display = 'none';
  document.getElementById('game-over').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'block';

  startTimer();
  showQuestion();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft;

    if (timeLeft <= 0) {
      gameOver();
    }
  }, 1000);
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById('question').textContent = question.question;
  const choicesContainer = document.getElementById('choices');
  choicesContainer.innerHTML = ''; // Clear previous choices

  question.choices.forEach(choice => {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-secondary', 'w-100', 'mb-2');
    button.textContent = choice;
    button.addEventListener('click', () => checkAnswer(choice));
    choicesContainer.appendChild(button);
  });

  document.getElementById('next-question').style.display = 'none';
}

function checkAnswer(selectedAnswer) {
  const correctAnswer = questions[currentQuestionIndex].correct;
  if (selectedAnswer === correctAnswer) {
    score++;
    document.getElementById('score').textContent = score;
  }

  const buttons = document.querySelectorAll('#choices button');
  buttons.forEach(button => {
    button.disabled = true;
    if (button.textContent === correctAnswer) {
      button.classList.add('btn-success');
    }
  });

  document.getElementById('next-question').style.display = 'block';
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    gameOver();
  }
}

function gameOver() {
  clearInterval(timerInterval);
  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('game-over').style.display = 'block';
  document.getElementById('final-score').textContent = score;
}

function restartGame() {
  gameStarted = false;
  document.getElementById('start-game').style.display = 'block';
  document.getElementById('game-over').style.display = 'none';
}

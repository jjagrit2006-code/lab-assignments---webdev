// 1. Quiz questions array with MCQs, hints and time limit (in seconds)
const quizQuestions = [
  {
    question: "Which element is said to keep bones strong?",
    options: [
      "A) carbon",
      "B) Nitrogen",
      "C) calcium",
      "D) oxygen"
    ],
    correctOption: "c",
    answerText: "calcium",
    timeLimit: 15
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "A) Caravaggio",
      "B) Leonardo Da Vinci",
      "C) Sandro Botticelli",
      "D) Galileo Galilei"
    ],
    correctOption: "b",
    answerText: "Leonardo Da Vinci",
    timeLimit: 15
  },
  {
    question: "What is the atomic sign for Helium on the periodic table?",
    options: [
      "A) H",
      "B) He",
      "C) Hi",
      "D) Hu"
    ],
    correctOption: "b",
    answerText: "He",
    timeLimit: 15
  },
  {
    question: "How many rings appear on the Olympic flag?",
    options: [
      "A) 1",
      "B) 3",
      "C) 7",
      "D) 5"
    ],
    correctOption: "d",
    answerText: "5",
    timeLimit: 15
  },
  {
    question: "What is the smallest country in the world by land area?",
    options: [
      "A) Monaco",
      "B) Nauru",
      "C) Vatican City",
      "D) Tuvalu"
    ],
    correctOption: "c",
    answerText: "Vatican City",
    timeLimit: 15
  },
  {
    question: "What is the general name for a group of wolves?",
    options: [
      "A) School",
      "B) Herd",
      "C) Pack",
      "D) Flock"
    ],
    correctOption: "c",
    answerText: "Pack",
    timeLimit: 15
  },
  {
    question: "Which is the longest river in the world?",
    options: [
      "A) Mississippi",
      "B) Amazon",
      "C) Nile",
      "D) Yangtze"
    ],
    correctOption: "c",
    answerText: "Nile",
    timeLimit: 15
  },
  {question: "Which U.S. state is famous for Hollywood?",
    options: [
      "A) California",
      "B) New York",
      "C) Florida",
      "D) Texas"
    ],
    correctOption: "a",
    answerText: "California",
    timeLimit: 15
  },
  {question: "Which planet is known as the Red Planet?",
    options: [
      "A) Mars",
      "B) Saturn",
      "C) Venus",
      "D) Mercury"
    ],
    correctOption: "c",
    answerText: "Venus",
    timeLimit: 15
  },
  {question: "What was the main purpose of the pyramids built by the ancient Egyptians?",
    options: [
      "A) To act as defensive fortresses",
      "B) To house the tombs of pharaohs",
      "C) To serve as royal palaces",
      "D) To function as public meeting spaces"
    ],
    correctOption: "b",
    answerText: "To house the tombs of pharaohs",
    timeLimit: 15
  }
];

// Helper: get high score from localStorage
function getHighScore() {
  const stored = localStorage.getItem("quizHighScore");
  return stored ? JSON.parse(stored) : { score: 0, total: 0 };
}

// Helper: save high score to localStorage
function saveHighScore(score, totalQuestions) {
  const currentHigh = getHighScore();
  if (score > currentHigh.score) {
    localStorage.setItem(
      "quizHighScore",
      JSON.stringify({ score: score, total: totalQuestions })
    );
    return true; // new high score
  }
  return false;
}

// Helper: build question text with options and timer info
function buildQuestionText(qObj, index) {
  const optionsText = qObj.options.join("\n");
  return (
    `Question ${index + 1} (Time: ${qObj.timeLimit} seconds)\n` +
    `${qObj.question}\n\n` +
    `${optionsText}\n\n` +
    "Type the option letter (a, b, c or d):"
  );
}

// 2. Function to run the quiz
function runQuiz() {
  let score = 0;

  alert("Welcome to the JavaScript Quiz!\nYou will see multiple-choice questions with a time limit.\nGood luck!");

  // 4. Loop through questions
  for (let i = 0; i < quizQuestions.length; i++) {
    const currentQuestion = quizQuestions[i];

    const startTime = Date.now();
    let userAnswer = prompt(buildQuestionText(currentQuestion, i));

    // If user presses Cancel
    if (userAnswer === null) {
      alert("Quiz cancelled.");
      return;
    }

    const endTime = Date.now();
    const timeTakenSeconds = (endTime - startTime) / 1000;

    userAnswer = userAnswer.toLowerCase().trim();

    let isCorrect = false;
    let timeUp = timeTakenSeconds > currentQuestion.timeLimit;

    if (!timeUp && userAnswer === currentQuestion.correctOption) {
      isCorrect = true;
      score++;
    }

    // 8. Customized feedback messages
    if (timeUp) {
      alert(
        `Time's up! ⏰ You took ${timeTakenSeconds.toFixed(
          1
        )} seconds.\nCorrect answer: ${currentQuestion.answerText}\nHint: ${currentQuestion.hint}`
      );
    } else if (isCorrect) {
      alert(
        `Correct! 🎉\nYou answered in ${timeTakenSeconds.toFixed(1)} seconds.`
      );
    } else {
      alert(
        `Incorrect. 😢\nCorrect answer: ${currentQuestion.answerText}\nHint: ${currentQuestion.hint}`
      );
    }
  }

  // 9. Display the final score + score-based messages
  const totalQuestions = quizQuestions.length;
  const percentage = (score / totalQuestions) * 100;
  let message;

  if (percentage === 100) {
    message = "Outstanding! 🌟 You got a perfect score!";
  } else if (percentage >= 80) {
    message = "Great job! 👍 You know your basics well.";
  } else if (percentage >= 50) {
    message = "Good try! 🙂 Keep practicing to improve.";
  } else {
    message = "Keep learning! 💪 Review the concepts and try again.";
  }

  const isNewHighScore = saveHighScore(score, totalQuestions);
  const highScore = getHighScore();

  let highScoreMessage = `High score: ${highScore.score} / ${highScore.total}`;
  if (isNewHighScore) {
    highScoreMessage += "\nNew high score! 🏆";
  }

  alert(
    `Quiz finished!\nYour score: ${score} out of ${totalQuestions}\nPercentage: ${percentage.toFixed(
      1
    )}%\n\n${message}\n\n${highScoreMessage}`
  );

  // 6. Restart option
  const restartChoice = prompt(
    "Do you want to play again? (yes/no)"
  );

  if (restartChoice && restartChoice.toLowerCase().trim() === "yes") {
    runQuiz();
  } else {
    alert("Thanks for playing the quiz! 👋");
  }
}

// To start the quiz in the console:
runQuiz();
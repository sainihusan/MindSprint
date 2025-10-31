import { QUESTION_POOL } from "./questions.js";
import { Quiz } from "./quiz.js";
import { UI } from "./ui.js";
import { Timer } from "./Timer.js";
import { Leaderboard } from "./leaderboard.js";


const ui = new UI();

let quiz;
let timer;
let feedback = "";

// Elements
const startBtn = document.getElementById("start-btn");
const nameInput = document.getElementById("player-name");
const topicSelect = document.getElementById("topic");
const difficultySelect = document.getElementById("difficulty");
const numInput = document.getElementById("num-questions");
const setupContainer = document.getElementById("setup-container");
const quizContainer = document.getElementById("quiz-container");
const timerDisplay = document.getElementById("timer");
const submitBtn = document.getElementById("submit-btn");
const homeBtn = document.getElementById("home-btn");

document.getElementById("result-actions").style.display = "none";
homeBtn.style.display = "none";

// Start quiz
startBtn.addEventListener("click", () => {
    const playerName = nameInput.value.trim();
    const topic = topicSelect.value;
    const difficulty = difficultySelect.value;
    const num = parseInt(numInput.value);

    if (!playerName) {   
        document.getElementById("player-name").style.border = " 2px solid red";
        return;
    }

    const filtered = QUESTION_POOL.filter(
        (q) => q.topic === topic && q.difficulty === difficulty
    ).slice(0, num);

    quiz = new Quiz(filtered);
    setupContainer.style.display = "none";
    quizContainer.style.display = "block";

    quiz.start();

    ui.updateScore(0, quiz.questions.length);
    ui.showQuestion(quiz.getCurrentQuestion());
    ui.showNextButton(false);

    // Timer based on difficulty & number of questions
    let timePerQuestion;
    if (difficulty === "easy") timePerQuestion = 10;
    else if (difficulty === "medium") timePerQuestion = 15;
    else timePerQuestion = 20;

    const totalTime = timePerQuestion * num;

    // Start timer
    timer = new Timer(timerDisplay, totalTime, () => endQuizOnTimeUp(playerName));
    timer.start();
});

// Handle answer
ui.onAnswer = (choice) => {
    const correct = quiz.checkAnswer(choice);
    const currentQ = quiz.getCurrentQuestion();

    if (correct) {
        ui.showMessage(" Correct!", true, currentQ.explanation);
    } else {
        ui.showMessage(` Wrong! Correct: ${currentQ.answer}`, false, currentQ.explanation);
    }

    ui.updateScore(quiz.score, quiz.questions.length);
    ui.showNextButton(true);
};

// Handle next
ui.nextBtn.addEventListener("click", () => {
    quiz.nextQuestion();

    if (quiz.isFinished()) {
        ui.showNextButton(false);
        submitBtn.style.display = "block";
    } else {
        ui.showQuestion(quiz.getCurrentQuestion());
        ui.showNextButton(false);
    }
});

// Handle submit
submitBtn.addEventListener("click", () => {
    const playerName = nameInput.value.trim() || "Anonymous";
    finishQuiz(playerName);
});

// When quiz time ends
function endQuizOnTimeUp(playerName) {
    document.getElementById("question").style.display = "none";
    document.getElementById("choices").style.display = "none";
    ui.showNextButton(false);
    submitBtn.style.display = "none";
    showFinalResult("⏰ Time’s up! ", playerName);
    timer.stop();
}

// When quiz is submitted
function finishQuiz(playerName) {
    timer.stop();
    document.getElementById("question").style.display = "none";
    document.getElementById("choices").style.display = "none";
    ui.showNextButton(false);
    submitBtn.style.display = "none";
    showFinalResult(" Quiz Finished! ", playerName);
}

// Helper for final result + save
function showFinalResult(prefix, playerName) {
    if (quiz.score === 0) feedback = "Don't be discouraged! Try again.";
    else if (quiz.score < 3) feedback = "Good try! Keep practicing.";
    else if (quiz.score >= 3 && quiz.score < 5) feedback = "Good job!";
    else if (quiz.score === 5) feedback = "Excellent! Perfect score!";

    const result = {
        name: playerName,
        score: quiz.score,
        total: quiz.questions.length,
        topic: topicSelect.value,
        difficulty: difficultySelect.value,
        date: new Date().toLocaleString(),
    };

    const playerData = {
        name: playerName,
        score: quiz.score,
        date: new Date().toLocaleDateString(),
    };

    let scores = JSON.parse(localStorage.getItem("quizScores")) || [];
    scores.push(playerData);
    localStorage.setItem("quizScores", JSON.stringify(scores));

    ui.showMessage(
        `${prefix}Score: ${quiz.score}/${quiz.questions.length}  ${feedback}`,
        false
    );
    document.getElementById("result-actions").style.display = "block";
    homeBtn.style.display = "block";
}
// ====== LEADERBOARD HANDLING ======
const leaderboard = new Leaderboard("leaderboard-content");

const leaderboardBtn = document.getElementById("leaderboard-btn");
const backBtn = document.getElementById("back-btn");

leaderboardBtn.addEventListener("click", () => {
  document.getElementById("setup-container").style.display = "none";
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("leaderboard-container").style.display = "block";
  leaderboard.render();
});

backBtn.addEventListener("click", () => {
  document.getElementById("leaderboard-container").style.display = "none";
  document.getElementById("setup-container").style.display = "block";
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
    if (!quiz) return;

    const key = e.key;

    if (["1", "2", "3", "4"].includes(key)) {
        const buttons = document.querySelectorAll(".choice-btn");
        const index = parseInt(key) - 1;
        buttons[index].click();
    }

    if ((key === "Enter" || key === " ") && ui.nextBtn.style.display !== "none") {
        ui.nextBtn.click();
    } else if (submitBtn.style.display !== "none") {
        submitBtn.click();
    }
});

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
  {
    question: "What is Tony Stark's superhero name?",
    answers: [
      { text: "War Machine", correct: false },
      { text: "Iron Man", correct: true },
      { text: "Hulk", correct: false },
      { text: "Thor", correct: false },
    ],
  },
  {
    question: "What powers Iron Man's suit in the first movie?",
    answers: [
      { text: "Nuclear reactor", correct: false },
      { text: "Arc Reactor", correct: true },
      { text: "Solar energy", correct: false },
      { text: "Vibranium core", correct: false },
    ],
  },
  {
    question: "Which AI system assists Tony Stark?",
    answers: [
      { text: "Ultron", correct: false },
      { text: "J.A.R.V.I.S.", correct: true },
      { text: "Friday", correct: false },
      { text: "Vision", correct: false },
    ],
  },
  {
    question: "Who becomes Iron Man's close ally with his own suit?",
    answers: [
      { text: "Doctor Strange", correct: false },
      { text: "War Machine", correct: true },
      { text: "Captain America", correct: false },
      { text: "Spider-Man", correct: false },
    ],
  },
  {
    question: "What element does Tony Stark create to replace palladium?",
    answers: [
      { text: "Vibranium", correct: false },
      { text: "Unstable isotope", correct: false },
      { text: "New element based on his father's research", correct: true },
      { text: "Adamantium", correct: false },
    ],
  },
];

//Quiz STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event listeners
startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)

function startQuiz(){
    //resetvars
    currentQuestionIndex=0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active")
    quizScreen.classList.add("active")

    showQuestion()
}

function showQuestion(){
    //reset state
    answersDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex]

    currentQuestionSpan.textContent = currentQuestionIndex + 1

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%"

    questionText.textContent = currentQuestion.question
    

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("answer-btn")

        button.dataset.correct = answer.correct

        button.addEventListener("click", selectAnswer)
        answersContainer.appendChild(button)
    })
}


function selectAnswer(event) {
    if(answersDisabled) return

    answersDisabled = true
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true"

    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        } else if(button === selectedButton) {
            button.classList.add("incorrect")
        }
    });

    if(isCorrect){
        score++;
        scoreSpan.textContent = score
    }

    setTimeout( () => {
        currentQuestionIndex++;
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion()
        } else {
            showResults()
        }
    }, 1000)
}

function showResults() {
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score;
    const percentage = (score/quizQuestions.length) * 100

    if (percentage === 100) {
        resultMessage.textContent = "Perfect. Impressive… but let’s be clear, I’m still the genius here.";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Nice work. You’re operating at Stark‑approved levels. Almost.";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Decent. You’ve got potential, but you’re not ready to wear the suit yet.";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Hmm. That’s… workable. Think of it as your Mark I — clunky, but it flies.";
    } else {
        resultMessage.textContent = "Ouch. That’s a crash landing. Don’t worry, even I had to build a better reactor.";
    }

}

function restartQuiz(){
    resultScreen.classList.remove("active")
    startQuiz();
}
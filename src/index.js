document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");
  const resetBtn = document.querySelector("#restartButton");
  const resultContainer = document.querySelector("#result");
  const timeRemainingContainer = document.getElementById("timeRemaining");

  quizView.style.display = "block";
  endView.style.display = "none";

  /************  QUIZ DATA  ************/
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question(
      "What is the capital of France?",
      ["Miami", "Paris", "Oslo", "Rome"],
      "Paris",
      1
    ),
    new Question(
      "Who created JavaScript?",
      ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"],
      "Brendan Eich",
      2
    ),
    new Question(
      "What is the mass–energy equivalence equation?",
      ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"],
      "E = mc^2",
      3
    ),
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)

  /************  QUIZ INSTANCE  ************/
  let quiz = new Quiz(questions, quizDuration, quizDuration);
  quiz.shuffleQuestions();

  /************  TIMER VARIABLE  ************/
  let timer; // Declare timer in a broader scope

  /************  SHOW INITIAL CONTENT  ************/
  updateTimeDisplay();

  // Show first question
  showQuestion();
  startCountdown();

  /************  EVENT LISTENERS  ************/
  nextButton.addEventListener("click", nextButtonHandler);
  resetBtn.addEventListener("click", restartQuiz);

  /************  FUNCTIONS  ************/

  function updateTimeDisplay() {
    const minutes = Math.floor(quiz.timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  }

  function showQuestion() {
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";
    const question = quiz.getQuestion();
    questionContainer.innerText = question.text;
    question.shuffleChoices();

    let progress = ((quiz.currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
      quiz.questions.length
    }`;

    question.choices.forEach((choice) => {
      const element = document.createElement("div");
      element.innerHTML = `<input type="radio" name="choice" value="${choice}">
                           <label>${choice}</label><br>`;
      choiceContainer.appendChild(element);
    });
  }

  function nextButtonHandler() {
    let selectedAnswer;
    const choiceElements = document.querySelectorAll('input[name="choice"]');

    choiceElements.forEach((choice) => {
      if (choice.checked) {
        selectedAnswer = choice.value;
      }
    });

    if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();
      showQuestion();
    }
  }

  function startCountdown() {
    timer = setInterval(() => {
      quiz.timeRemaining -= 1;
      updateTimeDisplay();
      if (quiz.timeRemaining <= 0) {
        clearInterval(timer);
        showResults(); // Automatically show results when time runs out
      }
    }, 1000);
  }

  function showResults() {
    clearInterval(timer); // Ensure the timer is cleared when showing results
    quizView.style.display = "none";
    endView.style.display = "flex";

    const totalQuestions = questions.length;
    const correctAnswers = quiz.correctAnswers;
    resultContainer.innerText = `You scored ${correctAnswers} out of ${totalQuestions} correct answers`;
  }

  function restartQuiz() {
    clearInterval(timer); // Clear the existing timer
    quiz = new Quiz(questions, quizDuration, quizDuration); // Reinitialize quiz
    quiz.shuffleQuestions();
    quizView.style.display = "block";
    endView.style.display = "none";
    updateTimeDisplay();
    showQuestion();
    startCountdown(); // Start new countdown
  }
});

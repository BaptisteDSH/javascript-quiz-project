class Quiz {
  // YOUR CODE HERE:

  //
  // 1. constructor (questions, timeLimit, timeRemaining)

  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }

  // 2. getQuestion()
  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  // 3. moveToNextQuestion()
  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }

  // 4. shuffleQuestions()
  shuffleQuestions() {
    for (let i = 0; i < this.questions.length; i++) {
      {
        let newQuestionsArray = [];
        const randomIndex = Math.floor(Math.random() * this.questions.length);
        const questionsToMove = this.questions[i];
        this.questions.splice(i, 1);
        this.questions.splice(randomIndex, 0, questionsToMove);
      }
    }
  }

  // 5. checkAnswer(answer)

  checkAnswer(answer) {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (answer === currentQuestion.answer) {
      this.correctAnswers++;
    }
  }

  // 6. hasEnded()
  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if (this.currentQuestionIndex === this.questions.length) {
      return true;
    } else {
      return undefined;
    }
  }

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty === 1 || difficulty === 2 || difficulty === 3) {
      const filteredArray = this.questions.filter((question) => {
        // Check if the question difficulty is valid (1, 2, or 3) and matches the provided difficulty
        return question.difficulty === difficulty;
      });

      return (this.questions = filteredArray);
    }
  }

  averageDifficulty() {
    if (this.questions.length === 0) return 0; // Avoid division by zero
    const totalOfDifficulty = this.questions.reduce((acc, curr) => {
      return acc + curr.difficulty;
    }, 0);
    const averageDifficulty = totalOfDifficulty / this.questions.length;

    return averageDifficulty;
  }
}

// if (this.questions.length === 0) return 0; // Avoid division by zero

//     const totalOfDifficulty = this.questions.reduce((acc, curr) => {
//       return acc + curr.difficulty;
//     }, 0);
//     const averageDifficulty = totalOfDifficulty / this.questions.length;

//     console.log(averageDifficulty);
//     return averageDifficulty;

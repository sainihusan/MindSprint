export class Quiz {
    //initialize quiz with questions
    constructor(questions) {
        this.questions = questions;
        this.currentIndex = 0;
        this.score = 0;
    }
    //start the quiz
    start() {
        this.currentIndex = 0;
        this.score = 0;
    }

    //get current question
    getCurrentQuestion() {
        return this.questions[this.currentIndex];
    }

    //check answer
    checkAnswer(selectedAnswer) {
        const currentQuestion = this.getCurrentQuestion();
        if (selectedAnswer === currentQuestion.answer) {
            this.score++;
            return true;
        } else {
            return false;
        }
    }

    //move to next question
    nextQuestion() {
        this.currentIndex++;
    }

    //check if quiz finished
    isFinished() {
        return this.currentIndex >= this.questions.length;
    }
}

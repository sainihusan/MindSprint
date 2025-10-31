export class UI {
    // Initialize UI elements
    constructor() {
        this.questionEl = document.getElementById('question');
        this.choicesEl = document.getElementById('choices');
        this.nextBtn = document.getElementById('next');
        this.scoreEl = document.getElementById('score');
        this.messageEl = document.getElementById('message');
        this.explainEl = document.getElementById('explanation');
    }

    // Show current question and choices
    showQuestion(question) {
        this.questionEl.textContent = question.question;
        this.choicesEl.innerHTML = '';

        question.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.textContent = choice;
            btn.classList.add('choice-btn');
            btn.addEventListener('click', () => this.handleAnswer(choice));
            this.choicesEl.appendChild(btn);
        });
    }

    // Handle answer selection
    handleAnswer(choice) {
        if (this.onAnswer) {
            this.onAnswer(choice);
        }
    }

    // Update score display
    updateScore(score, total) {
        this.scoreEl.textContent = `Score: ${score} / ${total}`;
    }

    // Show or hide next button
    showNextButton(show) {
        this.nextBtn.style.display = show ? 'block' : 'none';
    }

    // Display message + explanation
    showMessage(text, isCorrect, explanation) {
        this.messageEl.textContent = text;
        this.messageEl.style.color = isCorrect ? 'green' : 'red';
        this.explainEl.textContent = explanation;
    }
}

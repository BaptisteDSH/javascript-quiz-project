class Question {
    // YOUR CODE HERE:

    // 1. constructor (text, choices, answer, difficulty)

    constructor(text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }
    
    

    // 2. shuffleChoices()
    shuffleChoices() {
        let shuffledArray = [];
        for (let i = 0; i < this.choices.length; i++) {
            const randomIndex = Math.floor(Math.random() * this.choices.length);
            const choiceToMove = this.choices[i]
            this.choices.splice(i, 1)
            this.choices.splice(randomIndex, 0, choiceToMove)
         
        }
      
    

       
    }
}


      


  


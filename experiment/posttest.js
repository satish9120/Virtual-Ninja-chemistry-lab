/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////

(function () {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");


  /////////////////////////////////////////////////////////////////////////////

  /////////////////////// Do not modify the above code ////////////////////////

  /////////////////////////////////////////////////////////////////////////////






  /////////////// Write the MCQ below in the exactly same described format ///////////////


  const myQuestions = [
    {
      "question": "What is a standard solution in chemistry?",
      "options": {
        "A": "A solution that changes color",
        "B": "A solution of unknown concentration",
        "C": "A solution with a known and fixed concentration",
        "D": "A solution that evaporates quickly"
      },
      "answer": "C",
      "explanation": "A standard solution has a known and fixed concentration, used in titrations and quantitative analysis for accurate measurements."
    },
    {
      "question": "Which of the following is a suitable primary standard substance?",
      "options": {
        "A": "Hydrochloric acid (HCl)",
        "B": "Sodium hydroxide (NaOH)",
        "C": "Sulfuric acid (H2SO4)",
        "D": "Sodium carbonate (Na2CO3)"
      },
      "answer": "D",
      "explanation": "Sodium carbonate (Na2CO3) is stable, pure, and does not absorb moisture, making it ideal for use as a primary standard."
    },
    {
      "question": "How many grams of NaCl are needed to prepare 1 liter of 0.1 M NaCl solution? (Molar mass = 58.44 g/mol)",
      "options": {
        "A": "0.584 g",
        "B": "5.84 g",
        "C": "58.4 g",
        "D": "1.0 g"
      },
      "answer": "B",
      "explanation": "To prepare 0.1 M solution: 0.1 mol × 58.44 g/mol = 5.844 g ≈ 5.84 g of NaCl is required in 1 liter of solution."
    },
    {
      "question": "Why is NaOH not used as a primary standard reagent?",
      "options": {
        "A": "It is not soluble in water",
        "B": "It is too expensive",
        "C": "It absorbs moisture and CO₂ from the air",
        "D": "It reacts with plastic containers"
      },
      "answer": "C",
      "explanation": "NaOH is hygroscopic and absorbs both moisture and carbon dioxide from air, making it difficult to weigh accurately for standard solutions."
    }                          ///// To add more questions, copy the section below 
    ///// this line


    /* To add more MCQ's, copy the below section, starting from open curly braces ( { )
        till closing curly braces comma ( }, )

        and paste it below the curly braces comma ( below correct answer }, ) of above 
        question

    Copy below section

    {
      question: "This is question n?",
      answers: {
        a: "Option 1",
        b: "Option 2",
        c: "Option 3",
        d: "Option 4"
      },
      correctAnswer: "c"
    },

    Copy above section

    */




  ];




  /////////////////////////////////////////////////////////////////////////////

  /////////////////////// Do not modify the below code ////////////////////////

  /////////////////////////////////////////////////////////////////////////////


  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();


/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////
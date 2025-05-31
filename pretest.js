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
      "question": "What is a standard solution?",
      "options": {
        "A": "A solution with unknown concentration",
        "B": "A saturated solution",
        "C": "A solution of known and fixed concentration",
        "D": "A colored solution"
      },
      "answer": "C",
      "explanation": "A standard solution is one whose concentration is accurately known and remains stable. It is used in titration and quantitative analysis."
    },

    {
      "question": "Which of the following compounds is most suitable for preparing a primary standard solution?",
      "options": {
        "A": "Sodium hydroxide (NaOH)",
        "B": "Hydrochloric acid (HCl)",
        "C": "Sodium carbonate (Na2CO3)",
        "D": "Sulfuric acid (H2SO4)"
      },
      "answer": "C",
      "explanation": "Sodium carbonate is a primary standard because it is pure, stable, has a high molar mass, and does not absorb moisture from the air. Acids like HCl are not suitable because they are volatile or hygroscopic."
    },
    {
      "question": "What is the correct method to prepare 1 liter of 0.1 M NaCl solution?",
      "options": {
        "A": "Dissolve 0.1 g of NaCl in water",
        "B": "Dissolve 5.84 g of NaCl in water and make up to 1 liter",
        "C": "Dissolve 0.0584 g of NaCl in 100 mL water",
        "D": "Add NaCl until water tastes salty"
      },
      "answer": "B",
      "explanation": "To prepare 1 L of 0.1 M NaCl solution, you need 0.1 moles of NaCl. Molar mass of NaCl = 58.44 g/mol. So, 0.1 × 58.44 = 5.844 g ≈ 5.84 g."
    },
    {
      "question": "Why is NaOH not used as a primary standard substance?",
      "options": {
        "A": "It is too expensive",
        "B": "It is not water soluble",
        "C": "It is unstable and absorbs moisture and CO₂ from the air",
        "D": "It does not dissolve in alcohol"
      },
      "answer": "C",
      "explanation": "NaOH is hygroscopic and absorbs moisture and carbon dioxide from the atmosphere, making it difficult to weigh accurately. Hence, it is not suitable as a primary standard."
    }                            ///// To add more questions, copy the section below 
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
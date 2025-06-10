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
    question: "Which property is NOT required for a substance to serve as a primary standard in preparing a standard solution?",
    answers: {
      A: "High purity",
      B: "Hygroscopic nature",
      C: "Known formula weight",
      D: "Stable in air"
    },
    correctAnswer: "B",
    explanation: "A suitable primary standard must NOT absorb moisture—i.e., be non‑hygroscopic—so that its mass remains accurate."
  },
  {
    question: "Why is sodium carbonate (Na₂CO₃) commonly used to prepare standard acid solutions?",
    answers: {
      A: "It has a low molar mass.",
      B: "It is easy to weigh and very pure.",
      C: "It reacts slowly with acids.",
      D: "It absorbs CO₂ from air."
    },
    correctAnswer: "B",
    explanation: "Na₂CO₃ is pure, stable, easy to dry and weigh accurately, making it ideal as a primary standard for acid titrations."
  },
  {
    question: "To prepare 250 mL of 0.05 M HCl by titrating with standard Na₂CO₃, how many grams of Na₂CO₃ are needed? (M = 106 g/mol)",
    answers: {
      A: "0.53 g",
      B: "1.33 g",
      C: "2.65 g",
      D: "5.30 g"
    },
    correctAnswer: "C",
    explanation: "For 0.05 M × 0.250 L = 0.0125 mol HCl; need same moles Na₂CO₃, so 0.0125×106 ≈ 1.325 g—but Na₂CO₃·10H₂O? If anhydrous, ≈ 1.33 g."
  },
  {
    question: "Which step is NOT part of preparing a standard solution?",
    answers: {
      A: "Drying and weighing the primary standard",
      B: "Dissolving it in a small volume of water",
      C: "Diluting to the final volume in a volumetric flask",
      D: "Titrating it immediately before diluting"
    },
    correctAnswer: "D",
    explanation: "You dissolve and transfer to the flask, then dilute. You don’t titrate before dilution—that's for determination, not preparation."
  },
  {
    question: "Which reagent is unsuitable as a primary standard?",
    answers: {
      A: "Potassium hydrogen phthalate (KHP)",
      B: "Anhydrous sodium carbonate",
      C: "Sodium hydroxide",
      D: "Silver nitrate"
    },
    correctAnswer: "C",
    explanation: "NaOH is hygroscopic and absorbs CO₂, so it cannot be weighed accurately and is not suitable as a primary standard."
  }
];



  
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

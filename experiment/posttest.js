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
    question: "Which of the following is the most important characteristic of a primary standard?",
    answers: {
      A: "High solubility in water",
      B: "High degree of impurities",
      C: "Known and stable molar mass",
      D: "Strong odor"
    },
    correctAnswer: "C",
    explanation: "A primary standard must have a known and constant molar mass so you can accurately determine concentration when weighing it."
  },
  {
    question: "What volume of 0.1 M NaOH solution is needed to neutralize 0.025 mol of HCl?",
    answers: {
      A: "0.050 L",
      B: "0.025 L",
      C: "0.200 L",
      D: "0.125 L"
    },
    correctAnswer: "A",
    explanation: "HCl + NaOH reacts 1:1, so you need 0.025 mol NaOH. Volume = mol ÷ molarity = 0.025 ÷ 0.1 = 0.25 L = 50 mL."
  },
  {
    question: "When preparing a standard solution in a volumetric flask, why should the solid be dissolved in a small volume of solvent first?",
    answers: {
      A: "It ensures full dissolution before making up to the final volume",
      B: "It prevents evaporation",
      C: "It changes the concentration",
      D: "It enhances the color of the solution"
    },
    correctAnswer: "A",
    explanation: "Dissolving in a small volume ensures complete dissolution and better accuracy before adjusting to the mark."
  },
  {
    question: "Which error will occur if you mistakenly fill above the calibration mark on the volumetric flask?",
    answers: {
      A: "No error",
      B: "Concentration will be too low",
      C: "Concentration will be too high",
      D: "Solvent polarity will change"
    },
    correctAnswer: "B",
    explanation: "Filling above the mark increases total volume—while amount of solute stays the same—so concentration is lower than intended."
  },
  {
    question: "Why is KHP (potassium hydrogen phthalate) commonly used to standardize NaOH solutions instead of NaOH itself?",
    answers: {
      A: "It is a liquid",
      B: "It is hygroscopic",
      C: "It has high purity and is stable",
      D: "It reacts slowly"
    },
    correctAnswer: "C",
    explanation: "KHP is a solid with high purity, stable, non-hygroscopic—ideal as a primary standard for titrating NaOH."
  }
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

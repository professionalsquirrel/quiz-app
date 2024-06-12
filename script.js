const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


const questions = [
    {
        question: "What is the average diameter of the soma of a neuron?",
        answers: [
            {text: "4 to 100 μm", correct: true},
            {text: "40 to 90 cm", correct: false},
            {text: "2 to 5 μm", correct: false},
            {text: "1 to 30 nm", correct: false}
        ]
    },

    {    question: "What is the oldest part of the brain?",
        answers: [
            {text: "broca's area", correct: false},
            {text: "the brain stem", correct: true},
            {text: "the occipital lobe", correct: false},
            {text: "the cerebellum", correct: false}
        ],

    },
    {   question: "Which excitatory neurotransmitter is most abundant in the brain?",
        answers: [
            {text: "dopamine", correct: false},
            {text: "glutamate", correct: true},
            {text: "epinephrine", correct: false},
            {text: "histamine", correct: false}
        ],
    },
    {
        question: "What is the average resting potential of the neuron?",
        answers: [
            {text: "-100mV", correct: false},
            {text: "90mV", correct: false},
            {text: "-40mV", correct: false},
            {text: "-70mV", correct: true}
        ]
    }
];
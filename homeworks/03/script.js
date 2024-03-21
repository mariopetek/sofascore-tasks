const startButton = document.querySelector('.start-button')
startButton.addEventListener('click', startQuiz)

const QUESTIONS_NUM = 15
const QUESTIONS_PER_DIFFICULTY = Math.floor(QUESTIONS_NUM / 3)

let currentQuestion = 1

async function startQuiz() {
    const startContainer = document.querySelector('.start-container')
    startContainer.parentNode.removeChild(startContainer)
    startButton.removeEventListener('click', startQuiz)

    const questionData = await getQuestionData()
    console.log(questionData)
    showQuestionContainer(questionData)
}

async function getQuestionData() {
    let difficulty
    if (currentQuestion < QUESTIONS_PER_DIFFICULTY) {
        difficulty = 'easy'
    } else if (currentQuestion < QUESTIONS_PER_DIFFICULTY * 2) {
        difficulty = 'medium'
    } else {
        difficulty = 'hard'
    }
    const url = `https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&type=multiple`

    try {
        showLoadingIndicator()
        const response = await fetch(url)
        if (response.status !== 200) {
            throw new Error(
                'An error occurred while fetching the question. Please try again.'
            )
        }
        const data = await response.json()
        const questionData = data.results[0]
        return {
            question: questionData.question,
            difficulty: questionData.difficulty,
            correctAnswer: questionData.correct_answer,
            incorrectAnswers: questionData.incorrect_answers
        }
    } catch (error) {
        showError(error.message)
    } finally {
        hideLoadingIndicator()
    }
}

function showLoadingIndicator() {
    const loadingIndicator = document.createElement('p')
    loadingIndicator.classList.add('loading-indicator')
    loadingIndicator.innerText = 'Loading...'
    document.body.appendChild(loadingIndicator)
}

function hideLoadingIndicator() {
    const loadingIndicator = document.querySelector('.loading-indicator')
    loadingIndicator.parentNode.removeChild(loadingIndicator)
}

function showError(message) {
    console.error(message)
    const errorMessage = document.createElement('p')
    errorMessage.classList.add('error-message')
    errorMessage.innerHTML = `${message}`
    document.body.appendChild(errorMessage)
}

function showQuestionContainer(questionData) {
    const questionNumber = document.createElement('h2')
    questionNumber.innerText = `Question ${currentQuestion}`
    const questionText = document.createElement('p')
    questionText.innerHTML = questionData.question

    const questionContent = document.createElement('div')
    questionContent.classList.add('question-content')
    questionContent.append(questionNumber, questionText)

    const answersContainer = document.createElement('div')
    answersContainer.classList.add('answers-container')
    const answers = [
        questionData.correctAnswer,
        ...questionData.incorrectAnswers
    ]
    shuffle(answers)

    answers.forEach((answer, index) => {
        const answerInput = document.createElement('input')
        answerInput.type = 'radio'
        answerInput.name = 'answer'
        answerInput.id = `answer${index + 1}`
        answerInput.value = answer

        const answerLabel = document.createElement('label')
        answerLabel.htmlFor = `answer${index + 1}`
        answerLabel.innerText = answer

        const answerCard = document.createElement('div')
        answerCard.classList.add('answer-card')
        answerCard.append(answerInput, answerLabel)

        answersContainer.appendChild(answerCard)
    })

    const answerButton = document.createElement('button')
    answerButton.classList.add('answer-button')
    answerButton.innerText = 'Answer'

    const questionContainer = document.createElement('div')
    questionContainer.classList.add('question-container')
    questionContainer.append(questionContent, answersContainer, answerButton)

    document.body.prepend(questionContainer)
}

function shuffle(answers) {
    const randomIndex = Math.floor(Math.random() * answers.length)
    const temp = answers[0]
    answers[0] = answers[randomIndex]
    answers[randomIndex] = temp
}

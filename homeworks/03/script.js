const startButton = document.querySelector('.start-button')
startButton.addEventListener('click', startQuiz)

const QUESTIONS_NUM = 15
const QUESTIONS_PER_DIFFICULTY = Math.floor(QUESTIONS_NUM / 3)

let currentQuestion = 1

function startQuiz() {
    startButton.removeEventListener('click', startQuiz)
    const startContainer = document.querySelector('.start-container')
    startContainer.remove()

    nextQuestion()
}

async function nextQuestion() {
    const questionData = await getQuestionData()
    console.log(questionData)
    showQuestionContainer(questionData)
}

async function getQuestionData() {
    let difficulty
    if (currentQuestion <= QUESTIONS_PER_DIFFICULTY) {
        difficulty = 'easy'
    } else if (currentQuestion <= QUESTIONS_PER_DIFFICULTY * 2) {
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
    const loadingIndicator = document.createElement('div')
    loadingIndicator.classList.add('loading-indicator')
    /*loadingIndicator.innerText = 'Loading...'*/
    document.body.prepend(loadingIndicator)
}

function hideLoadingIndicator() {
    const loadingIndicator = document.querySelector('.loading-indicator')
    loadingIndicator.remove()
}

function showError(message) {
    console.error(message)
    const errorMessage = document.createElement('p')
    errorMessage.classList.add('error-message')
    errorMessage.innerHTML = `${message}`
    document.body.prepend(errorMessage)
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

    const answerButton = document.createElement('button')
    answerButton.classList.add('answer-button')
    answerButton.innerText = 'Answer'
    answerButton.disabled = true

    answers.forEach((answer, index) => {
        const answerInput = document.createElement('input')
        answerInput.type = 'radio'
        answerInput.name = 'answer'
        answerInput.id = `answer${index + 1}`
        answerInput.value = answer
        answerInput.addEventListener('click', function () {
            answerButton.disabled = false
        })

        const answerLabel = document.createElement('label')
        answerLabel.htmlFor = `answer${index + 1}`
        answerLabel.innerHTML = answer

        const answerCard = document.createElement('div')
        answerCard.classList.add('answer-card')
        answerCard.append(answerInput, answerLabel)

        answersContainer.appendChild(answerCard)
    })

    const buttonsContainer = document.createElement('div')
    buttonsContainer.classList.add('buttons-container')
    buttonsContainer.appendChild(answerButton)

    const questionContainer = document.createElement('div')
    questionContainer.classList.add('question-container')
    questionContainer.append(
        questionContent,
        answersContainer,
        buttonsContainer
    )

    document.body.prepend(questionContainer)

    answerButton.addEventListener('click', function () {
        answerButton.disabled = true
        const options = document.querySelectorAll('input[name="answer"]')
        options.forEach(option => (option.disabled = true))
        let selectedOption
        for (const option of options) {
            if (option.checked) {
                selectedOption = option
                break
            }
        }
        const selectedAnswer = selectedOption.value
        const selectedLabel = document.querySelector(
            `label[for="${selectedOption.id}"]`
        )
        if (selectedAnswer === questionData.correctAnswer) {
            selectedLabel.classList.add('correct-answer')
            const nextQuestionButton = document.createElement('button')
            nextQuestionButton.classList.add('next-question-button')
            nextQuestionButton.innerText = 'Next question'
            nextQuestionButton.addEventListener('click', function () {
                questionContainer.remove()
                currentQuestion++
                if (currentQuestion <= QUESTIONS_NUM) {
                    nextQuestion()
                }
            })
            buttonsContainer.appendChild(nextQuestionButton)
        } else {
            selectedLabel.classList.add('wrong-answer')
        }
    })
}

function shuffle(answers) {
    const randomIndex = Math.floor(Math.random() * answers.length)
    const temp = answers[0]
    answers[0] = answers[randomIndex]
    answers[randomIndex] = temp
}

const QUESTIONS_NUM = 15
const QUESTIONS_PER_DIFFICULTY = Math.floor(QUESTIONS_NUM / 3)

document.querySelector(
    '.info-paragraph'
).innerHTML = `Welcome to <strong>Rocky Road</strong>, a quiz game that
features ${QUESTIONS_NUM} questions, each progressively more challenging
than the last. Try to answer all the questions correctly and
discover what awaits you at the end of the road.`

const startButton = document.querySelector('.start-button')
startButton.addEventListener('click', startQuiz)

let currentQuestion

const congratulationsSound = new Audio('./sounds/congratulations.mp3')
const correctSound = new Audio('./sounds/correct.mp3')
const wrongSound = new Audio('./sounds/wrong.mp3')

function startQuiz() {
    currentQuestion = 1
    startButton.removeEventListener('click', startQuiz)
    const startContainer = document.querySelector('.start-container')
    startContainer.remove()

    nextQuestion()
}

async function nextQuestion() {
    const questionData = await getQuestionData()
    console.log(questionData)

    showQuestionContainer(questionData)

    showHighScore()
}

function updateHighScore() {
    const highScore = localStorage.getItem('highScore') || 0
    if (highScore < currentQuestion) {
        localStorage.setItem('highScore', currentQuestion)
    }
}

function showHighScore() {
    const highScore = localStorage.getItem('highScore') || 0
    const highScoreText =
        document.querySelector('.high-score-text') ||
        document.createElement('span')
    highScoreText.classList.add('high-score-text')
    highScoreText.innerText = `High score: ${highScore}`
    document.body.prepend(highScoreText)
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
    document.body.appendChild(loadingIndicator)
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

    const answerButton = document.createElement('button')
    answerButton.classList.add('main-button', 'answer-button')
    answerButton.innerText = 'Answer'
    answerButton.disabled = true

    answers.forEach(answer => {
        const answerInput = document.createElement('input')
        answerInput.type = 'radio'
        answerInput.name = 'answer'
        answerInput.id = answer
        answerInput.value = answer
        answerInput.addEventListener('click', function () {
            answerButton.disabled = false
        })

        const answerLabel = document.createElement('label')
        answerLabel.htmlFor = answer
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

        const selectedOption = document.querySelector(
            'input[name="answer"]:checked'
        )

        const answerResponseContainer = document.createElement('div')
        answerResponseContainer.classList.add('answer-response-container')

        const selectedAnswer = selectedOption.value
        const selectedLabel = document.querySelector(
            `label[for="${selectedOption.id}"]`
        )
        if (selectedAnswer === questionData.correctAnswer) {
            correctSound.play()

            updateHighScore()
            showHighScore()

            selectedLabel.classList.add('correct-answer')

            const nextButton = document.createElement('button')
            nextButton.classList.add('next-button')
            nextButton.innerText =
                currentQuestion < QUESTIONS_NUM ? 'Next question' : 'Finish'
            nextButton.addEventListener('click', function () {
                answerResponseContainer.remove()
                questionContainer.remove()
                currentQuestion++
                if (currentQuestion <= QUESTIONS_NUM) {
                    nextQuestion()
                } else {
                    document.querySelector('.high-score-text').remove()

                    congratulationsSound.play()

                    document.body.style.overflow = 'hidden'
                    setInterval(createFallingEmoji, 200)

                    const congratulationsHeader = document.createElement('h1')
                    congratulationsHeader.classList.add(
                        'congratulations-header'
                    )
                    congratulationsHeader.innerText = 'Congratulations!'

                    const congratulationsText = document.createElement('p')
                    congratulationsText.classList.add('congratulations-text')
                    congratulationsText.innerText = `You have reached the end of the road by answering all ${QUESTIONS_NUM} questions. Cheers!`

                    const backToStartButton = document.createElement('button')
                    backToStartButton.classList.add(
                        'main-button',
                        'back-to-start-button'
                    )
                    backToStartButton.innerText = 'Back to Start'
                    backToStartButton.addEventListener('click', function () {
                        answerResponseContainer.remove()
                        window.location.reload()
                    })

                    document.body.prepend(
                        congratulationsHeader,
                        congratulationsText,
                        backToStartButton
                    )
                }
            })
            buttonsContainer.appendChild(nextButton)

            const correctAnswerMessage = document.createElement('p')
            correctAnswerMessage.classList.add('correct-answer-message')
            correctAnswerMessage.innerText =
                currentQuestion === QUESTIONS_NUM
                    ? 'Your answer is correct! You can finish the quiz now :)'
                    : "Your answer is correct! You can move to the next question once you're ready :)"
            answerResponseContainer.appendChild(correctAnswerMessage)
        } else {
            wrongSound.play()

            selectedLabel.classList.add('wrong-answer')

            document
                .querySelector(`label[for="${questionData.correctAnswer}"]`)
                .classList.add('wrong-answer-correct')

            const wrongAnswerMessage = document.createElement('p')
            wrongAnswerMessage.classList.add('wrong-answer-message')
            wrongAnswerMessage.innerText =
                'Unfortunately, your answer is wrong :('

            const startAgainButton = document.createElement('button')
            startAgainButton.classList.add('main-button', 'start-again-button')
            startAgainButton.innerText = 'Start again'
            startAgainButton.addEventListener('click', function () {
                answerResponseContainer.remove()
                questionContainer.remove()
                currentQuestion = 1
                nextQuestion()
            })
            answerResponseContainer.append(wrongAnswerMessage, startAgainButton)
        }
        document.body.appendChild(answerResponseContainer)
    })
}

function shuffle(answers) {
    const randomIndex = Math.floor(Math.random() * answers.length)
    const temp = answers[0]
    answers[0] = answers[randomIndex]
    answers[randomIndex] = temp
}

function getRandomEmoji() {
    const emojis = ['✨', '🎊', '🎉', '🏆', '🤩', '😎', '🥳']
    return emojis[Math.floor(Math.random() * emojis.length)]
}

function getRandomSize() {
    return Math.floor(Math.random() * 56) + 18
}

function createFallingEmoji() {
    const emoji = document.createElement('div')
    emoji.classList.add('emoji')
    emoji.innerText = getRandomEmoji()
    emoji.style.fontSize = getRandomSize() + 'px'
    document.body.appendChild(emoji)

    const horizontalPos =
        Math.random() * (window.innerWidth - emoji.clientWidth)
    emoji.style.left = `${horizontalPos}px`

    emoji.addEventListener('animationend', () => {
        emoji.remove()
    })
}

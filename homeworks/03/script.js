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
let numOf100Jokers
let numOf5050Jokers

function setInitialState() {
    currentQuestion = 1
    numOf100Jokers = 1
    numOf5050Jokers = 3
}

const congratulationsSound = new Audio('./sounds/congratulations.mp3')
const correctSound = new Audio('./sounds/correct.mp3')
const wrongSound = new Audio('./sounds/wrong.mp3')

function startQuiz() {
    startButton.removeEventListener('click', startQuiz)
    const startContainer = document.querySelector('.start-container')
    startContainer.remove()

    setInitialState()
    getNextQuestion()
}

async function getNextQuestion() {
    const questionData = await getQuestionData()
    //console.log(questionData)

    questionData && showQuestion(questionData)

    showHighScore()
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

const loadingIndicator = document.createElement('div')
loadingIndicator.classList.add('loading-indicator')
function showLoadingIndicator() {
    document.body.appendChild(loadingIndicator)
}
function hideLoadingIndicator() {
    loadingIndicator.remove()
}

function showError(message) {
    console.error(message)
    const errorMessage = document.createElement('p')
    errorMessage.classList.add('error-message')
    errorMessage.innerHTML = `${message}`
    document.body.appendChild(errorMessage)
}

function showQuestion(questionData) {
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
    const correctIndex = shuffle(answers)

    answers.forEach(answer => {
        const answerInput = document.createElement('input')
        answerInput.type = 'radio'
        answerInput.name = 'answer'
        answerInput.id = answer
        answerInput.value = answer
        answerInput.addEventListener('click', enableAnswerButton)

        const answerLabel = document.createElement('label')
        answerLabel.innerHTML = answer
        answerLabel.htmlFor = answer
        answerLabel.title = answerLabel.innerHTML

        const answerCard = document.createElement('div')
        answerCard.classList.add('answer-card')
        answerCard.append(answerInput, answerLabel)

        answersContainer.appendChild(answerCard)
    })

    const answerButton = document.createElement('button')
    answerButton.classList.add('main-button', 'answer-button')
    answerButton.innerText = 'Answer'
    answerButton.title = 'Answer the question'
    answerButton.disabled = true
    answerButton.addEventListener('click', handleAnswerClick)
    function enableAnswerButton() {
        answerButton.disabled = false
    }
    function handleAnswerClick() {
        answerButton.removeEventListener('click', handleAnswerClick)
        answerButton.disabled = true

        disableJokers()

        const options = document.querySelectorAll('input[name="answer"]')
        options.forEach(option => {
            option.disabled = true
            option.removeEventListener('click', enableAnswerButton)
        })

        const selectedOption = document.querySelector(
            'input[name="answer"]:checked'
        )

        const answerResponseContainer = document.createElement('div')
        answerResponseContainer.classList.add('answer-response-container')

        const selectedLabel = document.querySelector(
            `label[for="${selectedOption.id}"]`
        )
        if (selectedOption.value === questionData.correctAnswer) {
            correctSound.play()

            updateHighScore()
            showHighScore()

            selectedLabel.classList.add('correct-answer')

            const nextButton = document.createElement('button')
            nextButton.classList.add('next-button')
            nextButton.innerText = nextButton.title =
                currentQuestion < QUESTIONS_NUM ? 'Next question' : 'Finish'
            nextButton.addEventListener('click', handleNextClick)
            function handleNextClick() {
                nextButton.removeEventListener('click', handleNextClick)

                answerResponseContainer.remove()
                questionContainer.remove()
                jokersContainer.remove()

                currentQuestion++
                if (currentQuestion <= QUESTIONS_NUM) {
                    getNextQuestion()
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
                    backToStartButton.title = 'Back to Start'
                    backToStartButton.addEventListener('click', () => {
                        location.reload()
                    })

                    document.body.prepend(
                        congratulationsHeader,
                        congratulationsText,
                        backToStartButton
                    )
                }
            }
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
            startAgainButton.title = 'Start the quiz again'
            startAgainButton.addEventListener('click', handleStartAgainClick)
            function handleStartAgainClick() {
                startAgainButton.removeEventListener(
                    'click',
                    handleStartAgainClick
                )
                answerResponseContainer.remove()
                questionContainer.remove()
                jokersContainer.remove()

                setInitialState()
                getNextQuestion()
            }
            answerResponseContainer.append(wrongAnswerMessage, startAgainButton)
        }
        document.body.appendChild(answerResponseContainer)
    }

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

    const jokersContainer = document.createElement('div')
    jokersContainer.classList.add('jokers-container')
    document.body.prepend(jokersContainer)

    document.body.prepend(questionContainer)

    function show100Jokers() {
        for (let i = 0; i < numOf100Jokers; i++) {
            const joker100Button = document.createElement('button')
            joker100Button.classList.add('joker-button', 'joker-button-100')
            joker100Button.innerText = '100%'
            joker100Button.title = 'Joker 100%'
            joker100Button.addEventListener('click', play100Joker)

            jokersContainer.appendChild(joker100Button)
        }
    }

    function show5050Jokers() {
        for (let i = 0; i < numOf5050Jokers; i++) {
            const joker5050Button = document.createElement('button')
            joker5050Button.classList.add('joker-button', 'joker-button-5050')
            joker5050Button.innerText = '50:50'
            joker5050Button.title = 'Joker 50:50'
            joker5050Button.addEventListener('click', play5050Joker)

            jokersContainer.appendChild(joker5050Button)
        }
    }

    function removeJokers() {
        document
            .querySelectorAll('.joker-button')
            .forEach(jokerButton => jokerButton.remove())
    }

    function reRenderJokers() {
        removeJokers()
        show100Jokers()
        show5050Jokers()
    }

    function disableJokers() {
        document
            .querySelectorAll('.joker-button')
            .forEach(jokerButton => (jokerButton.disabled = true))
    }

    function play100Joker() {
        const answerInputs = document.querySelectorAll('input[name="answer"]')
        answerInputs.forEach(answerInput => {
            if (answerInput.value !== questionData.correctAnswer) {
                if (answerInput.checked) {
                    answerInput.checked = false
                    answerButton.disabled = true
                }
                answerInput.disabled = true

                const answerLabel = document.querySelector(
                    `label[for="${answerInput.id}"]`
                )
                answerLabel.style.color = 'transparent'
                answerLabel.style.userSelect = 'none'
                answerLabel.title = ''
            }
        })

        numOf100Jokers--
        checkJokers()
        disableJokers()
    }

    let randomIndex
    do {
        randomIndex = Math.floor(Math.random() * 4)
    } while (randomIndex === correctIndex)
    function play5050Joker() {
        const answerInputs = document.querySelectorAll('input[name="answer"]')

        answerInputs.forEach((answerInput, index) => {
            if (
                answerInput.value !== questionData.correctAnswer &&
                index !== randomIndex
            ) {
                if (answerInput.checked) {
                    answerInput.checked = false
                    answerButton.disabled = true
                }
                answerInput.disabled = true

                const answerLabel = document.querySelector(
                    `label[for="${answerInput.id}"]`
                )
                answerLabel.style.color = 'transparent'
                answerLabel.style.userSelect = 'none'
                answerLabel.title = ''
            }
        })

        numOf5050Jokers--
        checkJokers()
        disableJokers()
    }

    function checkJokers() {
        if (numOf100Jokers + numOf5050Jokers === 0) {
            jokersContainer.remove()
        } else {
            reRenderJokers()
        }
    }

    checkJokers()
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
    highScoreText.innerHTML = `High score: <span>${highScore}</span>`
    document.body.prepend(highScoreText)
}

function shuffle(answers) {
    const randomIndex = Math.floor(Math.random() * answers.length)
    ;[answers[0], answers[randomIndex]] = [answers[randomIndex], answers[0]]
    return randomIndex
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

    const horizontalPos = Math.random() * (innerWidth - emoji.clientWidth)
    emoji.style.left = `${horizontalPos}px`

    emoji.addEventListener('animationend', () => {
        emoji.remove()
    })
}

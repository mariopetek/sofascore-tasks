const startButton = document.querySelector('.start-button')
startButton.addEventListener('click', startQuiz)

const QUESTIONS_NUM = 15
const QUESTIONS_PER_DIFFICULTY = Math.floor(QUESTIONS_NUM / 3)

let currentQuestion = 1

async function startQuiz() {
    const startContainer = document.querySelector('.start-container')
    startContainer.parentNode.removeChild(startContainer)
    startButton.removeEventListener('click', startQuiz)

    const question = await getQuestionData()
    console.log(question)
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
        const questionData = await response.json()
        return questionData.results[0]
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

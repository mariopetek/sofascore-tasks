const startButton = document.querySelector('.start-button')
startButton.addEventListener('click', startQuiz)

function startQuiz() {
    const infoContainer = document.querySelector('.start-container')
    document.body.removeChild(infoContainer)
}

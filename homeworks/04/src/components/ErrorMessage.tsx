import styles from './styles/ErrorMessage.module.css'

type ErrorMessageProps = {
    text: string
}

function ErrorMessage({ text }: ErrorMessageProps) {
    return (
        <div className={styles.errorContainer}>
            <h2>Error</h2>
            <p>{text}</p>
        </div>
    )
}

export default ErrorMessage

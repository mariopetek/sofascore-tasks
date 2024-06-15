import styles from './styles/LoadingIndicator.module.css'

function LoadingIndicator() {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loadingBar}></div>
            <div className={styles.loadingBar}></div>
            <div className={styles.loadingBar}></div>
        </div>
    )
}

export default LoadingIndicator

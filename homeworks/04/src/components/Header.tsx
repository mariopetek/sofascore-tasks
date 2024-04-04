import LikeButton from './LikeButton'
import SettingsButton from './SettingsButton'
import pokeball from '../assets/pokeball.svg'

import styles from './styles/Header.module.css'

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.mainHeading}>
                <img
                    src={pokeball}
                    alt="Pokeball icon"
                    className={styles.pokeballIcon}
                />
                <span className={styles.headingText}>POKEDEX</span>
            </div>
            <div className={styles.optionsContainer}>
                <LikeButton />
                <SettingsButton />
            </div>
        </header>
    )
}

export default Header

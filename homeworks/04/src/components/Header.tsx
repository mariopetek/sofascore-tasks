import LikeButton from './LikeButton'
import SettingsButton from './SettingsButton'
import pokeball from '../assets/pokeball.svg'

import styles from './styles/Header.module.css'
import { useEffect, useRef, useState } from 'react'
import SettingsMenu from './SettingsMenu'

function Header() {
    const [showSettingsMenu, setShowSettingsMenu] = useState(false)
    const settingsButtonRef = useRef<HTMLDivElement>(null)
    const settingsMenuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                showSettingsMenu &&
                settingsButtonRef.current &&
                settingsMenuRef.current &&
                !settingsButtonRef.current.contains(event.target as Node) &&
                !settingsMenuRef.current.contains(event.target as Node)
            ) {
                setShowSettingsMenu(false)
            }
        }

        window.addEventListener('mousedown', handleClickOutside)
        return () => {
            window.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showSettingsMenu])

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
                <div
                    className={styles.settingsContainer}
                    ref={settingsButtonRef}>
                    <SettingsButton
                        clickHandler={() => {
                            setShowSettingsMenu(!showSettingsMenu)
                        }}
                    />
                    {showSettingsMenu && (
                        <SettingsMenu settingsMenuRef={settingsMenuRef} />
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header

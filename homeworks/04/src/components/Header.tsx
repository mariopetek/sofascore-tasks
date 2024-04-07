import FavoritesButton from './FavoritesButton'
import SettingsButton from './SettingsButton'
import pokeball from '../assets/pokeball.svg'
import { useEffect, useRef, useState } from 'react'
import SettingsMenu from './SettingsMenu'
import LikedPokemonModal from './LikedPokemonModal'

import styles from './styles/Header.module.css'

function Header() {
    const [showSettingsMenu, setShowSettingsMenu] = useState(false)
    const settingsButtonRef = useRef<HTMLDivElement>(null)
    const settingsMenuRef = useRef<HTMLDivElement>(null)

    const [showLikedPokemonModal, setShowLikedPokemonModal] = useState(false)
    const likedPokemonModalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutsideSettingsMenu = (event: MouseEvent) => {
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

        const handleClickOutsidePokemonModal = (event: MouseEvent) => {
            if (
                showLikedPokemonModal &&
                likedPokemonModalRef.current &&
                !likedPokemonModalRef.current.contains(event.target as Node)
            ) {
                setShowLikedPokemonModal(false)
            }
        }

        window.addEventListener('mousedown', handleClickOutsideSettingsMenu)
        window.addEventListener('mousedown', handleClickOutsidePokemonModal)
        return () => {
            window.removeEventListener(
                'mousedown',
                handleClickOutsideSettingsMenu
            )
            window.removeEventListener(
                'mousedown',
                handleClickOutsidePokemonModal
            )
        }
    }, [showSettingsMenu, showLikedPokemonModal])

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
                <div className={styles.likeContainer}>
                    <FavoritesButton
                        clickHandler={() => setShowLikedPokemonModal(true)}
                    />
                    {showLikedPokemonModal && (
                        <LikedPokemonModal ref={likedPokemonModalRef} />
                    )}
                </div>
                <div
                    className={styles.settingsContainer}
                    ref={settingsButtonRef}>
                    <SettingsButton
                        clickHandler={() =>
                            setShowSettingsMenu(currentShow => !currentShow)
                        }
                    />
                    {showSettingsMenu && <SettingsMenu ref={settingsMenuRef} />}
                </div>
            </div>
        </header>
    )
}

export default Header

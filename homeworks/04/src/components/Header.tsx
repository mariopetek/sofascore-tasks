import LikeButton from './LikeButton'
import SettingsButton from './SettingsButton'
import pokeball from '../assets/pokeball.svg'

import styles from './styles/Header.module.css'
import { useEffect, useRef, useState } from 'react'
import SettingsMenu from './SettingsMenu'
import LikedPokemonModal from './LikedPokemonModal'

function Header() {
    const [showSettingsMenu, setShowSettingsMenu] = useState(false)
    const settingsButtonRef = useRef<HTMLDivElement>(null)
    const settingsMenuRef = useRef<HTMLDivElement>(null)

    const likedPokemonModalRef = useRef<HTMLDialogElement>(null)

    const toggleLikedPokemonModal = () => {
        if (!likedPokemonModalRef.current) {
            return
        }
        likedPokemonModalRef.current.hasAttribute('open')
            ? likedPokemonModalRef.current.close()
            : likedPokemonModalRef.current.showModal()
    }

    const handlePokemonModalClick = (
        event: React.MouseEvent<HTMLDialogElement, MouseEvent>
    ) => {
        if (event.currentTarget === event.target) {
            toggleLikedPokemonModal()
        }
    }

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

        window.addEventListener('mousedown', handleClickOutsideSettingsMenu)
        return () => {
            window.removeEventListener(
                'mousedown',
                handleClickOutsideSettingsMenu
            )
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
                <LikeButton clickHandler={() => toggleLikedPokemonModal()} />
                <div
                    className={styles.settingsContainer}
                    ref={settingsButtonRef}>
                    <SettingsButton
                        clickHandler={() =>
                            setShowSettingsMenu(!showSettingsMenu)
                        }
                    />
                    {showSettingsMenu && <SettingsMenu ref={settingsMenuRef} />}
                    <LikedPokemonModal
                        ref={likedPokemonModalRef}
                        clickHandler={handlePokemonModalClick}
                    />
                </div>
            </div>
        </header>
    )
}

export default Header

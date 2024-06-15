import FavoritesButton from './FavoritesButton'
import SettingsButton from './SettingsButton'
import pokeball from '../assets/pokeball.svg'
import { useEffect, useRef, useState } from 'react'
import SettingsMenu from './SettingsMenu'
import LikedPokemonModal from './LikedPokemonModal'
import { useLikedPokemonContext } from '../hooks/useLikedPokemonContext'

import styles from './styles/Header.module.css'

function Header() {
    const [showSettingsMenu, setShowSettingsMenu] = useState(false)
    const settingsButtonRef = useRef<HTMLDivElement>(null)
    const settingsMenuRef = useRef<HTMLDivElement>(null)

    const [showLikedPokemonModal, setShowLikedPokemonModal] = useState(false)
    const likedPokemonModalRef = useRef<HTMLDivElement>(null)

    const { setLikedPokemon, pendingPokemon, setPendingPokemon } =
        useLikedPokemonContext()

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

    useEffect(() => {
        const handleClickOutsidePokemonModal = (event: MouseEvent) => {
            if (
                showLikedPokemonModal &&
                likedPokemonModalRef.current &&
                !likedPokemonModalRef.current.contains(event.target as Node)
            ) {
                document.body.style.overflow = 'visible'
                setShowLikedPokemonModal(false)

                setLikedPokemon(prevLikedPokemon =>
                    prevLikedPokemon.filter(p => !pendingPokemon.includes(p))
                )
                setPendingPokemon([])
            }
        }

        window.addEventListener('mousedown', handleClickOutsidePokemonModal)
        return () => {
            window.removeEventListener(
                'mousedown',
                handleClickOutsidePokemonModal
            )
        }
    }, [
        showLikedPokemonModal,
        pendingPokemon,
        setLikedPokemon,
        setPendingPokemon
    ])

    const handleFavoritesButtonClick = () => {
        document.body.style.overflow = 'hidden'
        setShowLikedPokemonModal(true)
    }

    const handleSettingsButtonClick = () => {
        setShowSettingsMenu(prevShowSettingsMenu => !prevShowSettingsMenu)
    }

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
                        clickHandler={() => handleFavoritesButtonClick()}
                    />
                    {showLikedPokemonModal && (
                        <LikedPokemonModal ref={likedPokemonModalRef} />
                    )}
                </div>
                <div
                    className={styles.settingsContainer}
                    ref={settingsButtonRef}>
                    <SettingsButton
                        clickHandler={() => handleSettingsButtonClick()}
                    />
                    {showSettingsMenu && <SettingsMenu ref={settingsMenuRef} />}
                </div>
            </div>
        </header>
    )
}

export default Header

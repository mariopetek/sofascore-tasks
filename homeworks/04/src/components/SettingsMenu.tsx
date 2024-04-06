import { PiCircleBold } from 'react-icons/pi'
import { PiCircleFill } from 'react-icons/pi'
import { IconContext } from 'react-icons'

import styles from './styles/SettingsMenu.module.css'
import { useThemeContext } from '../hooks/useThemeContext'

function SelectedOptionIcon() {
    return (
        <IconContext.Provider value={{ className: styles.optionIcon }}>
            <PiCircleFill />
        </IconContext.Provider>
    )
}

function OptionIcon() {
    return (
        <IconContext.Provider value={{ className: styles.optionIcon }}>
            <PiCircleBold />
        </IconContext.Provider>
    )
}

type SettingsMenuProps = {
    settingsMenuRef: React.RefObject<HTMLDivElement>
}

function SettingsMenu({ settingsMenuRef }: SettingsMenuProps) {
    const { theme, setTheme } = useThemeContext()

    return (
        <div className={styles.settingsMenuContainer} ref={settingsMenuRef}>
            <h3 className={styles.settingsHeading}>Theme</h3>
            <div className={styles.themeOptions}>
                <div
                    className={styles.themeOption}
                    onClick={() => setTheme(null)}>
                    {theme === null ? <SelectedOptionIcon /> : <OptionIcon />}
                    <span>Auto</span>
                </div>
                <div
                    className={styles.themeOption}
                    onClick={() => setTheme('light')}>
                    {theme === 'light' ? (
                        <SelectedOptionIcon />
                    ) : (
                        <OptionIcon />
                    )}
                    <span>Light</span>
                </div>
                <div
                    className={styles.themeOption}
                    onClick={() => setTheme('dark')}>
                    {theme === 'dark' ? <SelectedOptionIcon /> : <OptionIcon />}
                    <span>Dark</span>
                </div>
            </div>
        </div>
    )
}

export default SettingsMenu

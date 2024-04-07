import { PiCircleBold } from 'react-icons/pi'
import { PiCircleFill } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import { useThemeContext } from '../hooks/useThemeContext'
import { forwardRef } from 'react'

import styles from './styles/SettingsMenu.module.css'

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

const SettingsMenu = forwardRef<HTMLDivElement>((_, ref) => {
    const { theme, setTheme } = useThemeContext()

    return (
        <div className={styles.settingsMenuContainer} ref={ref}>
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
})

export default SettingsMenu

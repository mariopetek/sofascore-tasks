import { IconContext } from 'react-icons'
import { PiGearLight } from 'react-icons/pi'

import styles from './styles/SettingsButton.module.css'

function SettingsButtonHeader() {
    return (
        <IconContext.Provider value={{ className: styles.gearIcon }}>
            <PiGearLight />
        </IconContext.Provider>
    )
}

export default SettingsButtonHeader
